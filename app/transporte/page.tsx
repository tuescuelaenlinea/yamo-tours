'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, MapPin, Star, Users, DollarSign, Clock, Anchor } from 'lucide-react';

// ✅ Base de datos COMPLETA de transporte con información real
const transportServices = [
  {
    slug: 'yate-55-pies',
    name: 'Yate 55 Pies',
    type: 'yate',
    description: 'Yate exclusivo de 55 pies con 3 cuartos y 3 baños. Perfecto para grupos que buscan lujo y comodidad en el Caribe.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 12,
    image: '/images/transporte/Yate-55-pies/hero.jpg',
    emoji: '🛥️',
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'yate'
  },
  {
    slug: 'bote-10-personas',
    name: 'Bote 10 Personas',
    type: 'bote',
    description: 'Bote cómodo y seguro para grupos pequeños. Ideal para traslados rápidos entre Cartagena y las islas.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 45,
    image: '/images/transporte/bote-10-personas.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'vite-42-pies',
    name: 'Vite 42 Pies - 26 Pax',
    type: 'bote',
    description: 'ESLORA: 42 pies, MOTORES: 2 Yamaha 300 HP. Equipado con asoleadoras, ducha de agua dulce, sanitario interno y escaleras para bajar al mar.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 34,
    image: '/images/transporte/vite-42-pies.jpg',
    emoji: '🚤',
    capacity: 28,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'bahaire-29-pies',
    name: 'Bahaire 29 Pies',
    type: 'bote',
    description: 'Bote ágil y confiable para experiencias en el mar. Equipado con sistema de sonido y chalecos de seguridad.',
    location: 'Muelle de La Bodeguita',
   price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.6,
    reviews: 28,
    image: '/images/transporte/bahaire.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'galea-38-pies',
    name: 'Galea 38 Pies',
    type: 'bote',
    description: 'Bote espacioso con sistema de sonido integrado. Perfecto para paseos grupales con música y diversión.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 31,
    image: '/images/transporte/galea.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'le-marie-33-pies',
    name: 'Bote 33 Pies Le Marie',
    type: 'bote',
    description: 'Bote elegante y cómodo para experiencias memorables en el mar Caribe.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 22,
    image: '/images/transporte/le-marie.jpg',
    emoji: '🚤',
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'chichi-ii',
    name: 'Chichi II',
    type: 'bote',
    description: 'Bote confiable con sistema de sonido. Ideal para grupos pequeños que buscan diversión en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.6,
    reviews: 19,
    image: '/images/transporte/chichi.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'leroy-29-pies',
    name: 'Bote Leroy 29 Pies',
    type: 'bote',
    description: 'Bote equipado con sistema de sonido y chalecos de seguridad. Experiencia segura y divertida.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 15,
    image: '/images/transporte/leroi.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'sea-girl',
    name: 'Bote Sea Girl 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y cómodo. Perfecto para grupos medianos que buscan explorar el Caribe.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 26,
    image: '/images/transporte/sea-girl.jpg',
    emoji: '🚤',
    capacity: 20,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'la-realeza-2',
    name: 'La Realeza 2 - 29 Pies',
    type: 'bote',
    description: 'Bote 29 pies elegante y funcional. Ideal para experiencias privadas en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 18,
    image: '/images/transporte/la-realeza-2.jpg',
    emoji: '🚤',
    capacity: 12,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'bahaire-lujo',
    name: 'Bahaire 29 Pies - Lujo',
    type: 'bote',
    description: 'Bote 29 pies con 2 motores 115 HP. Incluye sonido profesional Bluetooth, tripulación, hielo y gasolina.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 21,
    image: '/images/transporte/bahaire.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'don-bruno',
    name: 'Bote Don Bruno 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y bien equipado. Perfecto para grupos que buscan comodidad y seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 24,
    image: '/images/transporte/don-bruno.jpg',
    emoji: '🚤',
    capacity: 20,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'shamma',
    name: 'Bote Shamma 33 Pies',
    type: 'bote',
    description: 'Bote 33 pies con 2 motores 200 HP. Incluye baño, tripulación, Bluetooth, hielo y gasolina.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 17,
    image: '/images/transporte/shamma.jpg',
    emoji: '🚤',
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'bote-30-pies',
    name: 'Bote 30 Pies',
    type: 'bote',
    description: 'Bote 30 pies con 2 motores 200 HP. Equipado con sonido Bluetooth para máxima diversión.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.6,
    reviews: 29,
    image: '/images/transporte/bote-30-pies.jpg',
    emoji: '🚤',
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'bote-onlyfans',
    name: 'Bote OnlyFans 35 Pies',
    type: 'bote',
    description: 'Bote 35 pies con 2 Suzuki 200 HP. Sonido JL Audio profesional, 10 parlantes, baño, ducha, inversor 110V 3000W.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 14,
    image: '/images/transporte/bote-onlyfans.jpg',
    emoji: '🚤',
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote-premium'
  },
  {
    slug: 'bote-46-pies',
    name: 'Bote 46 Pies',
    type: 'bote',
    description: 'Bote 46 pies con 2 motores 200 HP. Capacidad para grupos grandes con sonido Bluetooth.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 20,
    image: '/images/transporte/bote-46-pies.jpg',
    emoji: '🚤',
    capacity: 35,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'lancha-0es3',
    name: 'Lancha Cero Estrés 42 Pies',
    type: 'bote',
    description: 'Lancha deportiva 42 pies. Diversión garantizada con sistema de sonido Bluetooth y comodidad premium.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 16,
    image: '/images/transporte/lancha-0es3.jpg',
    emoji: '🚤',
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote-premium'
  },
  {
    slug: 'fisher-price-30-pies',
    name: 'Bote Fisher Price 30 Pies',
    type: 'bote',
    description: 'Bote 30 pies con 2 motores Mercury 150. Ducha de agua dulce, asoleadores, enfriador con hielo.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 23,
    image: '/images/transporte/bote-fisher-price-30-pies.jpg',
    emoji: '🚤',
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'malokini-42-pies',
    name: 'Bote Malokini 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y bien equipado. Perfecto para grupos que buscan explorar el Caribe con estilo.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 19,
    image: '/images/transporte/malokini.jpg',
    emoji: '🚤',
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    category: 'bote'
  },
  {
    slug: 'catamaran-moana-lounge',
    name: 'Catamarán Moana Lounge',
    type: 'catamaran',
    description: 'CATAMARÁN MOANA Lounge. Capacidad para 45 personas con pista de baile, cocina, energía 110V y tripulación completa.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 32,
    image: '/images/transporte/catamaran-moana-longe.jpg',
    emoji: '⛵',
    capacity: 45,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran-eventos'
  },
  {
    slug: 'catamaran-armonia',
    name: 'Catamarán Armonía',
    type: 'catamaran',
    description: 'Catamarán con 3 habitaciones, aire acondicionado, 2 baños, cocina y ducha. Ideal para grupos que buscan comodidad.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 27,
    image: '/images/transporte/catamaran-armonia.jpg',
    emoji: '⛵',
    capacity: 16,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran'
  },
  {
    slug: 'powercat-43',
    name: 'Catamarán Powercat 43',
    type: 'catamaran',
    description: 'Catamarán 43 pies con 3 habitaciones, aire acondicionado, cocina y ducha. Perfecto para experiencias premium.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 21,
    image: '/images/transporte/catamaran-powercat.jpg',
    emoji: '⛵',
    capacity: 25,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran'
  },
  {
    slug: 'lagoon-44',
    name: 'Catamarán Lagoon 44',
    type: 'catamaran',
    description: 'Catamarán Lagoon 44 con 4 habitaciones, aire acondicionado, 2 baños, cocina y sistema de sonido Bluetooth.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 25,
    image: '/images/transporte/catamaran-lagoon-44.jpg',
    emoji: '⛵',
    capacity: 23,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran'
  },
  {
    slug: 'powercat-47',
    name: 'Catamarán Powercat 47',
    type: 'catamaran',
    description: 'Catamarán 47 pies con 4 habitaciones, aire acondicionado, cocina y ducha. Capacidad para grupos grandes.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 18,
    image: '/images/transporte/catamaran-powercat-47.jpg',
    emoji: '⛵',
    capacity: 35,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran'
  },
  {
    slug: 'supercat-65',
    name: 'Catamarán Supercat 65',
    type: 'catamaran',
    description: 'Catamarán Supercat 65 con 3 habitaciones, aire acondicionado, 2 baños, cocina y sistema de sonido Bluetooth.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 29,
    image: '/images/transporte/catamaran-supercat-65.jpg',
    emoji: '⛵',
    capacity: 56,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran-eventos'
  },
  {
    slug: 'catamaran-san-juan',
    name: 'Catamarán San Juan',
    type: 'catamaran',
    description: 'Catamarán San Juan con 1 camerino, aire acondicionado, 6 baños, cocina industrial, bar y pista de baile. ¡Para eventos masivos!',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 41,
    image: '/images/transporte/catamaran-san-juan.jpg',
    emoji: '⛵',
    capacity: 150,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran-eventos'
  },
  {
    slug: 'maxicat-65',
    name: 'Catamarán Maxicat 65',
    type: 'catamaran',
    description: 'Catamarán 65 pies con 3 camarotes, aire acondicionado, sonido profesional 1000W, 8 salas lounge, pista de baile y salón con A/C.',
    location: 'Muelle de La Bodeguita',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 38,
    image: '/images/transporte/catamaran-maxicat-65.jpg',
    emoji: '⛵',
    capacity: 80,
    duration: '1-9 horas según destino',
    departure: 'Muelle de La Bodeguita',
    category: 'catamaran-eventos'
  },
  {
    slug: 'party-bus',
    name: 'Party Bus',
    type: 'bus',
    description: 'Recorrido por Cartagena con 3 paradas: Castillo San Felipe, Monumento Zapatos Viejos y Letras de Cartagena. ¡Fiesta sobre ruedas!',
    location: 'Recogida en hotel',
    price: 'Por Acordar',
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 156,
    image: '/images/transporte/party-bus.jpg',
    emoji: '🚌',
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    category: 'terrestre'
  },
  {
    slug: 'chiva-rumbera',
    name: 'Chiva Rumbera Tradicional',
    type: 'bus',
    description: 'Recorrido tradicional por Cartagena con música en vivo y parada en discoteca. ¡Experiencia 100% colombiana!',
    location: 'Recogida en hotel',
    price: 'Por Acordar',
    priceText: 'Por deinir',
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
    price: 'Por Acordar',
    priceText: 'Por deinir',
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
    price: 'Por Acordar',
    priceText: 'Por deinir',
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
  { id: 'yate', name: 'Yates', icon: '🛥️' },
  { id: 'bote', name: 'Botes', icon: '🚤' },
  { id: 'catamaran', name: 'Catamaranes', icon: '⛵' },
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
            Transporte Exclusivo 🚤
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Yates, catamaranes, botes, limusinas y más para moverte con estilo en el Caribe
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
                placeholder="🔍 Buscar servicio o embarcación..."
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