import { Program } from '@/src/schemas'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';

export default function DeleteProgramForm({programId} : {programId: Program['id']}) {

    const handleDeleteProgram = async () => {
        "use server"
        
        const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value;
        const url = `${process.env.API_URL}/programs/${programId}`
        const req = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        await req.json()
        revalidatePath('/admin/programs')
    }

  return (
    <form
            action={handleDeleteProgram}
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
