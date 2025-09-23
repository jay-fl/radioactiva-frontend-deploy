import CreateProgramsForm from '@/components/programs/CreateProgramsForm'
import { userResponseSchema } from '@/src/schemas'
import Link from 'next/link'


async function getUsers(){
    const url = `${process.env.API_URL}/users`
    const req = await fetch(url)
    const json = await req.json()
    const users = userResponseSchema.parse(json)
    return users
}

export default async function CreateProgramPage() {

    const users = await getUsers()

  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Nuevo Programa
          </h1>
          <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
            <span className="text-[#248bcf]">programa</span>
          </p>
        </div>
        <Link
          href={'/admin/programs'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>

      <div className='p-10 mt-10  shadow-lg border '>
        <CreateProgramsForm 
            users={users}
        />
      </div>
    </>
  )
}
