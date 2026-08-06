import UpdateProgramForm from '@/components/profile/UpdateProgramForm'
import { ProgramSchema  } from '@/src/schemas';
import { cookies } from 'next/headers';
import React from 'react'



async function getProgram() {
  const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
  const url = `${process.env.API_URL}/programs/get-program/`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await req.json()
  const program = ProgramSchema.parse(json)
  return program
}

export default async function UpdateProgramPage() {

  const program = await getProgram()
  return (
    <>
          <h1 className="font-black text-4xl text-[#17275b] my-5">Actualizar Programa</h1>
          <p className="text-xl font-bold">Aquí puedes actualizar tu {''}
            <span className="text-[#248bcf]">programa</span>
          </p>
    
          <div className='p-10 mt-10  shadow-lg border '>
            <UpdateProgramForm program={program}/>
          </div>
    
        </>
  )
}
