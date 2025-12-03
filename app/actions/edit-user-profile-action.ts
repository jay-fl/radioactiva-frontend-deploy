'use server'

import { editUserAdminFormSchema, nestHttpErrorSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
    requiresLogout?: boolean;
}

// Función para obtener el email actual del token JWT
function getCurrentUserEmailFromToken(token: string): string | null {
    try {
        // Decodificar el payload del JWT (sin verificar)
        const payloadBase64 = token.split('.')[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString();
        const payload = JSON.parse(payloadJson);
        return payload.email;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export async function editUserProfile(prevState: ActionStateType, formData: FormData) {

    const user = editUserAdminFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email')
    })

    if (!user.success) {
        return {
            errors: user.error.errors.map(error => error.message),
            success: ''
        }
    }

    const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
     if (!token) {
        return {
            errors: ['No se encontró token de autenticación'],
            success: ''
        }
    }

    const url = `${process.env.API_URL}/users/profile/update`
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user.data)
    })
    const json = await req.json()

    if (!req.ok) {
        const error = nestHttpErrorSchema.parse(json);

        // Normaliza el mensaje de error a array de strings
        const errorMessages = Array.isArray(error.message)
            ? error.message
            : [error.message]; // ← Convierte string a array

        return {
            errors: errorMessages,
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)
    
    // Obtener email actual del token y comparar
    const currentEmail = getCurrentUserEmailFromToken(token);
    const emailChanged = currentEmail && user.data.email !== currentEmail;
    
    return {
        errors: [],
        success: success.message,
        requiresLogout: emailChanged // ← Solo logout si cambió el email
    };
}