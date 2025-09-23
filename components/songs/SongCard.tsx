import { RiArrowUpCircleFill } from "react-icons/ri";
import { Song } from "@/src/schemas";
import Image from "next/image";




export default function SongCard({cancion} : {cancion: Song}) {
  return (
    <div className='rounded-xl bg-white shadow relative p-5 mb-10'>
           <div className="flex ">
               
               <div className="w-[200px] h-[200px]">
                   <Image src={`${process.env.API_URL}/img/${cancion.image}`} alt={`Imagen de Cancion ${cancion.track}`} width={100} height={100} className="w-full h-full object-cover" priority/>
               </div>
           <div className="p-3 space-y-2">
               <h2 className="text-5xl font-bold">10</h2>
               <div className="mt-15">
               <h3 className="text-xl  font-bold text-gray-600">{cancion.track}</h3>
               <p className="text-gray-500 uppercase text-md">{cancion.artist}</p>
               </div>
           </div>
       </div>
       <button
           type="button"
           className="absolute top-10 -right-3 cursor-pointer"
       >
           <RiArrowUpCircleFill className="w-10 h-10 bg-blue-700 text-white rounded-full"/>
       </button> 
    </div>
  )
}


 