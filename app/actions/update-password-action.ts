"use server"

import { nestHttpErrorSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function updatePassword(prevState: ActionStateType, formData: FormData) {
    const userPassword = UpdatePasswordSchema.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    });

    if(!userPassword.success) {
        return {
            errors: userPassword.error.issues.map(issue => issue.message),
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

        const url = `${process.env.API_URL}/users/profile/update-password`
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userPassword.data)
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

    return {
        errors: [],
        success: success.message
    }
}