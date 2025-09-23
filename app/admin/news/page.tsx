import NewsTable from '@/components/news/NewsTable'
import Pagination from '@/components/ui/Pagination'
import { NewsResponseSchema } from '@/src/schemas'
import { isValidPage } from '@/src/utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getNews(take: number, skip: number) {
	const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
	const url = `${process.env.API_URL}/news?take=${take}&skip=${skip}`
	const req = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const json = await req.json()
	const data = NewsResponseSchema.parse(json)
	return {
		news: data.news,
		total: data.total,
	}
}

type SearchParams = Promise<{ page: string }>

export default async function Newspage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { page } = await searchParams

	if (!isValidPage(+page)) redirect('/admin/news?page=1')
	const newsPerPage = 10
	const skip = (+page - 1) * newsPerPage
	const { news, total } = await getNews(newsPerPage, skip)
		const totalPages = Math.ceil(total / newsPerPage)
		if (+page > totalPages && total > 0) redirect(`/admin/news?page=1`)
	

	return (
		<>
			<div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
				<div className='w-full md:w-auto'>
					<h1 className='font-black text-4xl text-[#17275b] my-5'>
						Mis Noticias
					</h1>
					<p className='text-xl font-bold'>
						Maneja y administra tus {''}
						<span className='text-[#248bcf]'>noticias</span>
					</p>
				</div>
				<Link
					href={'/admin/news/new'}
					className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
				>
					Crear Noticia
				</Link>
			</div>
			{news.length ? (
				<div>
				<NewsTable news={news} />

				<Pagination 
          page={+page}
          totalPages={totalPages}
          baseUrl="/admin/news"
        />
			</div>
			) : (
				<p className='text-sm  text-center my-5'>
					Aún no tienes noticias creadas {''}
					<Link
            href={'/admin/news/new'}
            className='text-[#248bcf] text-sm font-bold'
          >
            Comienza creando una
          </Link>
				</p>
			)}
			
		</>
	)
}
