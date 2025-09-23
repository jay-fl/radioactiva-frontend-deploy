"use server"

import { nestHttpErrorSchema, SongFormSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function createSong(prevState: ActionStateType, formData: FormData) {

    const songs = SongFormSchema.safeParse({
            artist: formData.get('artist'),
            track: formData.get('track'),
            video: formData.get('video'),
            image: formData.get('image')
        })

        
        if (!songs.success) {
            return{
                errors: songs.error.errors.map(error => error.message),
                success: ''
            }
        }

        const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;

        const url = `${process.env.API_URL}/songs`
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(songs.data)
        })
        const json = await req.json()

        if(!req.ok) {
            const error = nestHttpErrorSchema.parse(json)
            return {
                errors: error.message,
                success: ''
            }
        }

        return {
            errors: [],
            success: 'Cancion creada correctamente'
        }

}