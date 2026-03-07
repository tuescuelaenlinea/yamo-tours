'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Search, Filter, Clock, MapPin, Star, DollarSign } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// ✅ Base de datos completa de tours
const allTours = [
  {
    slug: 'Bora-Bora',
    name: 'Bora Bora Beach Club',
    description: 'Exclusivo beach club con playa privada, piscina infinity y la mejor experiencia en Tierra Bomba.',
    duration: '8 horas',
    location: 'Tierra Bomba',
    price: 150000,
    rating: 4.9,
    reviews: 156,
    image: '/images/tours/Bora-Bora/hero.jpg',
    emoji: '🏝️',
    category: 'beach-club',
    featured: true
  },
  {
    slug: 'makani',
    name: 'Makani - Club de playa Luxury',
    description: 'Club de playa con diseño exclusivo, gastronomía gourmet y atención personalizada de lujo.',
    duration: '6 horas',
    location: 'Tierra Bomba',
    price: 120000,
    rating: 4.8,
    reviews: 203,
    image: '/images/tours/makani/hero.jpg',
    emoji: '🏖️',
    category: 'beach-club',
    featured: true
  },
  {
    slug: 'sibarita',
    name: 'Cena Sibarita Master',
    description: 'Experiencia gastronómica única en el corazón de Cartagena con menú de varios tiempos.',
    duration: '4 horas',
    location: 'Cartagena Histórica',
    price: 180000,
    rating: 4.7,
    reviews: 189,
    image: '/images/tours/sibarita/hero.jpg',
    emoji: '🍽️',
    category: 'gastronomico',
    featured: true
  },
  {
    slug: 'islas-del-rosario',
    name: 'Islas del Rosario - Tour Completo',
    description: 'Navega por aguas cristalinas, explora arrecifes de coral y relájate en playas de arena blanca.',
    duration: '8 horas',
    location: 'Islas del Rosario',
    price: 150000,
    rating: 4.8,
    reviews: 312,
    image: '/images/tours/islas-rosario/hero.jpg',
    emoji: '🏝️',
    category: 'islas',
    featured: true
  },
  {
    slug: 'playa-blanca',
    name: 'Playa Blanca - Barú',
    description: 'La playa más famosa del Caribe colombiano. Arena blanca, aguas turquesas y relax total.',
    duration: '6 horas',
    location: 'Barú',
    price: 120000,
    rating: 4.6,
    reviews: 278,
    image: '/images/tours/playa-blanca/hero.jpg',
    emoji: '🏖️',
    category: 'playa',
    featured: false
  },
  {
    slug: 'volcan-totumo',
    name: 'Volcán del Totumo',
    description: 'Báñate en lodo volcánico con propiedades terapéuticas en un entorno mágico.',
    duration: '4 horas',
    location: 'Totumo',
    price: 80000,
    rating: 4.7,
    reviews: 245,
    image: '/images/tours/volcan-totumo/hero.jpg',
    emoji: '🌋',
    category: 'aventura',
    featured: false
  },
  {
    slug: 'ciudad-amurallada',
    name: 'Tour Ciudad Amurallada',
    description: 'Recorre la historia de Cartagena caminando por sus calles empedradas y murallas centenarias.',
    duration: '3 horas',
    location: 'Cartagena Histórica',
    price: 60000,
    rating: 4.9,
    reviews: 421,
    image: '/images/tours/ciudad-amurallada/hero.jpg',
    emoji: '🏰',
    category: 'cultural',
    featured: false
  },
  {
    slug: 'acuario-islas',
    name: 'Acuario y Snorkel en Islas',
    description: 'Nada con peces tropicales en aguas cristalinas y visita el acuario natural.',
    duration: '5 horas',
    location: 'Islas del Rosario',
    price: 100000,
    rating: 4.5,
    reviews: 167,
    image: '/images/tours/acuario/hero.jpg',
    emoji: '🐠',
    category: 'islas',
    featured: false
  },
  {
    slug: 'pan-de-azucar',
    name: 'Pan de Azúcar y Islas',
    description: 'Visita la isla Pan de Azúcar con su famoso restaurante y aguas transparentes.',
    duration: '7 horas',
    location: 'Islas del Rosario',
    price: 140000,
    rating: 4.7,
    reviews: 198,
    image: '/images/tours/pan-azucar/hero.jpg',
    emoji: '🏝️',
    category: 'islas',
    featured: false
  }
];

