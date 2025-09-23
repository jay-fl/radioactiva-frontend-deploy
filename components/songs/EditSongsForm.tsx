'use client'

import { editSongs } from "@/app/actions/edit-songs-action"
import { uploadSongImage } from "@/app/actions/upload-song-image-action"
import { Song } from "@/src/schemas"
import { getImagePath } from "@/src/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"

export default function EditSongsForm({songs} : {songs: Song}) {

    const router = useRouter()
    const { id } = useParams<{id: string}>()

    const editSongsWithId = editSongs.bind(null, +id)
    const [state, dispatch] = useActionState(editSongsWithId, {
      errors: [],
      success: ''
    })

    useEffect(() => {
        if(state.errors){
                state.errors.forEach(error => toast.error(error))
              }
        if(state.success){
          toast.success(state.success)
          router.push('/admin/songs')
        }
      }, [state, router])

      const [image, setImage] = useState('')
        
          const onDrop = useCallback(async (files : File[]) => {
            const formData = new FormData()
            files.forEach(file => {
              formData.append('file', file)
            })
            const image = await uploadSongImage(formData)
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
                        htmlFor='artist'
                        className='text-sm uppercase font-bold'
                    >
                        Artista
                    </label>
                    <input
                        id='artist'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Nombre del Artista'
                        name='artist'
                        defaultValue={songs.artist}
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='track'
                        className='text-sm uppercase font-bold'
                    >
                        Tema
                    </label>
                    <input
                        id='track'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Nombre del tema'
                        name='track'
                        defaultValue={songs.track}
                    />
                </div>
                <div className='space-y-3'>
                    <label
                        htmlFor='video'
                        className='text-sm uppercase font-bold'
                    >
                        Video
                    </label>
                    <input
                        id='video'
                        className='w-full p-3  border border-gray-100 bg-slate-100'
                        type='text'
                        placeholder='Video del tema'
                        name='video'
                        defaultValue={songs.video}
                    />
                </div>
    
                <div className='space-y-1'>
                    <label className='block text-sm font-medium leading-6 text-gray-900'>
                        Imagen Canción
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
                        <p className='font-bold'>Imagen Canción:</p>
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

                {songs.image && !image && (
                                      <div className='py-5 sapce-y-3'>
                                          <p className='font-bold'>Imagen Actual:</p>
                                          <div className='w-[900px] h-[480px] relative'>
                                            <Image 
                                              src={getImagePath(songs.image)}
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
                    defaultValue={image ? image : songs.image}
                />
    
                <input
                    type='submit'
                    className='bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors'
                    value='Guardar Cambios'
                />
            </form>
  )
}
