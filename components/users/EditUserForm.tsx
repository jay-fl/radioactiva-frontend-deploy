import { User } from '@/src/schemas'
import React from 'react'

export default function EditUserForm({user} : {user: User}) {
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
                 <div className='space-y-3'>
                <label
                    htmlFor='role'
                    className='text-sm uppercase font-bold'
                >
                    Rol
                </label>
                <select
                    id='role'
                    className='w-full p-3 border border-gray-100 bg-slate-100'
                    name='role'
                    defaultValue={user.role}
                >
                    <option defaultValue='' disabled>-- Selecciona un rol --</option>
                    <option value='user'>Usuario</option>
                </select>
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
                        type='password'
                        placeholder='Password del usuario'
                        name='password'
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='password_confirmation'
                        className='text-sm uppercase font-bold'
                    >
                        Repetir contraseña
                    </label>
                    <input
                        id='password_confirmation'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='password'
                        placeholder='Repetir password del usuario'
                        name='password_confirmation'
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
