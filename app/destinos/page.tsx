'use client';
import Link from 'next/link';
import Image from 'next/image';

// Datos de destinos
const destinations = [
  {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    description: 'Exclusivo beach club con playa privada, piscina infinity y la mejor experiencia en Tierra Bomba.',
    image: '/images/destinos/Bora-Bora.jpg',  // ✅ Coincide con el archivo
    toursCount: 12,
    emoji: '🏰',
    highlights: ['Playa Privada', 'Piscina Infinity', 'Bebidas', 'Gastronomía']
  },
  {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury en Tierra Bomba',
    description: 'Club de playa con diseño exclusivo, gastronomía gourmet y atención personalizada de lujo.',
    image: '/images/destinos/makani.jpg',  // ✅ Minúscula (como está en la carpeta)
    toursCount: 8,
    emoji: '🏝️',
    highlights: ['Diseño Exclusivo', 'Gastronomía Gourmet', 'Zonas VIP', 'Música en Vivo']
  },
  {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    description: 'Experiencia gastronómica única en el corazón de Cartagena con menú de varios tiempos.',
    image: '/images/destinos/sibarita.jpg',  // ✅ Correcto
    toursCount: 6,
    emoji: '🏖️',
    highlights: ['Menú 5 Tiempos', 'Maridaje', 'Casona Colonial', 'Chef Ejecutivo']
  },
  {
    slug: 'tierra-bomba',
    name: 'Tierra Bomba',
    description: 'Isla cercana a Cartagena con playas tranquilas, cultura afro y experiencias auténticas.',
    image: '/images/destinos/tierra-bomba.jpg',
    toursCount: 5,
    emoji: '🌴',
    highlights: ['Playas Tranquilas', 'Cultura Local', 'Gastronomía', 'Paseos en Lancha']
  },
  {
    slug: 'volcan-totumo',
    name: 'Volcán del Totumo',
    description: 'Experiencia única: báñate en lodo volcánico con propiedades terapéuticas.',
    image: '/images/destinos/volcan-totumo.jpg',
    toursCount: 3,
    emoji: '🌋',
    highlights: ['Lodo Terapéutico', 'Experiencia Única', 'Fotografías', 'Baño en Laguna']
  },
  {
    slug: 'parque-tayrona',
    name: 'Parque Tayrona',
    description: 'Reserva natural con playas espectaculares, senderos ecológicos y cultura indígena.',
    image: '/images/destinos/tayrona.jpg',
    toursCount: 4,
    emoji: '🏞️',
    highlights: ['Senderismo', 'Playas Vírgenes', 'Fauna y Flora', 'Cultura Tayrona']
  }
];

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-yamid-palm py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yamid-palm to-yamid-gold opacity-90"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Destinos 🗺️
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Explora los lugares más increíbles del Caribe colombiano y elige tu próxima aventura
          </p>
        </div>
      </section>

      {/* Buscador de Destinos */}
      <section className="bg-white py-6 shadow-sm sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="🔍 Buscar destino..."
              className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
              onChange={(e) => {
                const filter = e.target.value.toLowerCase();
                const cards = document.querySelectorAll('[data-destino]');
                cards.forEach(card => {
                  const name = card.getAttribute('data-destino')?.toLowerCase() || '';
                  (card as HTMLElement).style.display = name.includes(filter) ? 'block' : 'none';
                });
              }}
            />
          </div>
        </div>
      </section>

      {/* Grid de Destinos */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link 
              key={dest.slug} 
              href={`/destinos/${dest.slug}`}
              data-destino={dest.name}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yamid-gold"
            >
              {/* ✅ Imagen del destino con fallback */}
              <div className="relative h-48 overflow-hidden bg-yamid-ocean">
                <Image 
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    // Si falla la imagen, muestra emoji
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

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                  {dest.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {dest.description}
                </p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.slice(0, 3).map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-yamid-sand text-yamid-dark px-3 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Ver tours disponibles</span>
                  <span className="text-yamid-gold font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yamid-sand py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-yamid-palm mb-4">
            ¿No encuentras tu destino ideal?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Contáctanos y creamos una experiencia personalizada para ti y tu grupo
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contactar Ahora
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}