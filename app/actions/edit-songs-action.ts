'use server'

import { nestHttpErrorSchema, Song, SongFormSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string
}

export async function editSongs (songsId: Song['id'] ,prevState: ActionStateType, formData: FormData) {
    
    const songs = SongFormSchema.safeParse({
            artist: formData.get('artist'),
            track: formData.get('track'),
            video: formData.get('video'),
            image: formData.get('image')
        })

        if(!songs.success){
        return {
            errors: songs.error.errors.map(error => error.message),
            success: ''
        }
    }

    const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
        const url = `${process.env.API_URL}/songs/${songsId}`
        const req = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(songs.data)
        })
        const json = await req.json()
    
        if(!req.ok) {
                const  error  = nestHttpErrorSchema.parse(json)
                return {
                    errors: error.message,
                    success: ''
                }
            }
        
        const success = SuccessSchema.parse(json)
        return {
            errors: [],
            success: success.message
        }
}