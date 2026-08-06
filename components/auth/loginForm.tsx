'use client'

import { login } from '@/app/actions/login-action'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginForm() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [state, dispatch] = useActionState(login, {
		errors: [],
		success: false
	})

    useEffect(() => {
      if(state.errors){
        state.errors.forEach(error => {
          toast.error(error)
        });
      }
	  if(state.success){
		toast.success('Login Exitoso')
		router.push('/admin')
	  }
    }, [state, router])
    

	return (
		<>
			<h1 className='text-4xl font-black text-center'>Iniciar Sesión</h1>
			<form
				action={dispatch}
				className='mt-14 space-y-5'
				noValidate
			>
                
				<div className='flex flex-col gap-2'>
					<label 
					className='font-bold text-2xl'
					htmlFor='email'
					>Email</label>

					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full border border-gray-300 p-3 rounded-lg'
						name='email'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label 
					className='font-bold text-2xl'
					htmlFor='password'
					>Password</label>

					<div className="relative">
						<input
							id='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='Password de Registro'
							className='w-full border border-gray-300 p-3 rounded-lg pr-10'
							name='password'
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						>
							{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
						</button>
					</div>
				</div>

				<input
					type='submit'
					value='Iniciar Sesión'
					className='bg-gradient-to-br from-blue-600 to-blue-800 hover:to-blue-600 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer'
				/>
			</form>
		</>
	)
}