'use client'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function MainNav() {
	const [isSticky, setIsSticky] = useState(false)

	useEffect(() => {
		let lastScrollY = window.scrollY

		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				setIsSticky(true)
			} else {
				setIsSticky(false)
			}
			lastScrollY = window.scrollY
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<>
			<header className='px-6 py-3 bg-[#254684] flex flex-col md:flex-row justify-between '>
				<div className='flex justify-center'>
					<Logo />
				</div>
				<nav className='flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0'>
					<Link
						href={'/'}
						className='text-white hover:text-[#abc5e3] font-bold p-2'
					>
						Inicio
					</Link>
					<Link
						href={'/'}
						className='text-white hover:text-[#abc5e3] font-bold p-2'
					>
						Programacion
					</Link>
					<Link
						href={'/ranking'}
						className='text-white hover:text-[#abc5e3] font-bold p-2'
					>
						Ranking
					</Link>
					<Link
						href={'/'}
						className='text-white hover:text-[#abc5e3] font-bold p-2'
					>
						Notiicas
					</Link>
					<Link
						href={'/'}
						className='text-white hover:text-[#abc5e3] font-bold p-2'
					>
						Galeria
					</Link>
				</nav>
			</header>

			<div>
				<div
					className={`flex items-center justify-around z-50 gap-2 p-2 bg-[#abc5e3] transition-all duration-500 ${
						isSticky ? 'fixed top-0 left-0 w-full shadow-lg' : ''
					}`}
				>
					<h1 className='text-4xl font-bold text-[#17275b]'>
						Radio Activa Jujuy
					</h1>
					<audio controls src="https://server4.hostradios.com/8004/stream" className='w-56 h-10'></audio>
				</div>
				{isSticky && <div className='h-16'></div>}
			</div>
		</>
	)
}
