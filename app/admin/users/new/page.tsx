import CreateUserForm from '@/components/users/CreateUserForm'
import Link from 'next/link'
import React from 'react'

export default function CreateNewUser() {
  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Nuevo Usuario
          </h1>
          <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
            <span className="text-[#248bcf]">usuario</span>
          </p>
        </div>
        <Link
          href={'/admin/users'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>

      <div className='p-10 mt-10  shadow-lg border '>
        <CreateUserForm />
      </div>
    </>
  )
}
