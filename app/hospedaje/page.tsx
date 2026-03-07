'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, MapPin, Star, Bed, Users, DollarSign, Wifi, Car, Coffee } from 'lucide-react';

// ✅ Base de datos de hospedajes
const accommodations = [
  {
    slug: 'villa-caribe',
    name: 'Villa Caribe Luxury',
    type: 'villa',
    description: 'Villa exclusiva con piscina privada, vista al mar y servicio de concierge.',
    location: 'Bocagrande, Cartagena',
    price: 450000,
    rating: 4.9,
    reviews: 87,
    image: '/images/hospedaje/villa-caribe.jpg',
    emoji: '🏡',
    capacity: 8,
    bedrooms: 4,
    amenities: ['wifi', 'piscina', 'aire-acondicionado', 'cocina', 'parqueo']
  },
  {
    slug: 'casa-colonial',
    name: 'Casa Colonial Getsemaní',
    type: 'casa',
    description: 'Encantadora casa colonial restaurada en el corazón del barrio Getsemaní.',
    location: 'Getsemaní, Cartagena',
    price: 280000,
    rating: 4.8,
    reviews: 124,
    image: '/images/hospedaje/casa-colonial.jpg',
    emoji: '🏠',
    capacity: 6,
    bedrooms: 3,
    amenities: ['wifi', 'aire-acondicionado', 'cocina', 'terraza']
  },
  {
    slug: 'finca-tayrona',
    name: 'Finca Ecológica Tayrona',
    type: 'finca',
    description: 'Retiro ecológico cerca del Parque Tayrona, ideal para desconectar y conectar con la naturaleza.',
    location: 'Santa Marta',
    price: 320000,
    rating: 4.7,
    reviews: 56,
    image: '/images/hospedaje/finca-tayrona.jpg',
    emoji: '🌴',
    capacity: 12,
    bedrooms: 5,
    amenities: ['wifi', 'piscina', 'cocina', 'parqueo', 'jardin']
  },
  {
    slug: 'hotel-boutique',
    name: 'Hotel Boutique Muralla',
    type: 'hotel',
    description: 'Hotel boutique dentro de la ciudad amurallada con diseño colonial moderno.',
    location: 'Centro Histórico, Cartagena',
    price: 380000,
    rating: 4.9,
    reviews: 203,
    image: '/images/hospedaje/hotel-boutique.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    amenities: ['wifi', 'aire-acondicionado', 'desayuno', 'recepcion-24h']
  },
  {
    slug: 'apartamento-playa',
    name: 'Apartamento Frente al Mar',
    type: 'apartamento',
    description: 'Moderno apartamento con vista panorámica al mar y acceso directo a la playa.',
    location: 'Bocagrande, Cartagena',
    price: 220000,
    rating: 4.6,
    reviews: 145,
    image: '/images/hospedaje/apartamento-playa.jpg',
    emoji: '🏢',
    capacity: 4,
    bedrooms: 2,
    amenities: ['wifi', 'piscina', 'aire-acondicionado', 'cocina', 'gimnasio']
  },
  {
    slug: 'finca-cafe',
    name: 'Finca Cafetera Montaña',
    type: 'finca',
    description: 'Experiencia auténtica en una finca cafetera con tours de café y naturaleza.',
    location: 'Salento, Quindío',
    price: 180000,
    rating: 4.8,
    reviews: 92,
    image: '/images/hospedaje/finca-cafe.jpg',
    emoji: '☕',
    capacity: 10,
    bedrooms: 4,
    amenities: ['wifi', 'cocina', 'parqueo', 'tours-cafe', 'jardin']
  }
];

// Tipos de hospedaje
const accommodationTypes = [
  { id: 'todos', name: 'Todos', icon: '🏠' },
  { id: 'hotel', name: 'Hoteles', icon: '🏨' },
  { id: 'casa', name: 'Casas', icon: '🏡' },
  { id: 'villa', name: 'Villas', icon: '🏰' },
  { id: 'apartamento', name: 'Apartamentos', icon: '🏢' },
  { id: 'finca', name: 'Fincas', icon: '🌴' }
];

