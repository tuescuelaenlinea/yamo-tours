'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  MapPin, Star, Bed, Users, Wifi, Car, Coffee, 
  CheckCircle, XCircle, MessageCircle, ArrowLeft 
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Base de datos de hospedajes
const accommodationsData: Record<string, any> = {
  'villa-caribe': {
    slug: 'villa-caribe',
    name: 'Villa Caribe Luxury',
    type: 'villa',
    description: 'Villa exclusiva con piscina privada, vista al mar y servicio de concierge. Perfecta para familias o grupos que buscan privacidad y lujo en Cartagena.',
    location: 'Bocagrande, Cartagena',
    price: 450000,
    rating: 4.9,
    reviews: 87,
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'WiFi de alta velocidad', icon: Wifi, included: true },
      { name: 'Piscina privada', icon: () => <span>🏊</span>, included: true },
      { name: 'Aire acondicionado', icon: () => <span>❄️</span>, included: true },
      { name: 'Cocina equipada', icon: Coffee, included: true },
      { name: 'Parqueo privado', icon: Car, included: true },
      { name: 'Servicio de limpieza diario', icon: CheckCircle, included: true },
      { name: 'Concierge 24/7', icon: CheckCircle, included: true },
      { name: 'Transporte aeropuerto', icon: Car, included: false }
    ],
    images: [
      '/images/hospedaje/villa-caribe/1.jpg',
      '/images/hospedaje/villa-caribe/2.jpg',
      '/images/hospedaje/villa-caribe/3.jpg',
      '/images/hospedaje/villa-caribe/4.jpg'
    ],
    heroImage: '/images/hospedaje/villa-caribe/hero.jpg',
    emoji: '🏡'
  },
  'casa-colonial': {
    slug: 'casa-colonial',
    name: 'Casa Colonial Getsemaní',
    type: 'casa',
    description: 'Encantadora casa colonial restaurada en el corazón del barrio Getsemaní. Arquitectura tradicional con comodidades modernas.',
    location: 'Getsemaní, Cartagena',
    price: 280000,
    rating: 4.8,
    reviews: 124,
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'WiFi', icon: Wifi, included: true },
      { name: 'Aire acondicionado', icon: () => <span>❄️</span>, included: true },
      { name: 'Cocina equipada', icon: Coffee, included: true },
      { name: 'Terraza privada', icon: () => <span>🌅</span>, included: true },
      { name: 'Lavadora', icon: CheckCircle, included: true },
      { name: 'Parqueo', icon: Car, included: false }
    ],
    images: [
      '/images/hospedaje/casa-colonial/1.jpg',
      '/images/hospedaje/casa-colonial/2.jpg',
      '/images/hospedaje/casa-colonial/3.jpg',
      '/images/hospedaje/casa-colonial/4.jpg'
    ],
    heroImage: '/images/hospedaje/casa-colonial/hero.jpg',
    emoji: '🏠'
  },
  'finca-tayrona': {
    slug: 'finca-tayrona',
    name: 'Finca Ecológica Tayrona',
    type: 'finca',
    description: 'Retiro ecológico cerca del Parque Tayrona, ideal para desconectar y conectar con la naturaleza. Experiencia auténtica en la Sierra Nevada.',
    location: 'Santa Marta',
    price: 320000,
    rating: 4.7,
    reviews: 56,
    capacity: 12,
    bedrooms: 5,
    bathrooms: 4,
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    amenities: [
      { name: 'WiFi en áreas comunes', icon: Wifi, included: true },
      { name: 'Piscina natural', icon: () => <span>🏊</span>, included: true },
      { name: 'Cocina compartida', icon: Coffee, included: true },
      { name: 'Parqueo', icon: Car, included: true },
      { name: 'Jardín ecológico', icon: () => <span>🌺</span>, included: true },
      { name: 'Tours de café', icon: () => <span>☕</span>, included: true },
      { name: 'Aire acondicionado', icon: () => <span>❄️</span>, included: false }
    ],
    images: [
      '/images/hospedaje/finca-tayrona/1.jpg',
      '/images/hospedaje/finca-tayrona/2.jpg',
      '/images/hospedaje/finca-tayrona/3.jpg',
      '/images/hospedaje/finca-tayrona/4.jpg'
    ],
    heroImage: '/images/hospedaje/finca-tayrona/hero.jpg',
    emoji: '🌴'
  },
  'hotel-boutique': {
    slug: 'hotel-boutique',
    name: 'Hotel Boutique Muralla',
    type: 'hotel',
    description: 'Hotel boutique dentro de la ciudad amurallada con diseño colonial moderno. Ubicación privilegiada para explorar el centro histórico.',
    location: 'Centro Histórico, Cartagena',
    price: 380000,
    rating: 4.9,
    reviews: 203,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    amenities: [
      { name: 'WiFi', icon: Wifi, included: true },
      { name: 'Aire acondicionado', icon: () => <span>❄️</span>, included: true },
      { name: 'Desayuno incluido', icon: () => <span>🥐</span>, included: true },
      { name: 'Recepción 24h', icon: () => <span>🕐</span>, included: true },
      { name: 'Servicio a la habitación', icon: CheckCircle, included: true },
      { name: 'Spa', icon: () => <span>💆</span>, included: false }
    ],
    images: [
      '/images/hospedaje/hotel-boutique/1.jpg',
      '/images/hospedaje/hotel-boutique/2.jpg',
      '/images/hospedaje/hotel-boutique/3.jpg',
      '/images/hospedaje/hotel-boutique/4.jpg'
    ],
    heroImage: '/images/hospedaje/hotel-boutique/hero.jpg',
    emoji: '🏨'
  }
};

