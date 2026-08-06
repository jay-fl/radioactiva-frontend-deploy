'use client'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaBars, FaTimes } from 'react-icons/fa'

export default function MainNav() {
	const [isSticky, setIsSticky] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	// Efecto para el sticky header
	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 100)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()
		
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Cerrar menú al hacer scroll
	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false)
		}
	}, [isSticky])

	// Controlar la reproducción del audio
	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				audioRef.current.play().catch(error => {
					console.error('Error al reproducir:', error)
				})
			}
			setIsPlaying(!isPlaying)
		}
	}

	// Actualizar estado del audio
	useEffect(() => {
		const audio = audioRef.current
		if (audio) {
			const handlePlay = () => setIsPlaying(true)
			const handlePause = () => setIsPlaying(false)

			audio.addEventListener('play', handlePlay)
			audio.addEventListener('pause', handlePause)

			return () => {
				audio.removeEventListener('play', handlePlay)
				audio.removeEventListener('pause', handlePause)
			}
		}
	}, [])

	return (
		<>
			{/* Audio player oculto */}
			<audio 
				ref={audioRef}
				src='https://radio.arcast.cloud:1300/stream'
				/**src="https://server4.hostradios.com/8004/stream"**/
				preload="metadata"
				className="hidden"
			/>

			{/* Header sticky */}
			<header 
				className={`w-full bg-[#254684] text-white transition-all duration-300 z-50 ${
					isSticky 
						? 'fixed top-0 left-0 shadow-lg py-2' 
						: 'relative py-3'
				}`}
			>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between">
						{/* Logo y título - Siempre visible */}
						<div className="flex items-center gap-3">
							<Link href="/" className="flex items-center">
								<Logo />
							</Link>
							<div className="hidden sm:block">
								<h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
									Radio Activa Jujuy
								</h1>
								{!isSticky && (
									<p className="text-[#abc5e3] text-xs sm:text-sm">
										103.5 FM • En vivo 
									</p>
								)}
							</div>
							{/* Versión móvil compacta */}
							<div className="sm:hidden">
								<h1 className="text-base font-bold">Radio Activa</h1>
								{!isSticky && (
									<p className="text-[#abc5e3] text-xs">103.5 FM</p>
								)}
							</div>
						</div>

						{/* Botón de menú hamburguesa para móvil */}
						<div className="flex items-center gap-3 sm:hidden">
							<button
								onClick={handlePlayPause}
								className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
									isPlaying 
										? 'bg-[#17275b] text-white' 
										: 'bg-[#248bcf] text-white'
								}`}
								title={isPlaying ? 'Pausar' : 'Escuchar'}
							>
								{isPlaying ? <FaPause /> : <FaPlay />}
							</button>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="p-2 hover:bg-white/10 rounded"
								aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
							>
								{isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
							</button>
						</div>

						{/* Desktop: Navegación y reproductor */}
						<div className="hidden sm:flex items-center gap-4 md:gap-6">
							<nav className="flex items-center gap-2 md:gap-4">
								<Link
									href="/"
									className="px-3 py-2 text-sm md:text-base font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors whitespace-nowrap"
								>
									Inicio
								</Link>
								<Link
									href="/programacion"
									className="px-3 py-2 text-sm md:text-base font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors whitespace-nowrap"
								>
									Programación
								</Link>
								<Link
									href="/ranking"
									className="px-3 py-2 text-sm md:text-base font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors whitespace-nowrap"
								>
									Ranking
								</Link>
								<Link
									href="/noticias"
									className="px-3 py-2 text-sm md:text-base font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors whitespace-nowrap"
								>
									Noticias
								</Link>
								<Link
									href="/galeria"
									className="px-3 py-2 text-sm md:text-base font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors whitespace-nowrap"
								>
									Galería
								</Link>
							</nav>

							{/* Reproductor de audio - Desktop */}
							<div className="flex items-center gap-3">
								<button
									onClick={handlePlayPause}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
										isPlaying 
											? 'bg-[#17275b] text-white hover:bg-[#14152c]' 
											: 'bg-[#248bcf] text-white hover:bg-[#254584]'
									}`}
									title={isPlaying ? 'Pausar transmisión' : 'Escuchar en vivo'}
								>
									{isPlaying ? (
										<>
											<FaPause />
											<span className="hidden md:inline">Pausar</span>
										</>
									) : (
										<>
											<FaPlay />
											<span className="hidden md:inline">Escuchar</span>
										</>
									)}
								</button>
								<div className="hidden md:block text-xs text-[#abc5e3]">
									<div className="font-medium">103.5 FM</div>
									<div className="text-[10px]">{isPlaying ? '● En vivo' : 'Listo'}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Menú móvil desplegable */}
					{isMenuOpen && (
						<div className="sm:hidden mt-4 pb-4 border-t border-white/20 pt-4">
							<nav className="flex flex-col gap-2">
								<Link
									href="/"
									className="px-4 py-3 font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Inicio
								</Link>
								<Link
									href="/programacion"
									className="px-4 py-3 font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Programación
								</Link>
								<Link
									href="/ranking"
									className="px-4 py-3 font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Ranking
								</Link>
								<Link
									href="/noticias"
									className="px-4 py-3 font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Noticias
								</Link>
								<Link
									href="/galeria"
									className="px-4 py-3 font-medium hover:text-[#abc5e3] hover:bg-white/10 rounded transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Galería
								</Link>
							</nav>
							
							{/* Estado del reproductor en móvil */}
							<div className="mt-4 pt-4 border-t border-white/20 text-center">
								<div className="text-sm text-[#abc5e3] mb-2">
									103.5 FM • {isPlaying ? '● En vivo' : 'Listo'}
								</div>
								<button
									onClick={() => {
										handlePlayPause()
										setIsMenuOpen(false)
									}}
									className={`w-full py-3 rounded-lg font-medium transition-all ${
										isPlaying 
											? 'bg-[#17275b] text-white' 
											: 'bg-[#248bcf] text-white'
									}`}
								>
									{isPlaying ? '⏸️ Pausar transmisión' : '▶️ Escuchar en vivo'}
								</button>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* Espacio para cuando el header se hace sticky */}
			{isSticky && <div className="h-16 sm:h-20"></div>}
		</>
	)
}