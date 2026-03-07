'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Datos de destinos
const destinations = [
  {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    description: 'Exclusivo beach club con playa privada y piscina infinity',
    image: '/images/destinos/Bora-Bora.jpg',
    toursCount: 12,
    emoji: '🏰',
    highlights: ['Playa Privada', 'Piscina Infinity', 'Bebidas', 'Gastronomía']
  },
  {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury en Tierra Bomba',
    description: 'Club de playa con diseño exclusivo y gastronomía gourmet',
    image: '/images/destinos/makani.jpg',
    toursCount: 8,
    emoji: '🏝️',
    highlights: ['Diseño Exclusivo', 'Gastronomía Gourmet', 'Zonas VIP', 'Música en Vivo']
  },
  {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    description: 'Experiencia gastronómica única en el corazón de Cartagena',
    image: '/images/destinos/sibarita.jpg',
    toursCount: 6,
    emoji: '🏖️',
    highlights: ['Menú 5 Tiempos', 'Maridaje', 'Casona Colonial', 'Chef Ejecutivo']
  },
  {
    slug: 'tierra-bomba',
    name: 'Tierra Bomba',
    description: 'Isla cercana a Cartagena con playas tranquilas y cultura afro',
    image: '/images/destinos/tierra-bomba.jpg',
    toursCount: 5,
    emoji: '🌴',
    highlights: ['Playas Tranquilas', 'Cultura Local', 'Gastronomía', 'Paseos en Lancha']
  },
  {
    slug: 'volcan-totumo',
    name: 'Volcán del Totumo',
    description: 'Báñate en lodo volcánico con propiedades terapéuticas',
    image: '/images/destinos/volcan-totumo.jpg',
    toursCount: 3,
    emoji: '🌋',
    highlights: ['Lodo Terapéutico', 'Experiencia Única', 'Fotografías', 'Baño en Laguna']
  },
  {
    slug: 'parque-tayrona',
    name: 'Parque Tayrona',
    description: 'Reserva natural con playas espectaculares y cultura indígena',
    image: '/images/destinos/tayrona.jpg',
    toursCount: 4,
    emoji: '🏞️',
    highlights: ['Senderismo', 'Playas Vírgenes', 'Fauna y Flora', 'Cultura Tayrona']
  }
];

// ✅ Componente interno que usa useSearchParams (envuelto en Suspense)
function DestinosContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParams.get('q') || '';
  });

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-yamid-palm py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yamid-palm to-yamid-gold opacity-90"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Destinos 🗺️</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Explora los lugares más increíbles del Caribe colombiano
          </p>
        </div>
      </section>

      {/* Buscador */}
      <section className="bg-white py-6 shadow-sm sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="🔍 Buscar destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-yamid-gold"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yamid-gold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid de Destinos */}
      <section className="container mx-auto px-4 py-12">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-600 text-lg">
              No encontramos destinos con "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-yamid-gold font-semibold hover:underline"
            >
              Ver todos los destinos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <Link 
                key={dest.slug} 
                href={`/destinos/${dest.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yamid-gold"
              >
                <div className="relative h-48 overflow-hidden bg-yamid-ocean">
                  <Image 
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-7xl">${dest.emoji}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-yamid-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {dest.toursCount} tours
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{dest.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-yamid-sand text-yamid-dark px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Ver tours disponibles</span>
                    <span className="text-yamid-gold font-semibold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-yamid-sand py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-yamid-palm mb-4">
            ¿No encuentras tu destino ideal?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Contáctanos y creamos una experiencia personalizada
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}

// ✅ Componente principal que envuelve en Suspense
export default function DestinosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yamid-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando destinos...</p>
        </div>
      </div>
    }>
      <DestinosContent />
    </Suspense>
  );
}