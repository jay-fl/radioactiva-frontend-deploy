import UserTable from '@/components/users/UserTable'
import { userResponseSchema } from '@/src/schemas'
import { cookies } from 'next/headers'
import Link from 'next/link'


async function getUsers() {
    const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
    const url = `${process.env.API_URL}/users`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const json = await req.json()
    const users = userResponseSchema.parse(json)
    return users
}

export default async function UsersPage() {
    const users = await getUsers()
  return (
    <>
			<div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
				<div className='w-full md:w-auto'>
					<h1 className='font-black text-4xl text-[#17275b] my-5'>
						Mis Usuarios
					</h1>
					<p className='text-xl font-bold'>
						Maneja y administra tus {''}
						<span className='text-[#248bcf]'>usuarios</span>
					</p>
				</div>
				<Link
					href={'/admin/users/new'}
					className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
				>
					Crear Usuario
				</Link>
			</div>
			{ users.length ? (
				<div>
                    <UserTable users={users} />
					
			    </div>
			) : (
				<p className='text-sm  text-center my-5'>
					Aún no tienes usuarios creados {''}
					<Link
            href={'/admin/programs/new'}
            className='text-[#248bcf] text-sm font-bold'
          >
            Comienza creando uno
          </Link>
				</p>
			)}
			
		</>
  )
}
