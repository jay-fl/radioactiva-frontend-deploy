import EditSongsForm from '@/components/songs/EditSongsForm'
import { SongSchema } from '@/src/schemas';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link'
import { notFound } from 'next/navigation';
import React from 'react'

const getSongs = async (id: string) => {
  const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
  const url = `${process.env.API_URL}/songs/${id}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    notFound()
  }

  const songs = SongSchema.parse(json);
  return songs;
}

export async function generateMetadata({ params } : { params: { id: string } }) : Promise<Metadata>{
  const { id } = await params;
  const songs = await getSongs(id)
  return {
    title: `Radio Activa - ${songs.track}`,
    description: `Radio Activa - ${songs.track}`
  }
}

export default async function EditSongsPage({ params } : { params: { id: string } }) {
    const { id } = await params
  
    const songs = await getSongs(id)
  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Editar Canción: {songs.track}
          </h1>
          <p className="text-xl font-bold">Llena el formulario y crea una nueva {''}
            <span className="text-[#248bcf]">canción</span>
          </p>
        </div>
        <Link
          href={'/admin/songs'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>
      <div className='p-10 mt-10  shadow-lg border '>
        <EditSongsForm songs={songs} />
      </div>
    </>
  )
}
