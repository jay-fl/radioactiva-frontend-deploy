"use server"

import { nestHttpErrorSchema, NewsFormSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function createNews(prevState: ActionStateType, formData: FormData) {
    
    const news = NewsFormSchema.safeParse({
        headline: formData.get('headline'),
        story: formData.get('story'),
        programId: formData.get('programId'),
        image: formData.get('image')
    })
    
    if (!news.success) {
        return {
            errors: news.error.errors.map(error => error.message),
            success: ''
        }
    }

    const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;

    const url = `${process.env.API_URL}/news`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(news.data)
    })
    const json = await req.json()

    if(!req.ok) {
        const  error  = nestHttpErrorSchema.parse(json)
        return {
            errors: error.message,
            success: ''
        }
    }

    return {
        errors: [],
        success:'Noticia creada correctamente'
    }
}