'use client'

import { Program } from "@/src/schemas"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { getImagePath } from "@/src/utils"
import { useActionState, useCallback, useEffect, useState } from "react"
import { uploadProgramImage } from "@/app/actions/upload-program-image-action"
import { editCurrentProgram } from "@/app/actions/edit-current-program-action"
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"

export default function UpdateProgramForm({program} : {program: Program}) {
    const router = useRouter()
    const [state, dispatch] = useActionState(editCurrentProgram, {
        errors: [],
        success: ''
      })

       useEffect(() => {
          if(state.errors){
                  state.errors.forEach(error => toast.error(error))
                }
          if(state.success){
            toast.success(state.success)
            router.refresh()
          }
        }, [state, router])

    const [image, setImage] = useState('')
      
        const onDrop = useCallback(async (files : File[]) => {
          const formData = new FormData()
          files.forEach(file => {
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
                        placeholder='Nombre del programa'
                        name='name'
                        defaultValue={program.name}
                    />
                </div>
                <div className='flex gap-3'>
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
                        defaultValue={program.startTime}
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
                        defaultValue={program.endTime}
                    />
                    </div>
                </div>
                <div className=' flex gap-3'>
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
                        defaultValue={program.alternativeST}
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
                        defaultValue={program.alternativeET}
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
                        defaultValue={program.announcer}
                    />
                </div>

                 <div className='space-y-1'>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>
                                    Imagen Programa
                                </label>
                                <div
                                    {...getRootProps({
                                        className: `
                            py-20 border-2 border-dashed  text-center 
                            ${
                                            isDragActive
                                                ? 'border-gray-900 text-gray-900 bg-gray-200 '
                                                : 'border-gray-400 text-gray-400 bg-white'
                                        } 
                            ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
                        `,
                                    })}
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
                
                          {program.image && !image && (
                                      <div className='py-5 sapce-y-3'>
                                          <p className='font-bold'>Imagen Actual:</p>
                                          <div className='w-[900px] h-[480px] relative'>
                                            <Image 
                                              src={getImagePath(program.image)}
                                              alt='Imagen Publicada'
                                              className='object-cover'
                                              fill
                                            />
                                          </div>
                                      </div>
                                    )}
                
                      <input 
                          type="hidden" 
                          name='image'
                          defaultValue={image ? image : program.image}
                          />
                

				<input
					type='submit'
					className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
					value='Guardar Cambios'
				/>
			</form>
		</>
    )
}