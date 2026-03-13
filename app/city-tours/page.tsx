'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, MapPin, Star, Users, DollarSign, Clock, Anchor } from 'lucide-react';

// ✅ Base de datos COMPLETA de transporte con información real
const transportServices = [ 
  {
    slug: 'chiva-rumbera',
    name: 'Chiva Rumbera Tradicional',
    type: 'bus',
    description: 'Recorrido tradicional por Cartagena con música en vivo y parada en discoteca. ¡Experiencia 100% colombiana!',
    location: 'Recogida en hotel',
    price: 'por Acordar',
    priceText: 'por Acordar',
    rating: 4.9,
    reviews: 203,
    image: '/images/transporte/chiva-rumbera-tradicional.jpg',
    emoji: '🚌',
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    category: 'terrestre'
  },
  {
    slug: 'limo-hummer',
    name: 'Limo Hummer Convertible',
    type: 'limusina',
    description: 'Limusina Hummer convertible con champagne, decoración, sonido profesional, luces, alfombra roja y conductor uniformado.',
    location: 'Recogida en hotel',
    price: 'por Acordar',
    priceText: 'por Acordar',
    rating: 5.0,
    reviews: 67,
    image: '/images/transporte/limo-hummer.jpg',
    emoji: '🚗',
    capacity: 16,
    duration: '1 hora',
    departure: 'Recogida en puerta del hotel',
    category: 'limusina'
  },
  {
    slug: 'city-tour-discoteca',
    name: 'City Tour Discoteca',
    type: 'bus',
    description: 'Recorrido nocturno por Cartagena con parada en discoteca. Animación, música crossover y entrada incluida.',
    location: 'Recogida en hotel',
    price: 'por Acordar',
    priceText: 'por Acordar',
    rating: 4.7,
    reviews: 134,
    image: '/images/transporte/city-tour-discoteca.jpg',
    emoji: '🚌',
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    category: 'terrestre'
  }
];

// Categorías de transporte
const transportCategories = [
  { id: 'todos', name: 'Todos', icon: '🚢' }, 
  { id: 'terrestre', name: 'Chivas', icon: '🚌' },  
  { id: 'limusina', name: 'Limusinas', icon: '🚗' }
];

export default function TransportePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [priceRange, setPriceRange] = useState('todos');
  const [sortBy, setSortBy] = useState('popularity');

  // Filtrar servicios
  const filteredServices = transportServices.filter(service => {
    const matchesSearch = !searchTerm || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todos' || service.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'economico') matchesPrice = service.price > 0 && service.price < 500000;
    else if (priceRange === 'medio') matchesPrice = service.price >= 500000 && service.price < 1500000;
    else if (priceRange === 'premium') matchesPrice = service.price >= 1500000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Ordenar
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'price-asc' && a.price > 0 && b.price > 0) return a.price - b.price;
    if (sortBy === 'price-desc' && a.price > 0 && b.price > 0) return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'capacity') return b.capacity - a.capacity;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-yamid-ocean to-yamid-palm py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            City Tours Exclusivos 🚌
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
           Chivas, limusinas y más para disfrutar con estilo La Ciudad 
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
                placeholder="🔍 Buscar chivas o limo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
              />
            </div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                {transportCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="todos">💰 Todos los precios</option>
                <option value="economico">$ Económico (&lt; $500k)</option>
                <option value="medio">$$ Medio ($500k - $1.5M)</option>
                <option value="premium">$$$ Premium (&gt; $1.5M)</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="popularity">⭐ Popularidad</option>
                <option value="rating">🏆 Mejor calificados</option>
                <option value="capacity">👥 Mayor capacidad</option>
                <option value="price-asc">💰 Menor precio</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-12">
        {sortedServices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-600">No encontramos servicios con esos filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedServices.map((service) => (
              <Link 
                key={service.slug} 
                href={`/transporte/${service.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-yamid-ocean">
                  <Image 
                    src={service.image} 
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                          <span class="text-7xl opacity-50">${service.emoji}</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yamid-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {transportCategories.find(t => t.id === service.category)?.icon} {service.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{service.rating}</span>
                  </div>
                </div>
                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{service.departure}</span>
                  </div>
                  <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {service.capacity} personas
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {service.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Desde</span>
                      <p className="text-lg font-bold text-yamid-gold">
                        {service.priceText}
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
            ¿Necesitas algo personalizado?
          </h2>
          <p className="text-gray-700 mb-8">
            Coordinamos traslados especiales, eventos corporativos y experiencias a medida
          </p>
          <Link 
            href="/contacto"
            className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Cotizar servicio personalizado
          </Link>
        </div>
      </section>
    </main>
  );
}