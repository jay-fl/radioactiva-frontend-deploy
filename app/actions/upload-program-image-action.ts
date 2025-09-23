"use server"

import { cookies } from "next/headers";

export async function uploadProgramImage(formData: FormData) : Promise<string> {
    const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
    const url = `${process.env.API_URL}/programs/upload-image`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const image = await req.json()
    return image.secure_url
}