// Iconos de amenidades
const amenityIcons: Record<string, any> = {
  'wifi': Wifi,
  'piscina': () => <span className="text-lg">🏊</span>,
  'aire-acondicionado': () => <span className="text-lg">❄️</span>,
  'cocina': Coffee,
  'parqueo': Car,
  'desayuno': () => <span className="text-lg">🥐</span>,
  'recepcion-24h': () => <span className="text-lg">🕐</span>,
  'terraza': () => <span className="text-lg">🌅</span>,
  'gimnasio': () => <span className="text-lg">💪</span>,
  'jardin': () => <span className="text-lg">🌺</span>,
  'tours-cafe': () => <span className="text-lg">☕</span>
};

export default function HospedajePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [priceRange, setPriceRange] = useState('todos');
  const [sortBy, setSortBy] = useState('popularity');

  // Filtrar hospedajes
  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = !searchTerm || 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'todos' || acc.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange === 'economico') matchesPrice = acc.price < 250000;
    else if (priceRange === 'medio') matchesPrice = acc.price >= 250000 && acc.price < 400000;
    else if (priceRange === 'premium') matchesPrice = acc.price >= 400000;
    
    return matchesSearch && matchesType && matchesPrice;
  });

  // Ordenar
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yamid-palm to-yamid-gold py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Hospedaje Exclusivo 🏨
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Hoteles boutique, casas privadas, villas de lujo y fincas ecológicas
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white shadow-md sticky top-20 z-40 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Buscador */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="🔍 Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Tipo */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                {accommodationTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.icon} {type.name}</option>
                ))}
              </select>

              {/* Precio */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="todos">💰 Todos los precios</option>
                <option value="economico">$ Económico (&lt; $250k)</option>
                <option value="medio">$$ Medio ($250k - $400k)</option>
                <option value="premium">$$$ Premium (&gt; $400k)</option>
              </select>

              {/* Ordenar */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="popularity">⭐ Popularidad</option>
                <option value="rating">🏆 Mejor calificados</option>
                <option value="price-asc">💰 Menor precio</option>
                <option value="price-desc">💎 Mayor precio</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Hospedajes */}
      <section className="container mx-auto px-4 py-12">
        {sortedAccommodations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🏠</p>
            <p className="text-gray-600">No encontramos hospedajes con esos filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAccommodations.map((acc) => (
              <Link 
                key={acc.slug} 
                href={`/hospedaje/${acc.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-yamid-sand">
                  <Image 
                    src={acc.image} 
                    alt={acc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                          <span class="text-7xl opacity-50">${acc.emoji}</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yamid-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {accommodationTypes.find(t => t.id === acc.type)?.icon} {acc.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{acc.rating}</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{acc.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                    {acc.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{acc.description}</p>
                  
                  {/* Capacidad y habitaciones */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {acc.capacity} huéspedes
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {acc.bedrooms} hab
                    </span>
                  </div>
                  
                  {/* Amenidades */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.amenities.slice(0, 4).map((amenity, idx) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <span key={idx} className="text-xs bg-yamid-sand px-2 py-1 rounded flex items-center gap-1">
                          {Icon && <Icon className="w-3 h-3" />}
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                  
                  {/* Precio y CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Desde por noche</span>
                      <p className="text-2xl font-bold text-yamid-gold">
                        ${acc.price.toLocaleString()} <span className="text-sm font-normal text-gray-600">COP</span>
                      </p>
                    </div>
                    <span className="text-yamid-gold font-semibold group-hover:translate-x-2 transition-transform">
                      Ver →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-yamid-sand py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-yamid-palm mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-700 mb-8">
            Tenemos acceso a propiedades exclusivas no listadas públicamente
          </p>
          <Link 
            href="/contacto"
            className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contáctanos para opciones personalizadas
          </Link>
        </div>
      </section>
    </main>
  );
}