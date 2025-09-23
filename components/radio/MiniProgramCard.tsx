import { Program } from '@/src/schemas'
import Image from 'next/image'

export default function MiniProgramCard({program}: {program: Program}) {
	return (
		<div className='w-96 bg-[#5660aa] p-4 rounded-xl'>
			<div className='flex items-center justify-between'>
				<div className='flex-col gap-2 text-white'>
					<div className='text-xl font-medium'>
						<p>{program.name}</p>
					</div>
					<div className='text-md'>
						<p>{program.announcer}</p>
					</div>
				</div>
				<div>
					<Image
						src={'/director.webp'}
						width={100}
						height={100}
						alt='Imagen del Programa'
						priority
                        className='w-16 h-16 rounded-full'
					/>
				</div>
			</div>
			<div className='text-md font-medium text-white'>
				<p>De {program.startTime} a {program.endTime}</p>
			</div>
		</div>
	)
}
