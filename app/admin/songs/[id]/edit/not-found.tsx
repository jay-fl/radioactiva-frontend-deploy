import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='space-y-5'>
        <h1 className="font-black text-4xl text-[#17275b]">No Encontrado</h1>
        <p className="text-xl font-bold">La canción a la que intentas acceder {''} <span className="text-[#248bcf]">no existe</span></p>
        <Link href="/admin/songs" className='bg-[#248bcf] px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'>Ir a Canciónes</Link>
    </div>
  )
}