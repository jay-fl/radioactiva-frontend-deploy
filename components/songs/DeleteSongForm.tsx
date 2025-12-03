import { Song } from '@/src/schemas'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { RiDeleteBin6Fill } from 'react-icons/ri'

export default function DeleteSongForm({ songId }: { songId: Song['id'] }) {
	const handleDeleteSong = async () => {
		'use server'

		const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
		const url = `${process.env.API_URL}/songs/${songId}`
		const req = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		await req.json()
		revalidatePath('/admin/songs')
	}

	return (
		<form action={handleDeleteSong}>
			<button
				type='submit'
				name='delete'
				title='Eliminar'
				className='text-red-600 hover:text-red-800 placeholder:Eliminar cursor-pointer'
			>
				<RiDeleteBin6Fill size={18} />{' '}
			</button>
		</form>
	)
}
