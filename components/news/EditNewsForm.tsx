'use client'

import { editNews } from "@/app/actions/edit-news-action"
import { uploadImage } from "@/app/actions/upload-image-action"
import { News, Program } from "@/src/schemas"
import { getImagePath } from "@/src/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"



export default function EditNewsForm({ news, programas } : {news: News, programas: Program[]}) {

  const router = useRouter()
  const { id } = useParams<{id: string}>()
  
  const editNewsWithId = editNews.bind(null, +id)
  const [state, dispatch] = useActionState(editNewsWithId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(state.errors){
            state.errors.forEach(error => toast.error(error))
          }
    if(state.success){
      toast.success(state.success)
      router.push('/admin/news')
    }
  }, [state, router])

  const [image, setImage] = useState('')
  
    const onDrop = useCallback(async (files : File[]) => {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('file', file)
      })
      const image = await uploadImage(formData)
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
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      <div className="space-y-3">
          <label htmlFor="headline" className="text-sm uppercase font-bold">
              Titulo
          </label>
          <input
              id="headline"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              type="text"
              placeholder="Titulo de la noticia"
              name="headline"
              defaultValue={news.headline}
          />
      </div>
      <div className="space-y-3">
          <label htmlFor="story" className="text-sm uppercase font-bold">
              Historia
          </label>
          <textarea
              id="story"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              placeholder="Escribe la historia de la noticia"
              name="story"
              defaultValue={news.story}
          />
      </div>
        <div className="space-y-3">
            <label htmlFor="programId" className="text-sm uppercase font-bold">
                Programa
            </label>
            <select
                id="programId"
                name="programId"
                className="w-full p-3  border border-gray-100 bg-slate-100"
                defaultValue={news.program.id.toString()}
            >
                <option defaultValue="">-- Selecciona un programa --</option>
                {programas.map(programa => (
                    <option key={programa.id} value={programa.id}>
                        {programa.name}
                    </option>
                ))}
            </select>
        </div>

        <div className='space-y-1'>
				<label className='block text-sm font-medium leading-6 text-gray-900'>
					Imagen Producto
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
                          <p className='font-bold'>Imagen Noticia:</p>
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

          {news.image && !image && (
                      <div className='py-5 sapce-y-3'>
                          <p className='font-bold'>Imagen Actual:</p>
                          <div className='w-[900px] h-[480px] relative'>
                            <Image 
                              src={getImagePath(news.image)}
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
          defaultValue={image ? image : news.image}
          />

      <input
        type="submit"
        className="bg-[#248bcf] w-full p-3 text-white uppercase font-bold hover:bg-[#254584] cursor-pointer transition-colors"
        value='Guardar Cambios'
      />
    </form>
  )
}
