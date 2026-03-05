'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ BASE DE DATOS DE TOURS - Slugs ACTUALIZADOS para coincidir con Home
const toursData: Record<string, any> = {
  'Bora-Bora': {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    rating: 4.8,
    reviews: 156,
    duration: '8 horas',
    startTime: '7:00 AM',
    location: 'Desde Cartagena',
    price: 150000,
    description: 'Disfruta de un día exclusivo en Bora Bora Beach Club. Playa privada, piscina infinity, bebidas y la mejor experiencia en Tierra Bomba.',
    highlights: [
      'Transporte en lancha rápida ida y vuelta',
      'Acceso a playa privada',
      'Piscina infinity con vista al mar',
      'Almuerzo buffet incluido',
      'Bebidas ilimitadas (no alcohólicas)',
      'Toallas y sillas incluidas'
    ],
    includes: [
      'Transporte en lancha',
      'Almuerzo buffet',
      'Bebidas no alcohólicas ilimitadas',
      'Toallas y sillas',
      'Acceso a todas las instalaciones',
      'Seguro de viaje'
    ],
    excludes: [
      'Bebidas alcohólicas',
      'Masajes y spa',
      'Actividades acuáticas extra',
      'Propinas'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Recogida en hotel o punto de encuentro' },
      { time: '9:00 AM', activity: 'Salida en lancha hacia Tierra Bomba' },
      { time: '9:30 AM', activity: 'Llegada a Bora Bora Beach Club' },
      { time: '10:00 AM', activity: 'Tiempo libre: playa, piscina, relax' },
      { time: '1:00 PM', activity: 'Almuerzo buffet' },
      { time: '3:00 PM', activity: 'Más tiempo para disfrutar' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: [
      '/images/tours/Bora-Bora/gallery-1.jpg',
      '/images/tours/Bora-Bora/gallery-2.jpg',
      '/images/tours/Bora-Bora/gallery-3.jpg',
      '/images/tours/Bora-Bora/gallery-4.jpg'
    ],
    heroImage: '/images/tours/Bora-Bora/hero.jpg'
  },
  
  'makani': {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury en Tierra Bomba',
    rating: 4.6,
    reviews: 203,
    duration: '6 horas',
    startTime: '9:00 AM',
    location: 'Desde Cartagena',
    price: 120000,
    description: 'Vive una experiencia de lujo en Makani Beach Club. Diseño moderno, gastronomía de alta calidad y un entorno paradisíaco en Tierra Bomba.',
    highlights: [
      'Club de playa con diseño exclusivo',
      'Gastronomía gourmet caribeña',
      'Zonas VIP disponibles',
      'Música en vivo los fines de semana',
      'Atención personalizada'
    ],
    includes: [
      'Transporte ida y vuelta',
      'Almuerzo gourmet',
      'Welcome drink',
      'Toallas y sillas premium',
      'Acceso a todas las áreas',
      'Seguro de viaje'
    ],
    excludes: [
      'Bebidas alcohólicas premium',
      'Zonas VIP (upgrade disponible)',
      'Masajes y tratamientos',
      'Propinas'
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Recogida en punto de encuentro' },
      { time: '9:45 AM', activity: 'Llegada a Makani Beach Club' },
      { time: '10:00 AM', activity: 'Welcome drink y tour de instalaciones' },
      { time: '11:00 AM', activity: 'Tiempo libre: playa, piscina, fotos' },
      { time: '1:30 PM', activity: 'Almuerzo gourmet' },
      { time: '3:00 PM', activity: 'Relax o actividades opcionales' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: [
      '/images/tours/makani/gallery-1.jpg',
      '/images/tours/makani/gallery-2.jpg',
      '/images/tours/makani/gallery-3.jpg',
      '/images/tours/makani/gallery-4.jpg'
    ],
    heroImage: '/images/tours/makani/hero.jpg'
  },
  
  'sibarita': {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    rating: 4.7,
    reviews: 189,
    duration: '4 horas',
    startTime: '6:00 PM',
    location: 'Cartagena Histórica',
    price: 180000,
    description: 'Una experiencia gastronómica única en el corazón de Cartagena. Cena de varios tiempos con maridaje, en un entorno colonial mágico.',
    highlights: [
      'Menú degustación de 5 tiempos',
      'Maridaje con vinos seleccionados',
      'Ubicación en casona colonial',
      'Chef ejecutivo especializado',
      'Música en vivo ambiental'
    ],
    includes: [
      'Cena completa de 5 tiempos',
      'Maridaje de vinos',
      'Agua y bebidas no alcohólicas',
      'Servicio personalizado',
      'Recuerdo de la experiencia'
    ],
    excludes: [
      'Transporte al restaurante',
      'Vinos premium adicionales',
      'Propinas',
      'Dietas especiales (consultar)'
    ],
    itinerary: [
      { time: '6:00 PM', activity: 'Bienvenida con cóctel de cortesía' },
      { time: '6:30 PM', activity: 'Primer tiempo: Aperitivo' },
      { time: '7:15 PM', activity: 'Segundo tiempo: Entrada fría' },
      { time: '8:00 PM', activity: 'Tercer tiempo: Plato principal' },
      { time: '9:00 PM', activity: 'Cuarto y quinto tiempo: Postres y café' },
      { time: '10:00 PM', activity: 'Final de la experiencia' }
    ],
    images: [
      '/images/tours/sibarita/gallery-1.jpg',
      '/images/tours/sibarita/gallery-2.jpg',
      '/images/tours/sibarita/gallery-3.jpg',
      
    ],
    heroImage: '/images/tours/sibarita/hero.jpg'
  }
};

export default function TourDetail() {
  // ✅ Obtener el slug dinámico correctamente
  const params = useParams();
  const slug = params?.slug as string;
  
  // ✅ Buscar el tour correcto en la base de datos
  const tour = toursData[slug];
  
  // Estado para el lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Si no se encuentra el tour, mostrar mensaje
  if (!tour) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">🏝️</p>
          <h1 className="text-2xl font-bold text-yamid-palm mb-4">Tour no encontrado</h1>
          <p className="text-gray-600 mb-2">
            Slug recibido: <strong className="text-yamid-gold">{slug}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Tours disponibles: {Object.keys(toursData).join(', ')}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center text-yamid-gold hover:underline font-semibold"
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  // Manejar envío de reserva
  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const people = (document.getElementById('people') as HTMLSelectElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    
    const yourNumber = '573001234567'; // ← Cambia por tu número real
    const total = tour.price * parseInt(people);
    
    const message = `🌴 *NUEVA RESERVA - YAMID Tours* 🌴

📋 *Detalles de la Reserva:*
━━━━━━━━━━━━━━━━━━━━
🏝️ *Tour:* ${tour.name}
📅 *Fecha:* ${date}
👥 *Personas:* ${people}
💰 *Precio por persona:* $${tour.price.toLocaleString()} COP
💵 *Total estimado:* $${total.toLocaleString()} COP
━━━━━━━━━━━━━━━━━━━━

👤 *Datos del Cliente:*
━━━━━━━━━━━━━━━━━━━━
📛 *Nombre:* ${name}
📱 *WhatsApp:* ${phone}
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar esta reserva. ¿Me indican los pasos para el pago?`;

    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConsult = () => {
    const yourNumber = '573001234567';
    const message = `Hola YAMID Tours 👋

Tengo una consulta sobre el tour:
🏝️ *${tour.name}*

¿Me pueden brindar más información?`;
    
    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = tour.images.map((img: string) => ({
    src: img,
    alt: `${tour.name} - Galería`
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-96">
        <Image 
          src={tour.heroImage} 
          alt={tour.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.name}</h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tour.rating}</span>
              </div>
              <span>({tour.reviews} reseñas)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda - Información */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Información Básica */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.startTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5 text-yamid-gold" />
                  <span>Grupos pequeños</span>
                </div>
              </div>
            </div>

            {/* Galería de Imágenes con Lightbox */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tour.images.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image 
                      src={img} 
                      alt={`${tour.name} - Vista ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <svg className="w-6 h-6 text-yamid-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">🔍 Haz clic en cualquier imagen para ampliar</p>
            </div>

            {/* Qué Incluye */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Qué Incluye</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-yamid-gold-dark mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-yamid-gold-dark mb-3 flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    No Incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-700">
                        <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Itinerario */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Itinerario</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-yamid-gold text-white px-3 py-1 rounded font-semibold text-sm">
                      {item.time}
                    </div>
                    <p className="text-gray-700 pt-1">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha - Formulario de Reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm">Precio por persona</p>
                <p className="text-3xl font-bold text-yamid-palm">${tour.price.toLocaleString()} COP</p>
              </div>

              <form onSubmit={handleReservation} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fecha</label>
                  <input 
                    type="date" 
                    id="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Personas</label>
                  <select 
                    id="people"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  >
                    <option value="1">1 Persona</option>
                    <option value="2">2 Personas</option>
                    <option value="3">3 Personas</option>
                    <option value="4">4 Personas</option>
                    <option value="5">5 Personas</option>
                    <option value="6">6 Personas</option>
                    <option value="7+">7+ Personas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Tu nombre completo"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">WhatsApp</label>
                  <input 
                    type="tel" 
                    id="phone"
                    placeholder="+57 300 123 4567"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Reservar por WhatsApp</span>
                </button>

                <button 
                  type="button" 
                  onClick={handleConsult}
                  className="w-full border-2 border-yamid-gold text-yamid-gold hover:bg-yamid-gold hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Consultar Dudas
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Cancelación gratuita</span>
                  <span className="text-green-600 font-medium">Hasta 24h antes</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Tours Relacionados */}
      <section className="bg-yamid-sand py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yamid-palm mb-12">
            Tours Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(toursData)
              .filter((t: any) => t.slug !== tour.slug)
              .slice(0, 3)
              .map((relatedTour: any) => (
                <Link 
                  key={relatedTour.slug} 
                  href={`/tours/${relatedTour.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-yamid-ocean flex items-center justify-center">
                    <span className="text-white text-6xl">🏝️</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-yamid-palm mb-2">{relatedTour.name}</h3>
                    <p className="text-gray-600 mb-4">{relatedTour.duration} • {relatedTour.location}</p>
                    <p className="text-yamid-gold font-bold text-lg">${relatedTour.price.toLocaleString()} COP</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={photos}
        index={currentImageIndex}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ showToggle: true }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </main>
  );
}