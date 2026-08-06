'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  FaBroadcastTower, 
  FaHeadphones,
  FaChartLine,
  FaChevronRight,
  FaMusic,
  FaMicrophone,
  FaSignal,
  FaPlay,
  FaPause,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt
} from 'react-icons/fa'

const HeroPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPromo, setCurrentPromo] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Promociones minimalistas
  const promotions = [
    {
      id: 1,
      title: "Festival de la Primavera",
      description: "Evento musical con artistas nacionales e internacionales",
      color: "from-purple-500 to-pink-500",
      icon: <FaCalendarAlt />
    },
    {
      id: 2,
      title: "Noches de Rock Jujeño",
      description: "Viernes 22hs - Las mejores bandas locales",
      color: "from-blue-500 to-cyan-500",
      icon: <FaMusic />
    },
    {
      id: 3,
      title: "Sorteo Verano 2024",
      description: "Participá y ganá increíbles premios",
      color: "from-orange-500 to-yellow-500",
      icon: <FaUsers />
    }
  ]

  // Efecto de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Controlar audio
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Simular niveles de audio
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setAudioLevel(Math.floor(Math.random() * 100))
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Rotación automática de promociones
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % promotions.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const promo = promotions[currentPromo]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Audio oculto */}
      <audio
        ref={audioRef}
        src="https://radio.arcast.cloud:1300/stream"
        preload="metadata"
        className="hidden"
      />

      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-20" />
        <div className="absolute bottom-20 -right-10 w-80 h-80 bg-gradient-to-tl from-purple-100 to-transparent rounded-full opacity-20" />
        
        {/* Líneas de frecuencia */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Columna izquierda - Información principal */}
          <div className="lg:w-1/2">
            {/* Badge sutil */}
            <div className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                <FaBroadcastTower className="text-blue-500 text-sm" />
                <span className="text-sm font-medium text-gray-700">EN VIVO • 103.5 FM</span>
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
            </div>

            {/* Título principal */}
            <div className={`transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">Radio Activa</span>
                <span className="block text-blue-600">Jujuy</span>
              </h1>
            </div>

            {/* Subtítulo */}
            <div className={`transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-lg text-gray-600 mb-10 max-w-xl">
                La voz de la provincia. Música, noticias y entretenimiento 
                que te acompañan todo el día.
              </p>
            </div>

            {/* Botón principal de audio */}
            <div className={`mb-12 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button
                onClick={handlePlayPause}
                className={`group flex items-center gap-4 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                  {isPlaying ? (
                    <FaPause className="text-lg" />
                  ) : (
                    <FaPlay className="text-lg ml-0.5" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">
                    {isPlaying ? 'ESCUCHANDO' : 'ESCUCHAR EN VIVO'}
                  </div>
                  <div className="text-sm opacity-90">
                    {isPlaying ? 'Transmisión activa • 103.5 FM' : 'Click para comenzar'}
                  </div>
                </div>
              </button>
            </div>

            {/* Quick stats */}
            <div className={`grid grid-cols-3 gap-6 max-w-md transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <FaMusic className="text-blue-500 text-xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Música</div>
              </div>
              <div className="text-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <FaMicrophone className="text-blue-500 text-xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">5+</div>
                <div className="text-sm text-gray-600">Programas</div>
              </div>
              <div className="text-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <FaSignal className="text-blue-500 text-xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">En Vivo</div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Visualización y promoción */}
          <div className="lg:w-1/2">
            {/* Visualizador de audio */}
            <div className={`relative mb-8 transition-all duration-700 delay-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium text-gray-700">
                      {isPlaying ? 'Transmitiendo' : 'Listo'}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-gray-500">
                    FM 103.5
                  </div>
                </div>

                {/* Visualizador de onda */}
                <div className="mb-6">
                  <div className="h-24 flex items-end justify-center gap-1 px-4">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const height = isPlaying 
                        ? Math.max(4, (Math.sin(i * 0.3) * 30 + audioLevel * 0.3)) 
                        : Math.random() * 10 + 4
                      return (
                        <div
                          key={i}
                          className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transition-all duration-100"
                          style={{ height: `${height}%` }}
                        />
                      )
                    })}
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {isPlaying ? 'Nivel de señal' : 'En espera...'}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5">
                    <FaHeadphones />
                    <span>Programación</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 rounded-lg font-medium hover:bg-blue-100 transition-all duration-300 hover:-translate-y-0.5">
                    <FaChartLine />
                    <span>Ranking</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Carrusel de promociones minimalista */}
            <div className={`relative transition-all duration-700 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {/* Promoción actual */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${promo.color} transition-all duration-500`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${promo.color} bg-opacity-10 text-gray-700`}>
                        {promo.icon}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Próximo evento
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                          {promo.title}
                        </h3>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentPromo + 1}/{promotions.length}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {promo.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {promotions.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPromo(i)}
                          className={`w-8 h-1 rounded-full transition-all duration-300 ${
                            i === currentPromo 
                              ? `bg-gradient-to-r ${promo.color}` 
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 group">
                      <span>Ver detalles</span>
                      <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de ubicación */}
            <div className={`mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 transition-all duration-700 delay-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <FaMapMarkerAlt className="text-blue-500" />
              <span>Transmitiendo desde Jujuy, Argentina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo adicionales */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Animación CSS para las ondas de radio */}
      <style jsx>{`
        @keyframes radioWave {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        .radio-wave {
          animation: radioWave 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default HeroPage