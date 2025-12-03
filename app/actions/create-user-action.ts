"use server"

import { nestHttpErrorSchema, RegisterSchema } from "@/src/schemas";
import { cookies } from "next/headers";


type ActionStateType = {
    errors: string[];
    success: string;
}

export async function createUser(prevState: ActionStateType, formData: FormData) {

    const users = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    })
    
    if (!users.success) {
        return {
            errors: users.error.errors.map(error => error.message),
            success: ''
        }
    }

    const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
    const url = `${process.env.API_URL}/auth/register`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(users.data)
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

    return {
        errors: [],
        success: 'Usuario creado correctamente'
    }
}


