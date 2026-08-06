'use server'

import { nestHttpErrorSchema, SuccessSchema, UpdateProgramFormSchema } from "@/src/schemas";
import { cookies } from "next/headers";



type ActionStateType = {
    errors: string[];
    success: string
}

export async function editCurrentProgram(prevState: ActionStateType, formData: FormData) {

    const program = UpdateProgramFormSchema.safeParse({
        name: formData.get('name'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        announcer: formData.get('announcer'),
        alternativeST: formData.get('alternativeST'),
        alternativeET: formData.get('alternativeET'),
        image: formData.get('image')
    })

    if (!program.success) {
        return {
            errors: program.error.errors.map(error => error.message),
            success: ''
        }
    }

    const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
    const url = `${process.env.API_URL}/programs/update-program`
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(program.data)
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