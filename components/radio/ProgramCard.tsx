import { Program } from "@/src/schemas";
import Image from "next/image";



export default function ProgramCard({program}: {program: Program}) {
  return (
    <div className="bg-[#5660aa] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-white">
      <Image
        width={100}
        height={100}
        src={'/director.webp'}
        alt=""
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full"
        priority
      />
      <p className="text-2xl  font-medium">{program.name}</p>
      <span className="text-xl">{program.announcer}</span>
      <p className="text-md">De {program.startTime} a {program.endTime}</p>
    </div>
  )
}