// Categorías disponibles
const categories = [
  { id: 'todos', name: 'Todos los Tours', icon: '🎯' },
  { id: 'beach-club', name: 'Beach Club', icon: '🏖️' },
  { id: 'islas', name: 'Islas', icon: '🏝️' },
  { id: 'playa', name: 'Playas', icon: '🌊' },
  { id: 'gastronomico', name: 'Gastronómicos', icon: '🍽️' },
  { id: 'cultural', name: 'Culturales', icon: '🏰' },
  { id: 'aventura', name: 'Aventura', icon: '🌋' }
];

// ✅ Componente interno que usa useSearchParams
function ToursContent() {
  const searchParams = useSearchParams();
  
  // ✅ Estado inicializado desde URL params
  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParams.get('q') || '';
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get('categoria') || 'todos';
  });
  const [priceRange, setPriceRange] = useState('todos');
  const [sortBy, setSortBy] = useState('popularity');

  // ✅ Sincronizar URL params con estado
  useEffect(() => {
    const q = searchParams.get('q');
    const categoria = searchParams.get('categoria');
    
    if (q && q !== searchTerm) setSearchTerm(q);
    if (categoria && categoria !== selectedCategory) setSelectedCategory(categoria);
  }, [searchParams, searchTerm, selectedCategory]);

  // ✅ Filtrar tours con useMemo
  const filteredTours = useMemo(() => {
    return allTours.filter(tour => {
      const matchesSearch = !searchTerm || 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'todos' || tour.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange === 'economico') matchesPrice = tour.price < 100000;
      else if (priceRange === 'medio') matchesPrice = tour.price >= 100000 && tour.price < 150000;
      else if (priceRange === 'premium') matchesPrice = tour.price >= 150000;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  // ✅ Ordenar tours
  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });
  }, [filteredTours, sortBy]);

  // ✅ Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('todos');
    setPriceRange('todos');
    setSortBy('popularity');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yamid-palm to-yamid-gold py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Nuestros Tours 🏝️</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Descubre las mejores experiencias en el Caribe colombiano
          </p>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="bg-white shadow-md sticky top-20 z-40 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="🔍 Buscar tour o destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-yamid-gold cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-yamid-gold cursor-pointer"
              >
                <option value="todos">💰 Todos los precios</option>
                <option value="economico">$ Económico (&lt; $100k)</option>
                <option value="medio">$$ Medio ($100k - $150k)</option>
                <option value="premium">$$$ Premium (&gt; $150k)</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-yamid-gold cursor-pointer"
              >
                <option value="popularity">⭐ Popularidad</option>
                <option value="rating">🏆 Mejor calificados</option>
                <option value="price-asc">💰 Menor precio</option>
                <option value="price-desc">💎 Mayor precio</option>
                <option value="featured">✨ Destacados</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-yamid-palm">{sortedTours.length}</span> tours encontrados
              {searchTerm && <span className="ml-2">para "<strong>{searchTerm}</strong>"</span>}
            </p>
            {(searchTerm || selectedCategory !== 'todos' || priceRange !== 'todos') && (
              <button
                onClick={clearFilters}
                className="text-yamid-gold hover:underline text-sm font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid de Tours */}
      <section className="container mx-auto px-4 py-12">
        {sortedTours.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-2xl font-bold text-yamid-palm mb-2">No encontramos tours</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `Intenta con otra búsqueda para "${searchTerm}"` 
                : 'Intenta con otros filtros o términos de búsqueda'}
            </p>
            <button
              onClick={clearFilters}
              className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver todos los tours
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <Link 
                key={tour.slug} 
                href={`/tours/${tour.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-yamid-gold"
              >
                <div className="relative h-56 overflow-hidden">
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    {tour.featured && (
                      <span className="bg-yamid-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ Destacado
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-yamid-palm px-3 py-1 rounded-full text-xs font-semibold">
                      {tour.duration}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{tour.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors line-clamp-1">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{tour.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{tour.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{tour.reviews} reseñas</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Desde</span>
                      <p className="text-2xl font-bold text-yamid-gold">
                        ${tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-600">COP</span>
                      </p>
                    </div>
                    <span className="text-yamid-gold font-semibold group-hover:translate-x-2 transition-transform text-lg">
                      Ver →
                    </span>
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
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Creamos experiencias personalizadas para ti y tu grupo. Contáctanos y diseñemos algo único.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contacto"
              className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Contactar Ahora
            </Link>
            <Link 
              href="/destinos"
              className="bg-white hover:bg-gray-100 text-yamid-palm border-2 border-yamid-palm px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Ver Destinos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ✅ Componente principal que envuelve en Suspense
export default function ToursPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yamid-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tours...</p>
        </div>
      </div>
    }>
      <ToursContent />
    </Suspense>
  );
}