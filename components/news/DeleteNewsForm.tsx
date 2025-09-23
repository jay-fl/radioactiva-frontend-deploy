import { News } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers";

export default function DeleteNewsForm({newsId} : {newsId : News['id']}) {

    const handleDeleteNews = async () => {
        "use server"
        
        const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
        const url = `${process.env.API_URL}/news/${newsId}`
        const req = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        await req.json()
        revalidatePath('/admin/news')
    }

	return (
		<form
            action={handleDeleteNews}
        >
			<input
				type='submit'
				className='text-red-600 hover:text-red-800 cursor-pointer'
				value='Eliminar'
				name='delete'
			/>
		</form>
	)
}
