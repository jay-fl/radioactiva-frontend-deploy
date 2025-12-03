import { Song } from '@/src/schemas'
import { getImagePath } from '@/src/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteSongForm from './DeleteSongForm'
import { RiEditBoxFill } from 'react-icons/ri'

export default function SongTable({songs} : {songs: Song[]}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Imagen
                  </th>

                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Artista
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Canción
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Video
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {songs.map(song => (
                    <tr key={song.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image 
                          src={getImagePath(song.image)}
                          alt={`Imagen de noticia ${song.artist}`}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {song.artist}
                      </td>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {song.track}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {song.video.length > 50 ? `${song.video.slice(0, 50)}...` : song.video}
                      </td>
                      <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                        <div className='flex gap-5 justify-end items-center'>
                            <Link
                                className="text-indigo-600 hover:text-indigo-800"
                                href={`/admin/songs/${song.id}/edit`}
                                title='Editar'
                            >
                                <RiEditBoxFill size={18}/>
                            </Link>
                            <DeleteSongForm songId={song.id} />
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
