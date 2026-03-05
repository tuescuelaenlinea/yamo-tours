'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

// ✅ Datos de destinos y sus tours - Rutas de imágenes corregidas
const destinationsData: Record<string, any> = {
  'Bora-Bora': {
    name: 'Bora Bora Beach Club',
    description: 'Exclusivo beach club con playa privada, piscina infinity y la mejor experiencia en Tierra Bomba.',
    emoji: '🏰',
    image: '/images/destinos/Bora-Bora.jpg',
    tours: [
      {
        slug: 'Bora-Bora',
        name: 'Bora Bora Beach Club - Día Completo',
        duration: '8 horas',
        price: 150000,
        rating: 4.9,
        image: '/images/tours/Bora-Bora/hero.jpg'
      }
    ]
  },
  'makani': {
    name: 'Makani - Club de playa Luxury en Tierra Bomba',
    description: 'Club de playa con diseño exclusivo, gastronomía gourmet y atención personalizada de lujo.',
    emoji: '🏝️',
    image: '/images/destinos/makani.jpg',
    tours: [
      {
        slug: 'makani',
        name: 'Makani Beach Club - Experiencia Luxury',
        duration: '6 horas',
        price: 120000,
        rating: 4.8,
        image: '/images/tours/makani/hero.jpg'
      }
    ]
  },
  'sibarita': {
    name: 'Cena Sibarita Master',
    description: 'Experiencia gastronómica única en el corazón de Cartagena con menú de varios tiempos.',
    emoji: '🏖️',
    image: '/images/destinos/sibarita.jpg',
    tours: [
      {
        slug: 'sibarita',
        name: 'Cena Sibarita Master - 5 Tiempos',
        duration: '4 horas',
        price: 180000,
        rating: 4.7,
        image: '/images/tours/sibarita/hero.jpg'
      }
    ]
  },
  'tierra-bomba': {
    name: 'Tierra Bomba',
    description: 'Isla cercana a Cartagena con playas tranquilas, cultura afro y experiencias auténticas.',
    emoji: '🌴',
    image: '/images/destinos/tierra-bomba.jpg',
    tours: [
      {
        slug: 'tierra-bomba-cultural',
        name: 'Tierra Bomba Cultural',
        duration: '5 horas',
        price: 95000,
        rating: 4.5,
        image: '/images/tours/tierra-bomba/hero.jpg'
      }
    ]
  },
  'volcan-totumo': {
    name: 'Volcán del Totumo',
    description: 'Experiencia única: báñate en lodo volcánico con propiedades terapéuticas en un entorno mágico.',
    emoji: '🌋',
    image: '/images/destinos/volcan-totumo.jpg',
    tours: [
      {
        slug: 'volcan-totumo',
        name: 'Volcán del Totumo',
        duration: '4 horas',
        price: 80000,
        rating: 4.7,
        image: '/images/tours/volcan-totumo/hero.jpg'
      }
    ]
  },
  'parque-tayrona': {
    name: 'Parque Tayrona',
    description: 'Reserva natural con playas espectaculares, senderos ecológicos y cultura indígena.',
    emoji: '🏞️',
    image: '/images/destinos/tayrona.jpg',
    tours: [
      {
        slug: 'tayrona-ecologico',
        name: 'Tayrona Ecológico',
        duration: '10 horas',
        price: 200000,
        rating: 4.9,
        image: '/images/tours/tayrona/hero.jpg'
      }
    ]
  }
};

export default function DestinationDetail() {
  // ✅ Obtener el slug dinámico correctamente
  const params = useParams();
  const slug = params?.slug as string;
  
  const destination = destinationsData[slug];

  // Si no existe el destino, mostrar mensaje
  if (!destination) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">🗺️</p>
          <h1 className="text-2xl font-bold text-yamid-palm mb-4">Destino no encontrado</h1>
          <p className="text-gray-600 mb-2">
            Slug recibido: <strong className="text-yamid-gold">{slug}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Destinos disponibles: {Object.keys(destinationsData).join(', ')}
          </p>
          <Link 
            href="/destinos"
            className="inline-flex items-center text-yamid-gold hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a destinos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-72">
        {/* ✅ Imagen de fondo del destino con fallback */}
        <div className="absolute inset-0 bg-yamid-ocean">
          <Image 
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                    <span class="text-9xl opacity-30">${destination.emoji}</span>
                  </div>
                `;
              }
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Link 
              href="/destinos"
              className="inline-flex items-center text-sm mb-4 hover:text-yamid-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver a destinos
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {destination.emoji} {destination.name}
            </h1>
            <p className="text-lg opacity-95 max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container mx-auto px-4 py-12">
        
        {/* Tours Disponibles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-yamid-palm mb-6">
            Tours disponibles en {destination.name}
          </h2>
          
          {destination.tours.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Pronto tendremos tours disponibles para este destino. ¡Contáctanos para más info!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.tours.map((tour: any) => (
                <Link 
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 hover:border-yamid-gold"
                >
                  {/* ✅ Imagen del tour con fallback */}
                  <div className="relative h-40 bg-yamid-ocean overflow-hidden">
                    <Image 
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                              <span class="text-5xl opacity-80">🏝️</span>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center bg-white px-2 py-1 rounded-full shadow">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold ml-1">{tour.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info del tour */}
                  <div className="p-5">
                    <h3 className="font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                      {tour.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500">Desde</span>
                        <p className="text-lg font-bold text-yamid-gold">
                          ${tour.price.toLocaleString()} COP
                        </p>
                      </div>
                      <span className="text-yamid-gold font-semibold group-hover:translate-x-1 transition-transform">
                        Ver →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Información del Destino */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h3 className="text-xl font-bold text-yamid-palm mb-4">
            📍 Sobre {destination.name}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {destination.description}
          </p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yamid-sand rounded-lg">
              <MapPin className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
              <span className="text-sm font-medium">Caribe Colombiano</span>
            </div>
            <div className="text-center p-4 bg-yamid-sand rounded-lg">
              <Clock className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
              <span className="text-sm font-medium">Todo el año</span>
            </div>
            <div className="text-center p-4 bg-yamid-sand rounded-lg">
              <span className="text-2xl mb-2 block">🌡️</span>
              <span className="text-sm font-medium">28°C promedio</span>
            </div>
            <div className="text-center p-4 bg-yamid-sand rounded-lg">
              <span className="text-2xl mb-2 block">🗣️</span>
              <span className="text-sm font-medium">Español</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-yamid-palm rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            ¿Listo para vivir la experiencia?
          </h3>
          <p className="mb-6 opacity-95">
            Reserva ahora y asegura tu lugar en esta aventura inolvidable
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center bg-white text-yamid-palm hover:bg-yamid-sand px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Reservar Ahora
          </Link>
        </div>

      </section>
    </main>
  );
}