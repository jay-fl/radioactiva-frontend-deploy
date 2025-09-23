import React from 'react'
import { Program } from '@/src/schemas';
import Image from 'next/image';
import { getImagePath } from '@/src/utils';
import DeleteProgramForm from './DeleteProgramForm';

export default function ProgramTable({programs}: {programs: Program[]}) {
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
                        Nombre
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Desde
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Hasta
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Desde Alt
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Hasta Alt
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Conductor
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {programs.map(program => (
                        <tr key={program.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Image 
                                src={getImagePath(program.image)}
                                alt={`Imagen de programa ${program.name}`}
                                width={50}
                                height={50}
                                                    />
                          </td>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {program.name}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {program.startTime}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {program.endTime}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {program.alternativeST}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {program.alternativeET}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {program.announcer}
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                            <div className='flex gap-5 justify-end items-center'>
                                <DeleteProgramForm 
                                  programId={program.id}
                                />
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
