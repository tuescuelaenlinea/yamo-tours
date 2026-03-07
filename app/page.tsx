'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ✅ Imports CSS para Swiper v11
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Datos de tours para el slider
const sliderTours = [
    {
    slug: 'yamo',
    name: 'Agencia de turismo',
    description: 'Exclusivo beach club con playa privada y piscina infinity',
    image: '/images/cartagena-yamo2.jpg',
    duration: '8 horas',
    price: 0,
    emoji: '🏝️',
    showInfo: false  // ✅ PRIMERA SLIDE: Sin texto ni botones
  },
  {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    description: 'Exclusivo beach club con playa privada y piscina infinity',
    image: '/images/tours/Bora-Bora/hero.jpg',
    duration: '8 horas',
    price: 150000,
    emoji: '🏝️',
    showInfo: true  // ✅ PRIMERA SLIDE: Sin texto ni botones
  },
  {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury',
    description: 'Experiencia de lujo en Tierra Bomba con gastronomía gourmet',
    image: '/images/tours/makani/hero.jpg',
    duration: '6 horas',
    price: 120000,
    emoji: '🏖️',
    showInfo: true  // ✅ Slides siguientes: Con información
  },
  {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    description: 'Experiencia gastronómica única en Cartagena',
    image: '/images/tours/sibarita/hero.jpg',
    duration: '4 horas',
    price: 180000,
    emoji: '🍽️',
    showInfo: true
  }
];

// Tours populares (debajo del slider)
const popularTours = [
  {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    duration: '8 horas',
    location: 'Desde Cartagena',
    image: '/images/tours/Bora-Bora/hero.jpg',
    emoji: '🏝️'
  },
  {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury en Tierra Bomba',
    duration: '6 horas',
    location: 'Desde Cartagena',
    image: '/images/tours/makani/hero.jpg',
    emoji: '🏖️'
  },
  {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    duration: '4 horas',
    location: 'Desde Cartagena',
    image: '/images/tours/sibarita/hero.jpg',
    emoji: '🌋'
  }
];

export default function Home() {
  return (
    <main>
      {/* Estilos CSS personalizados para el efecto Ken Burns */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.15) translate(-2%, -2%);
          }
        }
        
        .ken-burns-effect {
          animation: kenBurns 8s ease-out forwards;
          animation-play-state: running;
        }
        
        .swiper-slide-active .ken-burns-effect {
          animation: kenBurns 8s ease-out forwards;
        }
        
        .swiper-slide:not(.swiper-slide-active) .ken-burns-effect {
          animation-play-state: paused;
          transform: scale(1) translate(0, 0);
        }
      `}</style>

      {/* 🎠 Slider Hero Section con Swiper */}
      <section className="relative h-[600px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom'
          }}
          loop={true}
          speed={1000}
          className="h-full"
        >
          {sliderTours.map((tour, index) => (
            <SwiperSlide key={tour.slug}>
              <div className="relative h-[600px] overflow-hidden">
                {/* Imagen de fondo con efecto Ken Burns (zoom lento) */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    priority={index === 0}
                    className={`object-cover ken-burns-effect`}
                    sizes="100vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="absolute inset-0 bg-gradient-to-br from-yamid-ocean via-yamid-gold to-yamid-palm flex items-center justify-center">
                            <span class="text-9xl opacity-30">${tour.emoji}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                
                {/* Overlay oscuro (más suave para la primera slide) */}
                <div className={`absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent ${!tour.showInfo ? 'opacity-0' : 'opacity-100'}`}></div>
                
                {/* ✅ Contenido SOLO si showInfo es true */}
                {tour.showInfo && (
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl text-white">
                        <div className="inline-block bg-yamid-gold text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                          {tour.duration} • Desde ${tour.price.toLocaleString()} COP
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                          {tour.name}
                        </h1>
                        <p className="text-xl mb-8 text-gray-200">
                          {tour.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            href={`/tours/${tour.slug}`}
                            className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center"
                          >
                            Reservar Ahora
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                          <Link
                            href="/destinos"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all"
                          >
                            Ver Destinos
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación personalizados */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicador de progreso */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-yamid-gold transition-all duration-300" 
            style={{ 
              width: '33.33%',
              animation: 'progress 8s linear infinite'
            }} 
          />
        </div>
      </section>

      {/* Buscador Flotante */}
<section className="relative -mt-16 z-20">
  <div className="container mx-auto px-4">
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const destino = formData.get('destino') as string;
        const fecha = formData.get('fecha') as string;
        const personas = formData.get('personas') as string;
        
        // Construir URL con parámetros de búsqueda
        const params = new URLSearchParams();
        if (destino) params.set('q', destino);
        if (fecha) params.set('fecha', fecha);
        if (personas) params.set('personas', personas);
        
        // Redirigir a la página de tours con los parámetros
        window.location.href = `/tours?${params.toString()}`;
      }}
      className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
          <input
            type="text"
            name="destino"
            placeholder="¿A dónde quieres ir?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personas</label>
          <select 
            name="personas"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
          >
            <option value="">Personas</option>
            <option value="1">1 Persona</option>
            <option value="2">2 Personas</option>
            <option value="3">3 Personas</option>
            <option value="4">4 Personas</option>
            <option value="5+">5+ Personas</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            type="submit"
            className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Buscar Tours
          </button>
        </div>
      </div>
    </form>
  </div>
</section>

      {/* Tours Populares */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yamid-palm mb-4">
              Nuestros Tours Más Populares
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre las experiencias más solicitadas por nuestros visitantes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTours.map((tour) => (
              <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Imagen del tour */}
                  <div className="h-64 relative overflow-hidden">
                    <Image 
                      src={tour.image} 
                      alt={tour.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="absolute inset-0 bg-gradient-to-br from-yamid-ocean to-yamid-gold flex items-center justify-center">
                              <span class="text-7xl opacity-50">${tour.emoji}</span>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-yamid-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tour.duration} • {tour.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yamid-gold font-bold text-lg">Ver Detalles</span>
                      <span className="text-yamid-gold group-hover:translate-x-2 transition-transform text-2xl">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-yamid-palm to-yamid-gold py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para vivir una experiencia inolvidable?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Reserva ahora y obtén un 10% de descuento en tu primera aventura
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center bg-white text-yamid-palm hover:bg-yamid-sand px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Contactar Ahora
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}