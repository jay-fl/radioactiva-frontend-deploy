'use client'

import { createProgram } from "@/app/actions/create-program-action"
import { User } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { useActionState, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useDropzone } from 'react-dropzone'
import { uploadProgramImage } from "@/app/actions/upload-program-image-action"
import Image from "next/image"

export default function CreateProgramsForm({users}: {users:User[]}) {

    const router = useRouter()

    const [state, dispatch] = useActionState(createProgram, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if(state.success) {
            toast.success(state.success)
            router.push('/admin/programs')
        }
    }, [state, router])

    const [image, setImage] = useState('')
    
    const onDrop = useCallback(async (files: File[]) => {
            const formData = new FormData()
            files.forEach((file) => {
                formData.append('file', file)
            })
            const image = await uploadProgramImage(formData)
            setImage(image)
        }, [])

    const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    onDrop,
    maxFiles: 1
  })

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
                        placeholder='Nombre del programa'
                        name='name'
                    />
                </div>
                <div className='space-y-3 flex gap-3'>
                    <div className="flex flex-col flex-1">
                        <label
                        htmlFor='startTime'
                        className='text-sm uppercase font-bold'
                    >
                        Desde
                    </label>
                    <input
                        id='startTime'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Hora de inicio del programa'
                        name='startTime'
                    />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label
                        htmlFor='endTime'
                        className='text-sm uppercase font-bold'
                    >
                        Hasta
                    </label>
                    <input
                        id='endTime'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Hora de fin del programa'
                        name='endTime'
                    />
                    </div>
                </div>
                <div className='space-y-3 flex gap-3'>
                    <div className="flex flex-col flex-1">
                        <label
                        htmlFor='alternativeST'
                        className='text-sm uppercase font-bold'
                    >
                        Desde Alt <span className="text-sm font-normal lowercase">(opcional)</span>
                    </label>
                    <input
                        id='alternativeST'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Hora alternativa de inicio del programa'
                        name='alternativeST'
                    />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label
                        htmlFor='alternativeET'
                        className='text-sm uppercase font-bold'
                    >
                        Hasta Alt <span className="text-sm font-normal lowercase">(opcional)</span>
                    </label>
                    <input
                        id='alternativeET'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Hora alternativa de fin del programa'
                        name='alternativeET'
                    />
                    </div>
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='announcer'
                        className='text-sm uppercase font-bold'
                    >
                        Conductor
                    </label>
                    <input
                        id='announcer'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Nombre del conductor del programa'
                        name='announcer'
                    />
                </div>
                
                <div className='space-y-3'>
                    <label
                        htmlFor='userId'
                        className='text-sm uppercase font-bold'
                    >
                        Usuario
                    </label>
                    <select
                        id='userId'
                        name='userId'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                    >
                        <option defaultValue=''>-- Selecciona un usuario --</option>
                        {users.map((user) => (
                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
    
                <div className='space-y-1'>
                    <label className='block text-sm font-medium leading-6 text-gray-900'>
                        Imagen Programa
                    </label>
                    <div
					{...getRootProps({
						className: `
								py-20 border-2 border-dashed  text-center 
								${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
            					${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
        					`,})}
				>
					<input {...getInputProps()} />
                        {isDragAccept && <p>Suelta la Imagen</p>}
                        {isDragReject && <p>Archivo no válido</p>}
                        {!isDragActive && <p>Arrastra y suelta una imagen aquí</p>}
				</div>
                </div>
                            
                {image && (
                                <div className='py-5 sapce-y-3'>
                                    <p className='font-bold'>Imagen Programa:</p>
                                    <div className='w-[900px] h-[480px] relative'>
                                        <Image
                                            src={image}
                                            alt='Imagen Publicada'
                                            className='object-cover'
                                            fill
                                        />
                                    </div>
                                </div>
                            )}

                        <input
                        type='hidden'
                        name='image'
                        defaultValue={image}
                    />
              
                <input
                    type='submit'
                    className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
                    value='Crear Programa'
                />
            </form>
  )
}
