'use client'

import { editUserAdmin } from "@/app/actions/edit-user-admin-action";
import { User } from "@/src/schemas";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";


export default function EditUserAdminForm({user} : {user: User}) {

    const router = useRouter()
    const { id } = useParams<{id: string}>()

    const editUserAdminWithId = editUserAdmin.bind(null, +id)
    const [state, dispatch] = useActionState(editUserAdminWithId, {
      errors: [],
      success: ''
    })

    useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            //Redirigir normalmente - el logout se maneja en el action si es necesario
            router.push('/admin/users')
        }
    }, [state, router])

  return (
    <form
                className='mt-10 space-y-3'
                noValidate
                action={dispatch}
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
                        defaultValue={user.name}
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
                        defaultValue={user.email}
                    />
                </div>
    
                <input
                    type='submit'
                    className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
                    value='Guardar Cambios'
                />
            </form>
  )
}
