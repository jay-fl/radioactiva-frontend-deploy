import CreateNewsForm from '@/components/news/CreateNewsForm'
import { programsResponseSchema } from '@/src/schemas'
import Link from 'next/link'

async function getPrograms(){
    const url = `${process.env.API_URL}/programs/public`
    const req = await fetch(url)
    const json = await req.json()
    const programas = programsResponseSchema.parse(json)
    return programas
}

export default async function CreateNewsPage() {
    const programas =  await getPrograms()

  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Nueva Noticia
          </h1>
          <p className="text-xl font-bold">Llena el formulario y crea una nueva {''}
            <span className="text-[#248bcf]">noticia</span>
          </p>
        </div>
        <Link
          href={'/admin/news'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>

      <div className='p-10 mt-10  shadow-lg border '>
        <CreateNewsForm 
            programas={programas}
        />
      </div>
    </>
  )
}
