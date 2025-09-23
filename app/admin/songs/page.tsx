import SongTable from '@/components/songs/SongTable'
import Pagination from '@/components/ui/Pagination'
import { requireAdmin } from '@/src/auth/server-auth'
import { SongsResponseSchema } from '@/src/schemas'
import { isValidPage } from '@/src/utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getSongs(take: number, skip: number) {
	const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
	const url = `${process.env.API_URL}/songs?take=${take}&skip=${skip}`
	const req = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const json = await req.json()
	const data = SongsResponseSchema.parse(json)
	return {
		songs: data.songs,
		total: data.total,
	}
}

type SearchParams = Promise<{ page: string }>

export default async function SongsPage({searchParams} : {searchParams: SearchParams}) {

	const { page } = await searchParams
	
	if (!isValidPage(+page)) redirect('/admin/songs?page=1')
	const songsPerPage = 10
	const skip = (+page - 1) * songsPerPage
	const { songs, total } = await getSongs(songsPerPage, skip)
	const totalPages = Math.ceil(total / songsPerPage)
	if (+page > totalPages && total > 0) redirect(`/admin/songs?page=1`)

	await requireAdmin()
  return (
    <>
			<div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
				<div className='w-full md:w-auto'>
					<h1 className='font-black text-4xl text-[#17275b] my-5'>
						Mis Canciones
					</h1>
					<p className='text-xl font-bold'>
						Maneja y administra tus {''}
						<span className='text-[#248bcf]'>canciones</span>
					</p>
				</div>
				<Link
					href={'/admin/songs/new'}
					className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
				>
					Crear Canción
				</Link>
			</div>
			{ songs.length ? (
				<div>
					<SongTable songs={songs}/>

					<Pagination 
							  page={+page}
							  totalPages={totalPages}
							  baseUrl="/admin/songs"
							/>
			</div>
			) : (
				<p className='text-sm  text-center my-5'>
					Aún no tienes canciones creadas {''}
					<Link
            href={'/admin/programs/new'}
            className='text-[#248bcf] text-sm font-bold'
          >
            Comienza creando una
          </Link>
				</p>
			)}
			
		</>
  )
}
