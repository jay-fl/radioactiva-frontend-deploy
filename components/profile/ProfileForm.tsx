'use client'

import { editUserProfile } from '@/app/actions/edit-user-profile-action'
import { logoutAction } from '@/app/actions/login-action'
import { User } from '@/src/schemas'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'


export default function ProfileForm({ user }: { user: User }) {
    const router = useRouter()
	const [state, dispatch] = useActionState(editUserProfile, {
		errors: [],
		success: '',
		requiresLogout: false 
	})

	useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach((error) => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            
            // Manejar logout aquí si es necesario
            if (state.requiresLogout) {
                setTimeout(async () => {
                    await logoutAction()
                    router.refresh() // ← Refresh después del logout
                }, 2000)
            } else {
                // Solo refresh si NO hay logout
                router.refresh()
            }
        }
    }, [state, router])

	return (
		<>
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
		</>
	)
}