export default function AccommodationDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const accommodation = accommodationsData[slug];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');

  if (!accommodation) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">🏠</p>
          <h1 className="text-2xl font-bold text-yamid-palm mb-4">Hospedaje no encontrado</h1>
          <Link href="/hospedaje" className="text-yamid-gold hover:underline inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a hospedajes
          </Link>
        </div>
      </main>
    );
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '573001234567';
    const nights = checkInDate && checkOutDate 
      ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
      : 1;
    const total = accommodation.price * nights * parseInt(guests);
    
    const message = `🏨 *NUEVA RESERVA - HOSPEDAJE* 🏨

📋 *Detalles de la Reserva:*
━━━━━━━━━━━━━━━━━━━━
🏡 *Propiedad:* ${accommodation.name}
📍 *Ubicación:* ${accommodation.location}
📅 *Check-in:* ${checkInDate || 'Por definir'}
📅 *Check-out:* ${checkOutDate || 'Por definir'}
🌙 *Noches:* ${nights}
👥 *Huéspedes:* ${guests}
💰 *Precio por noche:* $${accommodation.price.toLocaleString()} COP
💵 *Total estimado:* $${total.toLocaleString()} COP
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar disponibilidad y proceder con la reserva.`;

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = accommodation.images.map((img: string) => ({
    src: img,
    alt: `${accommodation.name} - Galería`
  }));

  const relatedAccommodations = Object.values(accommodationsData)
    .filter((a: any) => a.slug !== accommodation.slug && a.type === accommodation.type)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-96">
        <Image 
          src={accommodation.heroImage} 
          alt={accommodation.name}
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
                <div class="absolute inset-0 bg-gradient-to-br from-yamid-ocean to-yamid-gold flex items-center justify-center">
                  <span class="text-9xl opacity-30">${accommodation.emoji}</span>
                </div>
              `;
            }
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{accommodation.name}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {accommodation.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {accommodation.rating} ({accommodation.reviews} reseñas)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda - Información */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Descripción */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{accommodation.description}</p>
            </div>

            {/* Detalles Rápidos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Detalles</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Users className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{accommodation.capacity} huéspedes</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Bed className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{accommodation.bedrooms} habitaciones</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <span className="text-2xl mb-2 block">🚿</span>
                  <span className="text-sm font-medium">{accommodation.bathrooms} baños</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <span className="text-2xl mb-2 block">⭐</span>
                  <span className="text-sm font-medium">{accommodation.rating} rating</span>
                </div>
              </div>
            </div>

            {/* Galería */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accommodation.images.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image 
                      src={img} 
                      alt={`${accommodation.name} - Vista ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="absolute inset-0 flex items-center justify-center bg-yamid-sand">
                              <span class="text-4xl text-yamid-gold-dark">📷</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenidades */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Amenidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity: any, index: number) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${amenity.included ? 'bg-green-50' : 'bg-gray-50'}`}>
                      {amenity.included ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-yamid-gold" />}
                        <span className={amenity.included ? 'text-gray-700' : 'text-gray-400'}>
                          {amenity.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Políticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Políticas</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Check-in:</strong> {accommodation.checkIn}</p>
                <p><strong>Check-out:</strong> {accommodation.checkOut}</p>
                <p><strong>Cancelación:</strong> Gratis hasta 48 horas antes de la llegada</p>
                <p><strong>Mascotas:</strong> No permitidas</p>
                <p><strong>Fiestas:</strong> No permitidas</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha - Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm">Precio por noche</p>
                <p className="text-3xl font-bold text-yamid-palm">${accommodation.price.toLocaleString()} COP</p>
              </div>

              <form onSubmit={handleReservation} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check-in</label>
                  <input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check-out</label>
                  <input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Huéspedes</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  >
                    {Array.from({ length: accommodation.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Huésped' : 'Huéspedes'}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Consultar Disponibilidad</span>
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p>💬 Serás redirigido a WhatsApp para confirmar tu reserva</p>
              </div>
            </div>
          </div>

        </div>

        {/* Hospedajes Relacionados */}
        {relatedAccommodations.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-yamid-palm mb-6">Hospedajes Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAccommodations.map((related: any) => (
                <Link 
                  key={related.slug}
                  href={`/hospedaje/${related.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 bg-yamid-sand">
                    <Image 
                      src={related.heroImage}
                      alt={related.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-5xl">${related.emoji}</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-yamid-palm">{related.name}</h3>
                    <p className="text-sm text-gray-600">{related.location}</p>
                    <p className="text-yamid-gold font-bold mt-2">${related.price.toLocaleString()} COP/noche</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={photos}
        index={currentImageIndex}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{}}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </main>
  );
}