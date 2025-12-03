'use server'

import { editUserAdminFormSchema, nestHttpErrorSchema, SuccessSchema, User, userSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { logoutAction } from "./login-action";

type ActionStateType = {
    errors: string[];
    success: string;
}

// Función para obtener usuario actual CON CONTROL MÍNIMO DE ERRORES
async function getCurrentUser() {
    try {
        const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
        if (!token) return null;
        
        const url = `${process.env.API_URL}/auth/profile`;
        const req = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!req.ok) return null;

        // VERIFICAR que la respuesta tenga contenido antes de parsear JSON
        const text = await req.text();
        if (!text) return null;

        const json = JSON.parse(text);
        return userSchema.parse(json);
    } catch (error) {
        // CAPTURAR cualquier error y retornar null en lugar de fallar
        console.log(error);
        
        return null;
    }
}

export async function editUserAdmin(userId: User['id'], prevState: ActionStateType, formData: FormData) {
    // Obtener usuario ANTES del update
    const currentUserBeforeUpdate = await getCurrentUser();

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
    const url = `${process.env.API_URL}/users/${userId}/admin-update`
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
        const errorMessages = Array.isArray(error.message)
            ? error.message
            : [error.message];
        return {
            errors: errorMessages,
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    // Verificar si el admin está editando su propio perfil
    // Si getCurrentUser falló, currentUserBeforeUpdate será null
    const isEditingSelf = currentUserBeforeUpdate?.id === userId;
    const emailChanged = user.data.email && user.data.email !== currentUserBeforeUpdate?.email;

    if (isEditingSelf && emailChanged) {
        await logoutAction();
    }
    
    return {
        errors: [],
        success: success.message,
    };
}