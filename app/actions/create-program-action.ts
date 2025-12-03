"use server"

import { nestHttpErrorSchema, ProgramFormSchema } from "@/src/schemas"
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function createProgram(prevState: ActionStateType, formData: FormData) {
    
    const programs = ProgramFormSchema.safeParse({
        name: formData.get('name'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        announcer: formData.get('announcer'),
        alternativeST: formData.get('alternativeST'),
        alternativeET: formData.get('alternativeET'),
        image: formData.get('image'),
        userId: formData.get('userId')
    })


    if (!programs.success){
        return {
            errors: programs.error.errors.map(error => error.message),
            success: ''
        }
    }
    
    const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
    
        const url = `${process.env.API_URL}/programs`
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(programs.data)
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
            errors:[],
            success: 'Programa creado correctamente'
        }
}