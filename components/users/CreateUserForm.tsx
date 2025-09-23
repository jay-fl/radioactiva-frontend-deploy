'use client'

// import { useRouter } from "next/navigation"
// import { useActionState } from "react"

export default function CreateUserForm() {

    // const router = useRouter()
    
    //     const [state, dispatch] = useActionState(, {
    //         errors: [],
    //         success: '',
    //     })

  return (
    <form
                className='mt-10 space-y-3'
                noValidate
                action={() => {}}
            >
                <div className='space-y-3'>
                    <label
                        htmlFor='name'
                        className='text-sm uppercase font-bold'
                    >
                        Nombre
                    </label>
                    <input
                        id='name'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Nombre del usuario'
                        name='name'
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='email'
                        className='text-sm uppercase font-bold'
                    >
                        Email
                    </label>
                    <input
                        id='email'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Email del usuario'
                        name='email'
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='role'
                        className='text-sm uppercase font-bold'
                    >
                        Role
                    </label>
                    <input
                        id='role'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Role del usuario'
                        name='role'
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='password'
                        className='text-sm uppercase font-bold'
                    >
                        Contraseña
                    </label>
                    <input
                        id='password'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Password del usuario'
                        name='password'
                    />
                </div>
    
                <input
                    type='submit'
                    className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
                    value='Crear Canción'
                />
            </form>
  )
}
