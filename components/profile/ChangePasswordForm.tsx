'use client'

import { updatePassword } from '@/app/actions/update-password-action'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function ChangePasswordForm() {
	const [state, dispatch] = useActionState(updatePassword, {
		errors: [],
		success: '',
	})

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => toast.error(error))
		}
		if (state.success) {
			toast.success(state.success)
		}
	}, [state])

	return (
		<>
			<form
				action={dispatch}
				className='mt-14 space-y-5'
				noValidate
			>
				<div className='flex flex-col gap-2'>
					<label
						className='font-bold text-2xl'
						htmlFor='current_password'
					>
						Password Actual
					</label>

					<input
						id='current_password'
						type='password'
						placeholder='Password Actual'
						className='w-full border border-gray-300 p-3 rounded-lg'
						name='current_password'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label
						className='font-bold text-2xl'
						htmlFor='password'
					>
						Nuevo Password
					</label>

					<input
						id='password'
						type='password'
						placeholder='Nuevo Password'
						className='w-full border border-gray-300 p-3 rounded-lg'
						name='password'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label
						className='font-bold text-2xl'
						htmlFor='password_confirmation'
					>
						Repetir Password
					</label>

					<input
						id='password_confirmation'
						type='password'
						placeholder='Repite Password'
						className='w-full border border-gray-300 p-3 rounded-lg'
						name='password_confirmation'
					/>
				</div>

				<input
					type='submit'
					value='Cambiar Password'
					className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
				/>
			</form>
		</>
	)
}
