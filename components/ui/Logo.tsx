import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div >
        <Image
            src={'/logo.png'}
            alt='Imagen Logo'
            width={100}
            height={100}
            className='w-44 h-16 rounded-2xl'
            priority
        />
    </div>
  )
}
