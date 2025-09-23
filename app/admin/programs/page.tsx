import ProgramTable from '@/components/programs/ProgramTable'
import { requireAdmin } from '@/src/auth/server-auth'
import { programsResponseSchema } from '@/src/schemas'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

async function getPrograms() {
	const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
	const url = `${process.env.API_URL}/programs`
	const req = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const json = await req.json()
	const programs = programsResponseSchema.parse(json)
	return programs
}

export default async function ProgramsPage() {

	await requireAdmin()
    const programs = await getPrograms()
	
  return (
    <>
			<div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
				<div className='w-full md:w-auto'>
					<h1 className='font-black text-4xl text-[#17275b] my-5'>
						Mis Programas
					</h1>
					<p className='text-xl font-bold'>
						Maneja y administra tus {''}
						<span className='text-[#248bcf]'>programas</span>
					</p>
				</div>
				<Link
					href={'/admin/programs/new'}
					className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
				>
					Crear Programa
				</Link>
			</div>
			{ programs.length ? (
				<div>
					<ProgramTable programs={programs} />
			</div>
			) : (
				<p className='text-sm  text-center my-5'>
					Aún no tienes programas creadas {''}
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
