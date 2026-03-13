'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Clock, MapPin, Star, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Filtro combinado: Categoría + Ubicación en un solo selector
const tourFilters = [
  { id: 'todos', name: 'Todos los Tours', category: 'todos', location: 'todos', icon: '🎯' },
  
  // === ATARDECER - CARTAGENA ===
  { id: 'atardecer-cartagena', name: 'Atardecer en Cartagena', category: 'atardecer', location: 'Cartagena', icon: '🌅' },
  
  // === ISLAS DEL ROSARIO ===
  { id: 'islas-rosario', name: 'Islas del Rosario', category: 'islas', location: 'Islas del Rosario', icon: '🏝️' },
  
  // === TIERRA BOMBA ===
  { id: 'tierra-bomba', name: 'Tierra Bomba', category: 'tbomba', location: 'Islas Tierra Bomba', icon: '🌴' },
  
  // === BARÚ ===
  { id: 'baru', name: 'Barú', category: 'baru', location: 'Barú', icon: '🏖️' },
  
  // === GOLFO DE MORROSQUILLO ===
  { id: 'golfo', name: 'Golfo de Morrosquillo', category: 'cultural', location: 'Golfo de Morrosquillo', icon: '⛵' },
  
  // === CULTURAL ===
  { id: 'cultural-palenque', name: ' Cultural', category: 'cultural', location: 'San Basilio de Palenque', icon: '🥁' }
];

// ✅ Base de datos de tours - PARTE 1: ATARDECER CARTAGENA
const allTours = [
  // === ATARDECER - CARTAGENA ===
  {
    slug: 'atardecer-phanton',
    name: 'Atardecer Phantom',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Recorrido de dos horas ida y vuelta por la hermosa bahía de Cartagena a bordo del Barco Phantom. Salida atardecer todos los días.',
    duration: '2h',
    price: 80000,
    priceText: '$80.000 COP',
    rating: 4.8,
    reviews: 234,
    image: '/images/atardecer/atardecer-phanton.jpg',
    emoji: '🌅',
    includes: [
      'Barra libre en L: Ron, Aguardiente, Águila en Lata',
      'Barra libre en gaseosa y agua',
      'Música a bordo',
      'Baños amplios para damas y caballeros',
      'Impuesto a muelle incluido',
      'Niños hasta 12 años NO PAGAN'
    ],
    excludes: ['Pizzas de @napolicartagena ($15.000 - 28cm, 6 porciones)'],
    itinerary: [
      { time: '4:00 PM', activity: 'Abordaje en Muelle La Bodeguita' },
      { time: '4:45 PM', activity: 'Inicio del recorrido - 2 horas de navegación' },
      { time: '6:45 PM', activity: 'Desembarque' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/atardecer/atardecer-phanton/${i + 1}.jpg`),
    heroImage: '/images/atardecer/atardecer-phanton.jpg'
  },
  {
    slug: 'cena-fenix-beach',
    name: 'Cena Fenix Beach',
    category: 'atardecer',
    location: 'Isla Fénix',
    description: 'Recorrido Cartagena - Isla Fénix + cena en la isla + estadía en la playa cerca a nuestra hermosa fogata 🔥',
    duration: '4h',
    price: 310000,
    priceText: '$310.000 COP',
    rating: 4.9,
    reviews: 156,
    image: '/images/atardecer/cena-fenix-beach.jpg',
    emoji: '🔥',
    includes: [
      '1 plato a la carta de su elección',
      'Postre del día',
      'DJ en vivo todos los días',
      'Fogata en la playa',
      'Mesa reservada en restaurante-Bar'
    ],
    excludes: ['Impuestos al muelle', 'Decoración especial'],
    itinerary: [
      { time: '5:45 PM', activity: 'Salida Cartagena → Isla Fénix' },
      { time: '9:30 PM', activity: 'Regreso Isla Fénix → Cartagena' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/atardecer/cena-fenix-beach/${i + 1}.jpg`),
    heroImage: '/images/atardecer/cena-fenix-beach.jpg'
  },
  {
    slug: 'cena-sibarita-master',
    name: '🌅🚢 Cena Sibarita Master 🚢🌅',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour de dos horas por la bahía de Cartagena nocturno con servicio de cena gourmet.',
    duration: '2h',
    price: 310000,
    priceText: '$310.000 COP',
    rating: 5.0,
    reviews: 89,
    image: '/images/tours/sibarita/sibarita.webp',
    emoji: '🍽️',
    includes: [
      'Menú servido a cuatro tiempos (Dos Entradas, plato fuerte, postre)',
      'Media botella de vino por persona',
      'Baños para Damas y Caballeros',
      'Selección de cócteles y bebidas premium a bordo (con cargo adicional)'
    ],
    excludes: ['Tasa de embarque al muelle'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita Puerta #4' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/sibarita/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/sibarita/sibarita.webp'
  },
  {
    slug: 'atardecer-sibarita-master',
    name: '🌅🚢 Atardecer Sibarita Master 🚢🌅',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour por la bahía de Cartagena al atardecer con vistas espectaculares.',
    duration: '2h',
    price: 230000,
    priceText: '$230.000 COP',
    rating: 4.7,
    reviews: 178,
    image: '/images/atardecer/atardecer-sibarita-mastar.jpg',
    emoji: '🌅',
    includes: [
      'Recorrido panorámico por la bahía',
      'Música ambiental',
      'Baños a bordo'
    ],
    excludes: ['Tasa de embarque al muelle', 'Bebidas alcohólicas'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita Puerta #4' }
    ],
    images: Array.from({ length: 3 }, (_, i) => `/images/atardecer/atardecer-sibarita-mastar/${i + 1}.jpg`),
    heroImage: '/images/atardecer/atardecer-sibarita-mastar.jpg'
  },
  {
    slug: 'cena-sibarita-express',
    name: '🌅🚢 Cena Sibarita Express 🚢🌅',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour por la bahía de Cartagena con cena y una copa de vino.',
    duration: '2h',
    price: 200000,
    priceText: '$200.000 COP',
    rating: 4.6,
    reviews: 145,
    image: '/images/atardecer/cena-sibarita-expres.jpg',
    emoji: '🍷',
    includes: [
      'Cena ligera',
      'Una copa de vino',
      'Recorrido espectacular por la bahía de Cartagena'
    ],
    excludes: ['Tasa de embarque al muelle'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita Puerta #4' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/atardecer/cena-sibarita-expres/${i + 1}.jpg`),
    heroImage: '/images/atardecer/cena-sibarita-expres.jpg'
  },
  {
    slug: 'atardecer-sibarita-express',
    name: '🌅🚢 Atardecer Sibarita Express 🚢🌅',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour por la bahía de Cartagena al atardecer.',
    duration: '2h',
    price: 160000,
    priceText: '$160.000 COP',
    rating: 4.5,
    reviews: 201,
    image: '/images/atardecer/atardecer-sibarita-expres.jpg',
    emoji: '🌅',
    includes: [
      'Espectacular recorrido por la bahía de Cartagena',
      'Música ambiental'
    ],
    excludes: ['Tasa de embarque al muelle', 'Alimentos y bebidas'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita Puerta #4' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/atardecer/atardecer-sibarita-expres/${i + 1}.jpg`),
    heroImage: '/images/atardecer/atardecer-sibarita-expres.jpg'
  },
  {
    slug: 'tour-noche-blanca',
    name: 'Tour Noche Blanca',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour nocturno por la bahía de Cartagena con show, cena y barra libre.',
    duration: '3h',
    price: 295000,
    priceText: '$295.000 COP',
    rating: 4.8,
    reviews: 167,
    image: '/images/atardecer/tour-noche-blanca.jpg',
    emoji: '🎉',
    includes: [
      'Cóctel de Bienvenida',
      'Presentación folclórica',
      'Recorrido 3 horas',
      'Animador y DJ',
      'Show de baile, concursos y clases de baile',
      'Barra libre (Aguardiente, Ron y Vodka) - no cerveza',
      'Gaseosas y agua',
      'Cena tipo buffet (2 proteínas) con acompañamiento, postre y bebida'
    ],
    excludes: ['Tasa de embarque al muelle'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/atardecer/tour-noche-blanca/${i + 1}.jpg`),
    heroImage: '/images/atardecer/tour-noche-blanca.jpg'
  },
  {
    slug: 'tour-bahia',
    name: 'Tour Bahía',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour por la bahía de Cartagena con barra libre de cuba libre.',
    duration: '2h',
    price: 105000,
    priceText: '$105.000 COP',
    rating: 4.4,
    reviews: 289,
    image: '/images/atardecer/tour-bahia.jpg',
    emoji: '🍹',
    includes: [
      'Barra libre de cuba libre',
      'Música a bordo',
      'Recorrido panorámico'
    ],
    excludes: ['Tasa de embarque al muelle', 'Alimentos'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/atardecer/tour-bahia/${i + 1}.jpg`),
    heroImage: '/images/atardecer/tour-bahia.jpg'
  },
  {
    slug: 'atardecer-barco-carrucel',
    name: 'Atardecer Barco Carrusel',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Tour por la bahía de Cartagena en el tradicional Barco Carrusel.',
    duration: '2h',
    price: 110000,
    priceText: '$110.000 COP',
    rating: 4.6,
    reviews: 198,
    image: '/images/atardecer/atardecer-barco-carrucel.jpg',
    emoji: '🎠',
    includes: [
      'Servicio Tradicional',
      'Música ambiental',
      'Baños a bordo',
      'Niños de 6-12 años: $80.000'
    ],
    excludes: [
      'Servicio barra libre ($140.000)',
      'Tasa portuaria'
    ],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/atardecer/atardecer-barco-carrucel/${i + 1}.jpg`),
    heroImage: '/images/atardecer/atardecer-barco-carrucel.jpg'
  },

   // === ISLAS DEL ROSARIO ===
  {
    slug: 'flamante-catamaran',
    name: 'Flamante Catamarán',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía en Islas del Rosario a bordo del Flamante Catamarán. Experiencia premium con todas las comodidades.',
    duration: '7h',
    price: 420000,
    priceText: '$420.000 COP',
    rating: 4.9,
    reviews: 145,
    image: '/images/tours/flamante-catamaran/flamante-catamaran.jpg',
    emoji: '⛵',
    includes: [
      'Cóctel de bienvenida (con o sin licor)',
      'Seguro de asistencia',
      'Uso de áreas comunes',
      'Almuerzo incluido',
      'Traslado hasta el acuario'
    ],
    excludes: ['Entrada al acuario'],
    itinerary: [
      { time: '7:00 AM', activity: 'Abordaje e inicio del recorrido' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/flamante-catamaran/${i + 1}.jpg`),
    heroImage: '/images/tours/flamante-catamaran/flamante-catamaran.jpg'
  },
  {
    slug: 'isla-del-sol-day-tour',
    name: 'ISLA DEL SOL – Day Tour',
    category: 'pasa-dia',
    location: 'Islas del Rosario',
    description: 'Pasadía en Isla del Sol. Adulto: $420.000 | Open Bar: $420.000 | Open Bar VIP: $560.000 | Niños 4-10 años: $360.000 | Niños 2-3 años: $320.000',
    duration: '7h',
    price: 420000,
    priceText: 'Desde $420.000 COP',
    rating: 4.9,
    reviews: 312,
    image: '/images/hospedaje/hotel_isla_del_sol/day-tour.jpg',
    emoji: '🏝️',
    includes: [
      'Transporte Cartagena – Isla del Sol – Cartagena (lanchas rápidas 36-50 pasajeros)',
      'Frutas tropicales de Bienvenida',
      'Almuerzo típico (pescado frito, arroz con coco, yuca, patacón, ensalada)',
      'Postre típico',
      'Sillas asoleadoras',
      'Piscina con agua de mar',
      'Recorrido panorámico por el Parque Nacional Natural Corales del Rosario'
    ],
    excludes: [
      'Tasa Portuaria: $29.000 por persona (solo efectivo)',
      'Servicio de toallas',
      'Actividades adicionales: Buceo, Snorkel, Masajes, entrada al oceanario',
      'No se permite ingreso de alimentos ni bebidas al Hotel',
      'No se permiten mascotas',
      'Reserva: 50% de anticipo mínimo',
      'Cancelación sin penalidad: 24hrs de anticipación'
    ],
    itinerary: [
      { time: '7:45 AM', activity: 'Presentarse en Muelle La Bodeguita puerta #4' },
      { time: '8:15 AM', activity: 'Salida a Hotel Isla del Sol' },
      { time: '3:00 PM', activity: 'Regreso: Hotel Isla del Sol → Cartagena' },
      { time: '5:00 PM', activity: 'Llegada y Desembarque en Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/day-tour/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/day-tour.jpg'
  },
  {
    slug: 'isla-pelicano',
    name: 'Isla Pelícano',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Hermosa y paradisíaca isla ubicada a 45 minutos de Cartagena. Arquitectura mediterránea y lujo en un cayo privado único en las Islas del Rosario.',
    duration: '7h',
    price: 580000,
    priceText: '$580.000 COP',
    rating: 5.0,
    reviews: 67,
    image: '/images/tours/isla-sol/hero.jpg',
    emoji: '🦩',
    includes: [
      'Acceso a todas las instalaciones',
      'Almuerzo con bebida (2 opciones de menú)',
      'Ama de llaves y Chef',
      'Kayaking (2 unidades disponibles)',
      'Snorkeling en zona designada'
    ],
    excludes: [
      'Tasa Portuaria',
      'Servicio de transporte',
      'Equipo de snorkeling (traer propio)'
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/isla-sol/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-sol/hero.jpg'
  },
  {
    slug: 'paue-beach-lounge',
    name: 'Pa\'ué Beach Lounge',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Nueva experiencia en las Islas del Rosario: aguas cristalinas, arena blanca y el mejor paisaje del parque nacional.',
    duration: '7h',
    price: 480000,
    priceText: '$480.000 COP',
    rating: 4.8,
    reviews: 89,
    image: '/images/tours/isla-paue-beach-long/hero.jpg',
    emoji: '🏖️',
    includes: [
      'Transporte ida y regreso en bote deportivo de lujo',
      'Hidratación durante el trayecto (agua)',
      'Copa de champán de bienvenida (limonada para niños)',
      'Tour panorámico del archipiélago (opcional)',
      'Asoleadoras y cama de playa',
      'Almuerzo (4 opciones) + bebida no alcohólica',
      'Paddle board'
    ],
    excludes: [
      'Tasa Portuaria',
      'Actividades adicionales'
    ],
    itinerary: [
      { time: '7:45 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-paue-beach-long/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-paue-beach-long/hero.jpg'
  },
  {
    slug: 'isla-isabela-day-tour',
    name: 'Isla Bela Day Tour',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía en Islabela con todas las comodidades para disfrutar del paraíso caribeño.',
    duration: '7h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.7,
    reviews: 134,
    image: '/images/tours/isla-isabela/hero.jpg',
    emoji: '🏝️',
    includes: [
      'Transporte ida y regreso (50 min) desde Muelle de la Bodeguita Puerta #3',
      'Bebida de Bienvenida',
      'Almuerzo (Pescado, Pollo u opción Vegetariana)',
      'Uso de las instalaciones: Restaurante, Baños',
      'Traslado al Oceanario (opcional, entrada no incluida)',
      'Uso de Kayak (sujeto a disponibilidad)',
      'Clases de Yoga (sábados, domingos y festivos)'
    ],
    excludes: [
      'Toallas ($10.000 COP)',
      'Actividades adicionales',
      'PROHIBIDO el ingreso de bebidas y alimentos en el hotel'
    ],
    itinerary: [
      { time: '8:15 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-isabela/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-isabela/hero.jpg'
  },
  {
    slug: 'bora-bora-beach-club',
    name: 'Bora Bora Beach Club',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía exclusivo en Bora Bora Beach Club. Playa privada, piscina infinity y la mejor experiencia en las Islas del Rosario.',
    duration: '7h',
    price: 400000,
    priceText: '$400.000 COP',
    rating: 4.9,
    reviews: 178,
    image: '/images/tours/Bora-Bora/hero.jpg',
    emoji: '🏝️',
    includes: [
      'Transporte en lancha rápida',
      'Acceso a playa privada',
      'Piscina infinity',
      'Almuerzo buffet',
      'Bebidas no alcohólicas'
    ],
    excludes: [
      'Bebidas alcohólicas',
      'Actividades acuáticas extra'
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Salida de Cartagena' },
      { time: '5:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/Bora-Bora/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/Bora-Bora/hero.jpg'
  },
  {
    slug: 'pao-pao-beach-club',
    name: 'Pao Pao Beach Club',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía en Pao Pao Beach Club con almuerzo gourmet y aguas cristalinas.',
    duration: '7h',
    price: 370000,
    priceText: '$370.000 COP',
    rating: 4.8,
    reviews: 156,
    image: '/images/tours/pao-pao/hero.jpg',
    emoji: '🥥',
    includes: [
      'Traslado en lancha rápida (ida y vuelta) Muelle La Bodeguita - PAO PAO',
      'Cóctel de Bienvenida (Sin Alcohol)',
      'Asoleadora',
      'Almuerzo: Paella Pao Pao, Pasta a la Marinera, Plato Típico Cartagenero, Pechuga de pollo o Vegetariano'
    ],
    excludes: [
      'Impuesto del muelle $19.000 COP',
      'Alimentos y bebidas a la carta',
      'Toallas y Actividades Opcionales (Spa, etc)'
    ],
    itinerary: [],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/pao-pao/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/pao-pao/hero.jpg'
  },
  {
    slug: 'isla-matamba',
    name: 'Isla Matamba',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía o alojamiento exclusivo en Isla Matamba. Alquiler privado para grupos.',
    duration: '6h',
    price: 6000000,
    priceText: '$6.000.000 COP (20 personas)',
    rating: 5.0,
    reviews: 23,
    image: '/images/tours/isla-matamba/1.jpg',
    emoji: '🏡',
    includes: [
      'Alquiler exclusivo de la isla',
      'Privacidad total',
      'Playa privada'
    ],
    excludes: [
      'Alimentación (obligatorio, $180.000 COP por persona para pasadía)',
      'Descorche',
      'Transporte',
      'Alojamiento por día completo: $350.000 COP por persona',
      'Alquiler para pasar la noche: Temporada baja $8.000.000 / Alta $11.000.000 COP'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida de Cartagena → Matamba' },
      { time: '4:00 PM', activity: 'Regreso Matamba → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-matamba/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-matamba/1.jpg'
  },
  {
    slug: 'cocotera-beach',
    name: 'Cocotera Beach',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Playa Exclusiva (130mts) en el Paraíso del Parque Nacional Islas del Rosario. Aguas cristalinas y arena blanca.',
    duration: '6h',
    price: 240000,
    priceText: '$240.000 COP',
    rating: 4.7,
    reviews: 189,
    image: '/images/tours/cocotera-beach/hero.jpg',
    emoji: '🥥',
    includes: [
      'Recepción y Asistencia en Muelle Check In',
      'Transporte Náutico Ida y Regreso',
      'Seguro Asistencia Médica',
      'Bienvenida: Jugo Natural',
      'Almuerzo (3 opciones) + Jugo Natural + Cocaditas + Café',
      'Uso del Establecimiento (Asoleadora, Mesas, Sillas, Baños)',
      '130mts de Playa para disfrutar del Paraíso'
    ],
    excludes: [
      'Consumos extras en la Isla',
      'Impuestos de embarcación',
      'PROHIBIDO el ingreso de bebidas y alimentos al Establecimiento'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida de Cartagena → Cocotera' },
      { time: '4:00 PM', activity: 'Regreso Cocotera → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/cocotera-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/cocotera-beach/hero.jpg'
  },
  // === ISLAS DEL ROSARIO - Tours Adicionales ===
  {
    slug: 'isla-luxury',
    name: 'Experiencia Isla Luxury',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Espectacular playa de fina arena blanca, aguas cristalinas, arrecife de corales, gran muelle, naturaleza en todas sus zonas, excelente servicio e inigualable cocina caribeña.',
    duration: '6h',
    price: 460000,
    priceText: '$460.000 COP',
    rating: 4.8,
    reviews: 134,
    image: '/images/tours/isla-luxury/hero.jpg',
    emoji: '✨',
    includes: [
      'Transporte en Lancha (Embarque preferencial)',
      'Cama de Playa (Ubicación Aleatoria)',
      'Asoleadora (en caso de reservar sólo para 1 Pax)',
      'Bebidas nacionales especificadas en el plan',
      'Careta (Calidad de Préstamo)',
      'Kayak y Paddle Board (Calidad de Préstamo)',
      'Juegos de Playa: Voleibol, microfútbol, raquetas, frisbee',
      'Almuerzo Típico: 5 opciones de proteína (Arroz de Mar, Medallones de Sierra en Zumo de Coco, Medallones de Sierra frito, Pollo, Vegetariano)',
      'Ducha en la playa',
      'Traslado al Oceanario (Opcional)'
    ],
    excludes: [
      'Consumos extras en la Isla',
      'Impuestos de embarcación'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida de Cartagena → Isla Luxury' },
      { time: '4:00 PM', activity: 'Regreso Isla Luxury → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-luxury/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-luxury/hero.jpg'
  },
  {
    slug: 'hotel-isla-del-encanto',
    name: 'Pasadía Hotel Isla del Encanto',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Espectacular playa de fina arena blanca, aguas cristalinas, arrecife de corales, gran muelle y excelente servicio en el Hotel Isla del Encanto.',
    duration: '6h',
    price: 340000,
    priceText: '$340.000 COP',
    rating: 4.7,
    reviews: 156,
    image: '/images/tours/hotel-isla-del-encanto/hero.jpg',
    emoji: '🏨',
    includes: [
      'Transporte en lancha ida y vuelta',
      'Almuerzo servido estilo buffet',
      'Uso de las instalaciones',
      'Actividad gratis: Kayak (sujeto a disponibilidad)',
      'Recogida a partir de las 8 AM en Centro, Getsemaní, Laguito, Bocagrande, Castillo Grande y zona norte (solo en avenida principal)'
    ],
    excludes: [
      'Impuesto portuario',
      'Acuario: $40.000 por persona adulta',
      'Acuario: $30.000 por niño',
      'Snorkel: $60.000 por persona',
      'Buceo: $190.000 por persona',
      'NO incluye retorno en la tarde desde muelle hasta hotel'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Isla del Encanto' },
      { time: '3:00 PM', activity: 'Regreso Isla del Encanto → Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/hotel-isla-del-encanto/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/hotel-isla-del-encanto/hero.jpg'
  },
  {
    slug: 'isla-lizamar',
    name: 'Pasadía Isla Lizamar',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de Isla Lizamar con guía permanente, tour panorámico, piscina con cascada, tobogán, parque infantil y almuerzo típico estilo buffet.',
    duration: '6h',
    price: 350000,
    priceText: '$350.000 COP',
    rating: 4.6,
    reviews: 189,
    image: '/images/tours/isla-lizamar/hero.jpg',
    emoji: '🏝️',
    includes: [
      'Guía Permanente - Reseña Histórica',
      'Transporte lancha rápida ida y regreso',
      'Jugo de Bienvenida',
      'Tour Panorámico por el Archipiélago Islas del Rosario',
      'Uso de zonas: Baño de Mar, Piscina con cascada de agua dulce, Piscina para niños, Tobogán con salida al mar',
      'Sillas asoleadoras, Bohío especial de hamacas, Parque infantil',
      'Juegos recreativos: Mesas de Buchacara, Ping pong, Dinamo, Póker',
      'Almuerzo típico estilo buffet: arroz con coco, patacones, ensalada, pescado frito, refresco y frutas tropicales'
    ],
    excludes: [
      'Impuesto portuario'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Isla Lizamar' },
      { time: '3:00 PM', activity: 'Regreso Isla Lizamar → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-lizamar/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-lizamar/hero.jpg'
  },
  {
    slug: 'isla-cocoliso-basico',
    name: 'Isla Cocoliso – Pasadía Básico 🏖️',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía tradicional en Isla Cocoliso. Disfruta de este espectacular resort en Islas del Rosario con playa, restaurante y actividades.',
    duration: '6h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.5,
    reviews: 167,
    image: '/images/tours/isla-cocoliso/hero.jpg',
    emoji: '🏖️',
    includes: [
      'Transporte ida y vuelta desde el Muelle de La Bodeguita',
      'Bebida de Bienvenida',
      'Almuerzo para adultos a escoger: pollo, pescado, arroz de mariscos u opción vegetariana',
      'Uso de zonas sociales: Restaurante, Baños sociales',
      'Un six pack incluido'
    ],
    excludes: [
      'Tasa portuaria: $27.000 COP por persona (pago en efectivo, sujeto a cambio)',
      'Toallas ($5.000)',
      'Actividades adicionales: Snorkeling, Walking Tour, etc.',
      'Traslados y entradas al acuario',
      'Otros gastos no especificados'
    ],
    itinerary: [
      { time: '7:30 AM - 8:00 AM', activity: 'Presentarse en Muelle La Bodeguita, taquilla #9' },
      { time: '8:30 AM', activity: 'Salida de Cartagena → Isla Cocoliso' },
      { time: '3:00 PM', activity: 'Regreso Isla Cocoliso → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-cocoliso/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-cocoliso/hero.jpg'
  },
  {
    slug: 'isla-del-pirata',
    name: 'Pasadía Isla del Pirata',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Una pequeña porción de tierra rodeada de piscinas naturales cristalinas en el Parque Nacional Natural Corales del Rosario. Uno de los ecosistemas más valiosos del Caribe colombiano.',
    duration: '4h',
    price: 390000,
    priceText: '$390.000 COP',
    rating: 4.8,
    reviews: 145,
    image: '/images/tours/isla-del-pirata/hero.jpg',
    emoji: '🏴‍☠️',
    includes: [
      'Recepción y asistencia en el Muelle Turístico La Bodeguita a las 8:30 AM',
      'Traslado a la isla en lanchas rápidas de 30 o 50 pasajeros',
      'Uso de las instalaciones del hotel (excepto habitaciones)',
      'Frutas variadas y café de bienvenida',
      'Almuerzo estilo buffet típico isleño, agua mineral y/o gaseosa',
      'Hora de llegada aproximada a Cartagena: 4:30 PM'
    ],
    excludes: [
      'Tasa portuaria: Debe cancelarse en efectivo en el muelle de salida',
      'Consumo en restaurante y/o bar',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:30 AM', activity: 'Presentarse en Muelle La Bodeguita' },
      { time: '10:00 AM', activity: 'Salida de Cartagena → Isla del Pirata' },
      { time: '3:00 PM', activity: 'Regreso Isla del Pirata → Cartagena' },
      { time: '4:30 PM', activity: 'Llegada a Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-del-pirata/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-del-pirata/hero.jpg'
  },
  {
    slug: 'mantas-beach-club',
    name: 'Mantas Beach Club',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de Mantas Beach Club con áreas comunes, restaurante, bar, WiFi y menú variado con opciones para adultos y niños.',
    duration: '4h',
    price: 420000,
    priceText: '$420.000 COP',
    rating: 4.7,
    reviews: 123,
    image: '/images/tours/mantas-beach-club/hero.jpg',
    emoji: '🌊',
    includes: [
      'Transporte ida y regreso',
      'Cóctel de bienvenida (limonada para los niños)',
      'Asoleadora',
      'Uso de áreas comunes: baños, zona de playa, restaurante (segundo piso y beach), bar',
      'WiFi',
      'Toalla opcional',
      'Opciones de Menú: Mojarra frita, Sierra en posta, Arroz de Camarón, Sancocho de Pescado, Pechuga de pollo a la plancha, Pasta o arroz con vegetales salteados',
      'Incluye una bebida (gaseosa o agua)',
      'Menú infantil: Fish & Chips, Chicken tenders (incluye bebida)'
    ],
    excludes: [
      'Tasa portuaria: Debe cancelarse en efectivo en el muelle de salida',
      'Otras actividades no incluidas: Kayak, Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Mantas Beach Club' },
      { time: '4:00 PM', activity: 'Regreso Mantas Beach Club → Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/mantas-beach-club/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/mantas-beach-club/hero.jpg'
  },
  {
    slug: 'cholon-forever',
    name: 'Cholón Forever',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de una gran fiesta en botes y yates en la isla más rumbera del Caribe. Música crossover, bebidas y almuerzo incluido.',
    duration: '8h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.9,
    reviews: 234,
    image: '/images/tours/cholon-forever/hero.jpg',
    emoji: '🎉',
    includes: [
      'Punto de encuentro: Muelle de Los Pegazos',
      'Bote deportivo',
      'Full Música Crossover',
      'Impuesto de Muelle',
      'Recorrido por Islas del Rosario',
      'Tiempo de rumba en la piscinita',
      'Visita a Isla Cholón',
      '2 Bebidas de bienvenida (Opciones: Cerveza, agua o gaseosa)',
      'Almuerzo incluido'
    ],
    excludes: [
      'Otras actividades no incluidas: Kayak, Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Cholón' },
      { time: '4:00 PM', activity: 'Regreso Cholón → Cartagena' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/cholon-forever/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/cholon-forever/hero.jpg'
  },
  {
    slug: 'coralina-beach-isleno',
    name: 'Coralina Beach – Pasadía Isleño',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de Coralina Beach con transferencia desde hoteles, transporte en lancha rápida, almuerzo a la carta 3 tiempos y uso de instalaciones.',
    duration: '8h',
    price: 400000,
    priceText: '$400.000 COP (Temp. Baja)',
    rating: 4.8,
    reviews: 178,
    image: '/images/tours/coralina-beach/hero.jpg',
    emoji: '🏖️',
    includes: [
      'Transfer de recogida en hoteles: Bocagrande, Getsemaní, Ciudad Amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida o bebida sin alcohol para niños',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos: Entrada (sugerencia del chef), Plato fuerte a la carta de pasadía, Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades no incluidas: Kayak, Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Recogida en hoteles / Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  {
    slug: 'coralina-beach-deluxe',
    name: 'Coralina Beach – Pasadía Deluxe',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Experiencia Deluxe en Coralina Beach con barra libre, almuerzo a la carta 3 tiempos y todas las comodidades para un día inolvidable.',
    duration: '8h',
    price: 500000,
    priceText: '$500.000 COP (Temp. Baja)',
    rating: 4.9,
    reviews: 156,
    image: '/images/tours/coralina-beach/hero.jpg',
    emoji: '✨',
    includes: [
      'Transfer de recogida en hoteles: Bocagrande, Getsemaní, Ciudad Amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos: Entrada (sugerencia del chef), Plato fuerte a la carta de pasadía, Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      '🍹 BARRA LIBRE',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades no incluidas: Kayak, Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Recogida en hoteles / Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  {
    slug: 'coralina-beach-vip',
    name: 'Coralina Beach – Pasadía VIP',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Experiencia VIP exclusiva en Coralina Beach con deck privado, masaje relajante de 30 minutos y todos los beneficios premium.',
    duration: '8h',
    price: 550000,
    priceText: '$550.000 COP (Temp. Baja)',
    rating: 5.0,
    reviews: 89,
    image: '/images/tours/coralina-beach/hero.jpg',
    emoji: '👑',
    includes: [
      'Transfer de recogida en hoteles: Bocagrande, Getsemaní, Ciudad Amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida o bebida sin alcohol para niños',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos: Entrada (sugerencia del chef), Plato fuerte a la carta de pasadía, Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      '🔒 Deck privado exclusivo',
      '💆 Masaje relajante de 30 minutos',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades no incluidas: Kayak, Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Recogida en hoteles / Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  {
    slug: 'capri-beach-clasic',
    name: 'Capri Beach Club – Pasadía Clásic',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía Clásic en Capri Beach Club con almuerzo incluido, actividades acuáticas y barra libre de 11:00 AM a 1:00 PM.',
    duration: '8h',
    price: 480000,
    priceText: '$480.000 COP',
    rating: 4.7,
    reviews: 145,
    image: '/images/tours/isla-capri/hero.jpg',
    emoji: '🏖️',
    includes: [
      'Traslados ida y regreso (desde La Bodeguita)',
      'Almuerzo incluido: Pescado, arroz de mariscos, pollo o vegetariano',
      'Actividades: Paddle board, Snorkeling',
      'Barra libre de 11:00 AM a 1:00 PM'
    ],
    excludes: [
      'Impuestos de muelle',
      'Otras actividades no incluidas: Kayak, Snorkel adicional',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Capri Beach Club' },
      { time: '4:00 PM', activity: 'Regreso Capri Beach Club → Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-capri/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-capri/hero.jpg'
  },
  {
    slug: 'capri-beach-premium',
    name: 'Capri Beach Club – Pasadía Premium',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía Premium en Capri Beach Club con almuerzo incluido, actividades acuáticas y barra libre TODO EL DÍA.',
    duration: '8h',
    price: 590000,
    priceText: '$590.000 COP',
    rating: 4.9,
    reviews: 112,
    image: '/images/tours/isla-capri/hero.jpg',
    emoji: '✨',
    includes: [
      'Traslados ida y regreso (desde La Bodeguita)',
      'Almuerzo incluido: Pescado, arroz de mariscos, pollo o vegetariano',
      'Actividades: Paddle board, Snorkeling',
      '🍹 Barra libre TODO EL DÍA'
    ],
    excludes: [
      'Impuestos de muelle',
      'Otras actividades no incluidas: Kayak, Snorkel adicional',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Capri Beach Club' },
      { time: '4:00 PM', activity: 'Regreso Capri Beach Club → Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-capri/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-capri/hero.jpg'
  },
    // === TIERRA BOMBA ===
  {
    slug: 'tamarindo-beach-club',
    name: 'Tamarindo Beach Club',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Tamarindo Beach Club. Disfruta de un día relajante con piscina, duchas y acceso a camas de playa.',
    duration: '7h',
    price: 200000,
    priceText: '$200.000 COP',
    rating: 4.6,
    reviews: 178,
    image: '/images/tours/tamarindo-beach-club/hero.jpg',
    emoji: '🌴',
    includes: [
      'Traslados ida y regreso',
      'Almuerzo menú típico (mojarra frita), vegano o pechuga',
      'Acceso a las camas',
      'Duchas',
      'Piscina'
    ],
    excludes: ['Tasa de embarque al muelle'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Muelle La Bodeguita' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/tamarindo-beach-club/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/tamarindo-beach-club/hero.jpg'
  },
  {
    slug: 'ancestral-lounge-beach',
    name: 'Ancestral Lounge Beach Club',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Ancestral Lounge Beach Club. Música lounge, excelente comida caribeña y ambiente relajado.',
    duration: '7h',
    price: 240000,
    priceText: '$240.000 COP',
    rating: 4.7,
    reviews: 145,
    image: '/images/tours/ancestral-longe-beach/hero.jpg',
    emoji: '🍹',
    includes: [
      'Transporte Ida y Regreso desde el hospital de Bocagrande',
      'Cóctel de bienvenida',
      'Almuerzo Caribeño (pescado, pollo y/o vegetariano con arroz de coco, patacones y ensalada)',
      'Sillas asoleadoras con sombrilla o cama de playa',
      'Acceso y disfrute del lugar',
      'Música lounge y DJs los fines de semana',
      'Baños'
    ],
    excludes: ['Licores (precios accesibles en el lugar)'],
    itinerary: [
      { time: 'Miércoles a Domingo', activity: 'Hospital Bocagrande' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/tours/ancestral-longe-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/ancestral-longe-beach/hero.jpg'
  },
  {
    slug: 'namaste-beach',
    name: 'Pasadía Namaste Beach',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Namaste Beach. Ambiente tranquilo, actividades infantiles y excelente gastronomía.',
    duration: '7h',
    price: 260000,
    priceText: '$260.000 COP',
    rating: 4.5,
    reviews: 134,
    image: '/images/tours/namaste-beach/hero.jpg',
    emoji: '🧘',
    includes: [
      'Transporte',
      'Cóctel de bienvenida',
      'Mesa comedor y asoleadora playa',
      'Almuerzo (bandeja de pescado, arroz de mariscos, cazuela o menú vegetariano + bebida)',
      'Piscina',
      'Actividades infantiles (con costo adicional)'
    ],
    excludes: [
      'No se permite el ingreso de alimentos y bebidas',
      'Lugares frente al mar (sujetos a disponibilidad con costo adicional)'
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/tours/namaste-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/namaste-beach/hero.jpg'
  },
  {
    slug: 'palmarito-beach-hotel',
    name: 'Day Tour Palmarito Beach Hotel',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Palmarito Beach Hotel. Actividades deportivas, DJ en la playa y parque infantil.',
    duration: '7h',
    price: 280000,
    priceText: '$280.000 COP',
    rating: 4.6,
    reviews: 167,
    image: '/images/tours/palmarito-beach/hero.jpg',
    emoji: '🏐',
    includes: [
      'Transporte Ida Y Vuelta desde Las Playas de Castillo Grande',
      'Cóctel De Bienvenida',
      'Almuerzo Estilo Buffet',
      'Acceso A La Playa',
      'Piscina De Agua Dulce',
      'Silla Asoleadoras, Carpas, Zona De Hamacas',
      'Cancha De Futbol Y Voleibol',
      'DJ en la Playa',
      'Clases de Zumba',
      'Uso de Kayaks y tablas de Paddle (sujeto a disponibilidad)',
      'Parque Infantil'
    ],
    excludes: ['No se permite el ingreso de alimentos y bebidas'],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/palmarito-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/palmarito-beach/hero.jpg'
  },
  {
    slug: 'eteka-beach-club',
    name: 'Pasadía Eteka Beach Club',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Eteka Beach Club. Experiencia gastronómica de 3 tiempos con playa semi-privada.',
    duration: '7h',
    price: 320000,
    priceText: '$320.000 COP',
    rating: 4.8,
    reviews: 189,
    image: '/images/hospedaje/eteka/eteka-pasadia.jpg',
    emoji: '🍽️',
    includes: [
      'Transporte en lancha Ida y Regreso (sale desde playa de Bocagrande, detrás del Hospital)',
      'Bebida de Bienvenida',
      'Experiencia Gastronómica de 3 tiempos (entrada, plato fuerte y postre)',
      'Uso de la playa semi-privada e instalaciones del lounge',
      '1 toalla por persona por el día'
    ],
    excludes: [
      'Prohibido Fumar',
      'Solo niños mayores de 12 años'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/eteka/eteka-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-pasadia.jpg'
  },
  {
    slug: 'hotel-tropical-inn',
    name: 'Hotel Tropical Inn Day Tour',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Hotel Tropical Inn Day Tour. Kiosko, camas asoleadoras, piscina y toallas incluidas.',
    duration: '7h',
    price: 180000,
    priceText: '$180.000 COP',
    rating: 4.4,
    reviews: 156,
    image: '/images/tours/hotel-tropical-inn/hero.jpg',
    emoji: '🏨',
    includes: [
      'Lancha ida y regreso',
      'Almuerzo bandeja típica (pescado, patacones, ensalada, arroz de coco) o pechuga asada',
      'Cóctel de bienvenida',
      'Kiosko y derecho a las camas asoleadoras',
      'Entrada a la piscina',
      'Toallas'
    ],
    excludes: [],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/tours/hotel-tropical-inn/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/hotel-tropical-inn/hero.jpg'
  },
  {
    slug: 'amare-beach-club',
    name: 'Amaré Beach Club',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Amaré day pasadía. Crédito consumible y acceso a piscina.',
    duration: '7h',
    price: 280000,
    priceText: '$280.000 COP',
    rating: 4.5,
    reviews: 123,
    image: '/images/tours/amare-beach-club/hero.jpg',
    emoji: '🌊',
    includes: [
      'Transporte',
      'Crédito consumible $115.000 p/p',
      'Lounger en piscine o kiosko on the beach',
      'Acceso piscina'
    ],
    excludes: ['8% del impuesto al consumo NO INCLUIDO'],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/tours/amare-beach-club/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/amare-beach-club/hero.jpg'
  },
  {
    slug: 'fenix-beach',
    name: 'Pasadía Fénix Beach',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Fénix Beach. Múltiples opciones de almuerzo, piscina, cancha de volley y más.',
    duration: '7h',
    price: 320000,
    priceText: '$320.000 COP',
    rating: 4.7,
    reviews: 178,
    image: '/images/tours/fenix-beach/hero.jpg',
    emoji: '🔥',
    includes: [
      'Transporte en lancha ida y regreso desde Cartagena (15 minutos)',
      'Punto de salida: Muelle de la Bodeguita Centro Histórico',
      'Welcome drink (Opción de jugo con o sin alcohol)',
      'Almuerzo: Pescado típico isleño o pollo (Opción Vegana), Cazuela de Mariscos, sancocho de pescado, Paella vegetariana, paella de Mar (adicional 10K)',
      'Bebida no alcohólica',
      'Postre del día',
      'Uso de las instalaciones: Camas de playa o esteras, acceso al bar restaurante, piscina, cancha de volley'
    ],
    excludes: ['Impuesto de muelle'],
    itinerary: [
      { time: '9:30 AM', activity: 'Salida' },
      { time: '6:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/tours/fenix-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/fenix-beach/hero.jpg'
  },
  {
    slug: 'isla-real',
    name: 'Pasadía Isla Real',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Isla Real pasadía. Almuerzo típico costeño y uso de áreas comunes.',
    duration: '7h',
    price: 260000,
    priceText: '$260.000 COP',
    rating: 4.6,
    reviews: 145,
    image: '/images/tours/isla-real/hero.jpg',
    emoji: '👑',
    includes: [
      'Transporte náutico ida y regreso',
      'Almuerzo típico costeño (pescado, pollo o vegetariano) + bebida no alcohólica',
      'Otro plato de la carta: base de $40k (pagas el excedente)',
      'Uso de áreas comunes (asoleadoras, hamacas, piscina, baños)',
      'Niños de 4 a 10 años: $120.000',
      'Niños de 0 a 3 años: No cancelan'
    ],
    excludes: [
      'Impuesto de muelle',
      'No está permitido el ingreso de: bebidas alcohólicas, comidas, mascotas, armas ni sustancias alucinógenas'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida' },
      { time: '5:30 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/isla-real/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-real/hero.jpg'
  },
  {
    slug: 'makani-beach-club',
    name: 'Pasadía Makani',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Club de playa Luxury en Tierra Bomba. Experiencia premium con transporte marítimo incluido.',
    duration: '7h',
    price: 420000,
    priceText: '$420.000 COP',
    rating: 4.9,
    reviews: 201,
    image: '/images/tours/makani/hero.jpg',
    emoji: '✨',
    includes: [
      'Transporte marítimo (20 minutos)',
      'Asoleadora en zona general',
      'Niños (3-11 años): $280.000'
    ],
    excludes: [
      'Impuesto de muelle',
      'No incluye Alimentos & Bebidas'
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/makani/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/makani/hero.jpg'
  },
  {
    slug: 'marlin-beach-marinero',
    name: 'Marlin Beach Club (Marinero)',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Marinero. Zona baja con 4 opciones de almuerzo y acceso a piscina.',
    duration: '7h',
    price: 300000,
    priceText: '$300.000 COP',
    rating: 4.6,
    reviews: 167,
    image: '/images/tours/marlin-beach-club-marinero/hero.jpg',
    emoji: '⚓',
    includes: [
      'Transporte en lancha ida y regreso desde Cartagena (15 minutos)',
      'Punto de salida: Muelle De La Bodeguita Centro Histórico',
      'Welcome drink (Opción con o sin alcohol)',
      'Almuerzo (4 opciones): Pesca del día (frito), Pollo isleño, Mote de ñame y sierra, Bowl Marlin',
      'Acompañado de Bebida no alcohólica o una cerveza Nacional',
      'Postre del día',
      'Uso de las instalaciones: Camas de playa, acceso al bar, piscina y toalla',
      'Zona baja'
    ],
    excludes: [
      'Impuesto de muelle',
      'No se permite ingreso de alimentos y bebidas',
      'No se permite ingreso de música'
    ],
    itinerary: [
      { time: '9:30 AM', activity: 'Salida' },
      { time: '4:30 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/marlin-beach-club-marinero/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/marlin-beach-club-marinero/hero.jpg'
  },
  {
    slug: 'marlin-beach-marlin',
    name: 'Marlin Beach Club (Marlin)',
    category: 'tbomba',
    location: 'Islas Tierra Bomba',
    description: 'Pasadía Marlin. Zona piscina (arriba) con 7 opciones de almuerzo y 2 toallas.',
    duration: '7h',
    price: 320000,
    priceText: '$320.000 COP',
    rating: 4.7,
    reviews: 189,
    image: '/images/tours/marlin-beach-club-marlin/hero.jpg',
    emoji: '🐬',
    includes: [
      'Transporte en lancha ida y regreso desde Cartagena (15 minutos)',
      'Punto de salida: Muelle De La Bodeguita Centro Histórico',
      'Welcome drink (Opción con o sin alcohol)',
      'Almuerzo (7 opciones): Arroz de Mariscos, Parrillada de Marisco, Hamburguesa de pescado, Pesca del día (frito), Pollo isleño, Mote de ñame y sierra, Bowl Marlin',
      'Acompañado de Bebida no alcohólica o una cerveza Nacional',
      'Postre del día',
      'Uso de las instalaciones: Camas de playa, acceso al bar, piscina y 2 toallas',
      'Zona piscina (arriba)'
    ],
    excludes: [
      'Impuesto de muelle',
      'No se permite ingreso de alimentos y bebidas',
      'No se permite ingreso de música'
    ],
    itinerary: [
      { time: '9:30 AM', activity: 'Salida' },
      { time: '4:30 PM', activity: 'Retorno' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/marlin-beach-club-marlin/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/marlin-beach-club-marlin/hero.jpg'
  },

  // === BARÚ ===
  {
    slug: 'baru-playa-blanca-acuario',
    name: 'Barú Playa Blanca + Acuario',
    category: 'baru',
    location: 'Barú',
    description: 'Barú Playa Blanca + Acuario. Disfruta de la playa más famosa y visita el acuario.',
    duration: '8h',
    price: 200000,
    priceText: '$200.000 COP',
    rating: 4.5,
    reviews: 234,
    image: '/images/tours/baru-playa-blanca-acuario/hero.jpg',
    emoji: '🐠',
    includes: [
      'Llegada al muelle puerta 1',
      'Transporte climatizado ida y regreso ($180.000) o En lancha ida y regreso ($200.000)',
      'Guía',
      'Transporte en lancha por las islas del rosario',
      'Parada de 1 hora en el Acuario',
      'Almuerzo Típico (2 opciones: Pescado o pollo)'
    ],
    excludes: [
      'Impuestos de muelle',
      'Tickets ingreso al acuario',
      'Otras actividades: Kayak, Snorkel'
    ],
    itinerary: [
      { time: '7:30 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/baru-playa-blanca-acuario/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-playa-blanca-acuario/hero.jpg'
  },
  {
    slug: 'tour-cinco-islas-premium',
    name: 'Tour Cinco Islas Premium',
    category: 'baru',
    location: 'Barú',
    description: 'Visita 5 islas en un solo tour: Cholon, Agua Azul, Barú, Isla Grande y la avioneta de Pablo Escobar.',
    duration: '8h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.8,
    reviews: 267,
    image: '/images/tours/5-islas-premium/hero.jpg',
    emoji: '🏝️',
    includes: [
      'Impuesto de muelle',
      'Transporte en lancha deportiva',
      'Guía orientador',
      'Charla histórica del castillo de bocachica',
      'Reseña de las Islas del rosario',
      'Careteo en la avioneta de Pablo Escobar',
      'Parada en isla grande',
      'Snorkeling con equipo incluido',
      'Botella de agua',
      'Visita a las isla de Cholon',
      'Degustacion de cócteles de mariscos',
      'Visita la isla de agua azul',
      'Picada de fruta para compartir',
      'Almuerzo Típico',
      'Visita a la isla de Barú',
      'Plancton luminoso (opcional)'
    ],
    excludes: [
      'Sección de fotografía',
      'Entrada al oceanario ($40.000)',
      'Otras actividades: Kayak, Snorkel adicional'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/5-islas-premium/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/5-islas-premium/hero.jpg'
  },
  {
    slug: 'pasadias-playa-blanca',
    name: 'Pasadías Playa Blanca',
    category: 'baru',
    location: 'Barú',
    description: 'Barú Playa Blanca. Playa pública con almuerzo típico incluido.',
    duration: '8h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.4,
    reviews: 198,
    image: '/images/tours/playa-blanca/hero.jpg',
    emoji: '🏖️',
    includes: [
      'Recogida En El Hotel',
      'Bus Climatizado',
      'Almuerzo Tipico (Pescado, Pollo O Vegetariano)',
      'Guia Orientador'
    ],
    excludes: [
      'Sillas Asoleadoras',
      'Carpas',
      'Bebidas',
      'La acomodación es compartida en una playa pública acompañados de otros turistas del tour'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/playa-blanca/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/playa-blanca/hero.jpg'
  },
  {
    slug: 'pasadias-tranquila-baru',
    name: 'Pasadías Tranquila Baru',
    category: 'baru',
    location: 'Barú',
    description: 'Barú Playa Tranquila. Ambiente más relajado con cóctel de bienvenida.',
    duration: '7h',
    price: 160000,
    priceText: '$160.000 COP',
    rating: 4.3,
    reviews: 156,
    image: '/images/tours/playa-tranquila-baru/hero.jpg',
    emoji: '🌊',
    includes: [
      'Recogida En El Hotel',
      'Bus Climatizado',
      'Almuerzo Tipico (Pescado, Pollo)',
      'Guia Orientador',
      'Cóctel de bienvenida',
      'Retorno hotel'
    ],
    excludes: [
      'Planchón (puedes añadir por $40.000 adicional)',
      'Recogidas zonas centro, Bocagrande, castillo, Laguito, manga'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/playa-tranquila-baru/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/playa-tranquila-baru/hero.jpg'
  },
  {
    slug: 'pasadias-nena-beach-club',
    name: 'Pasadías Nena Beach Club',
    category: 'baru',
    location: 'Barú',
    description: 'Pasadía Nena Beach Club. Cama de playa, almuerzo, duchas y más.',
    duration: '7h',
    price: 320000,
    priceText: '$320.000 COP',
    rating: 4.7,
    reviews: 189,
    image: '/images/hospedaje/nena-beach-club/nena-beach-club-pasadia.jpg',
    emoji: '☀️',
    includes: [
      'Transporte terrestre ida y regreso (horarios: 7am-3pm o 9:30am-5:30pm)',
      'Cóctel de bienvenida',
      'Cama de playa',
      'Almuerzo',
      'Café',
      'Duchas de agua dulce',
      'Vestieres',
      'Locker',
      'Piscina',
      'Wi-fi'
    ],
    excludes: [
      'Bar',
      'Actividades acuáticas: buceo, snorkeling, plancton luminoso, jet Sky',
      'Toures hacia las islas del rosario',
      'Niños de 0 a 4 años no pagan pasadía (pero sí consumos extras de alimentación)'
    ],
    itinerary: [
      { time: '7:00 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' },
      { time: '9:30 AM', activity: 'Salida alternativa' },
      { time: '5:30 PM', activity: 'Regreso alternativo' }
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/nena-beach-club/nena-beach-club-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/nena-beach-club-pasadia.jpg'
  },
  {
    slug: 'cabana-baru',
    name: 'Cabaña Baru',
    category: 'baru',
    location: 'Barú',
    description: 'Cabaña en Barú. Alojamiento cercano a Playa Blanca.',
    duration: '-',
    price: 0,
    priceText: 'Por Definir',
    rating: 4.5,
    reviews: 78,
    image: '/images/tours/baru-cabana/hero.jpg',
    emoji: '🏡',
    includes: [],
    excludes: [],
    itinerary: [],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/baru-cabana/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana/hero.jpg'
  },
  {
    slug: 'cabana-luxury-baru',
    name: 'Cabaña Luxury Baru (15 personas)',
    category: 'baru',
    location: 'Barú',
    description: 'Cabaña Luxury Baru con capacidad para 15 personas. Ideal para grupos.',
    duration: '-',
    price: 0,
    priceText: 'Por Definir',
    rating: 4.8,
    reviews: 45,
    image: '/images/tours/baru-cabana-luxury/hero.jpg',
    emoji: '🏠',
    includes: [],
    excludes: [],
    itinerary: [],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/baru-cabana-luxury/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana-luxury/hero.jpg'
  },
  {
    slug: 'cabana-hospedaje-baru',
    name: 'Cabaña Hospedaje Baru',
    category: 'baru',
    location: 'Barú',
    description: 'Cabaña Hospedaje Baru con alimentación completa incluida.',
    duration: '-',
    price: 350000,
    priceText: '$350.000 COP',
    rating: 4.6,
    reviews: 67,
    image: '/images/tours/baru-cabana-hospedaje/hero.jpg',
    emoji: '🛏️',
    includes: [
      'Bus climatizado Transporte ida y regreso',
      'Hospedaje',
      'Almuerzo',
      'Cena',
      'Desayuno al día siguiente',
      'Almuerzo'
    ],
    excludes: [],
    itinerary: [],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/baru-cabana-hospedaje/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana-hospedaje/hero.jpg'
  },

  // === CULTURAL ===
  {
    slug: 'tour-aviario-playa-blanca',
    name: 'Tour Aviario + Playa Blanca',
    category: 'cultural',
    location: 'Barú',
    description: 'Tour Aviario Nacional + Playa Blanca. Visita el aviario y disfruta de la playa.',
    duration: '8h',
    price: 200000,
    priceText: '$200.000 COP',
    rating: 4.7,
    reviews: 234,
    image: '/images/tours/aviario-playa-blanca/hero.jpg',
    emoji: '🦜',
    includes: [
      'Recogida en hoteles de la zona turística',
      'Transporte terrestre climatizado ida y regreso',
      'Visita al Aviario nacional (Incluye entradas)',
      'Recorrido de 2 horas (aprox) por todo el aviario nacional y show de aves',
      'Visita a playa blanca',
      'Almuerzo tipico (3 Opciones)',
      'Tiempo de baño en el mar',
      'Zona de playa de aguas cristalinas y arenas blancas'
    ],
    excludes: ['No incluye asoleadoras ni parasoles en playa blanca'],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '3:00 PM', activity: 'Regreso' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/aviario-playa-blanca/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/aviario-playa-blanca/hero.jpg'
  },
  {
    slug: 'tour-volcan-totumo',
    name: 'Tour Volcán del Totumo',
    category: 'cultural',
    location: 'Santa Catalina – Bolívar',
    description: 'Volcán Del Totumo Medicinal + Playa + Piscinas. Experiencia única de lodo terapéutico.',
    duration: '8h',
    price: 350000,
    priceText: '$350.000 COP',
    rating: 4.8,
    reviews: 312,
    image: '/images/tours/totumo/hero.jpg',
    emoji: '🌋',
    includes: [
      'Bus climatizado Transporte ida y regreso',
      'Ingreso al volcán',
      'Guía personalizado bilingüe durante todo el recorrido',
      'Almuerzo Típico Cartagenero (Pescado Frito Mojarra Roja, Consome De Pescado, Arroz Con Coco, Limonada) Opción: (Pechuga De Pollo) O (Chuleta De Cerdo)',
      'Baño De Mar (Complejo De Playa Privado)'
    ],
    excludes: [
      'Bebidas (con o sin alcohol) - no se permite el ingreso',
      'Actividades no especificadas en el tour'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '3:00 PM', activity: 'Regreso' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/totumo/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/totumo/hero.jpg'
  },
  {
    slug: 'day-tour-isla-palma',
    name: 'Day Tour Isla Palma',
    category: 'cultural',
    location: 'Golfo de Morrosquillo',
    description: 'Disfruta de un espacio privado con buena música rodeado de las mejores playas cristalinas del Archipiélago.',
    duration: '7h',
    price: 240000,
    priceText: '$240.000 COP',
    rating: 4.6,
    reviews: 145,
    image: '/images/tours/isla-palma/hero.jpg',
    emoji: '🌴',
    includes: [
      'Seguro de Viaje y guía a bordo',
      'Recogida en el hotel en Cartagena hasta el Muelle de la Bodeguita',
      'Snack AM antes del embarque',
      'Recorrido por Islas del Rosario y Archipiélago de San Bernardo',
      'Refrescante cocktail de Bienvenida',
      'Delicioso almuerzo: Sopa, proteína (opción de carne, pollo o pescado), arroz, patacon, ensalada, jugo y postre',
      'Playa de arena blanca y agua turquesa ideal para snorkeling',
      'Uso de hamacas, camas balinesas, sillas, sillas asoleadoras, columpio en PLAYA ACTIVA',
      'Todos los días 11:00 AM ACTIVIDAD PLAYA dirigida'
    ],
    excludes: [],
    itinerary: [
      { time: '2:30 PM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Regreso' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-palma/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-palma/hero.jpg'
  },
  {
    slug: 'tour-palenque',
    name: 'Tour Palenque',
    category: 'cultural',
    location: 'San Basilio de Palenque',
    description: 'Recorrido cultural & gastronómico PALENQUE, primer pueblo libre de América.',
    duration: '7h',
    price: 240000,
    priceText: '$240.000 COP',
    rating: 4.9,
    reviews: 178,
    image: '/images/tours/palenque/hero.jpg',
    emoji: '🥁',
    includes: [
      'Médico tradicional',
      'Clase de boxeo',
      'Grupo musical',
      'Casa museo',
      'Almuerzo',
      'Hidratación',
      'Bebida típica'
    ],
    excludes: [],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida' },
      { time: '3:30 PM', activity: 'Regreso' }
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/palenque/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/palenque/hero.jpg'
  },
  {
    slug: 'pasadia-isla-mucura',
    name: 'Pasadía Isla Múcura - Tintipán - Santa Cruz del Islote',
    category: 'cultural',
    location: 'Golfo de Morrosquillo',
    description: 'Archipiélago de San Bernardo. Múcura, Tintipán y el islote más densamente poblado del mundo.',
    duration: '7h',
    price: 400000,
    priceText: '$400.000 COP',
    rating: 4.8,
    reviews: 156,
    image:  '/images/tours/mukura/hero.jpg',
    emoji: '⛵',
    includes: [
      'Seguro de Viaje',
      '2 Guías a bordo',
      'Recogida en el hotel (Solo zonas de Bocagrande, castillo grande, laguito y Marbella) hasta el Muelle de la Bodeguita',
      'Horarios de recogida: 5:30 AM',
      'Snack AM antes del embarque (ensalada de fruta)',
      'PARADA 1: Isla Tintipán (1 hora aproximadamente)',
      'PARADA 2: Panorámico en Casa en el Agua',
      'PARADA 3: Islote Santa Cruz (Oceanario artesanal - no incluye ingreso)',
      'PARADA 4: Isla Múcura (coctel de bienvenida y almuerzo típico)',
      'Almuerzo Típico (Arroz con coco, Pescado o pollo, Ensalada y bebida acompañante)'
    ],
    excludes: [
      'No incluye tasa portuaria',
      'Actividad PLAYA dirigida 11:00 AM',
      'Recomendaciones: traer ropa cómoda, protector solar y zapatillas de playa'
    ],
    itinerary: [
      { time: '2:30 PM', activity: 'Salida' },
      { time: '5:00 PM', activity: 'Regreso' }
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/tours/mukura/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/mukura/hero.jpg'
  },

  // === CONTINÚA EN PARTE 5 ===
];

// ✅ Componente interno que usa useSearchParams
function ToursContent() {
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(() => searchParams.get('filtro') || 'todos');
  const [priceRange, setPriceRange] = useState('todos');
  const [sortBy, setSortBy] = useState('popularity');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  // ✅ Filtrar por categoría Y ubicación combinadas
  const filteredTours = useMemo(() => {
    return allTours.filter(tour => {
      // Filtro combinado categoría + ubicación
      const filter = tourFilters.find(f => f.id === selectedFilter);
      const matchesFilter = selectedFilter === 'todos' || 
        (tour.category === filter?.category && tour.location === filter?.location);
      
      // Rango de precio
      let matchesPrice = true;
      if (priceRange === 'economico') matchesPrice = tour.price < 200000;
      else if (priceRange === 'medio') matchesPrice = tour.price >= 200000 && tour.price < 400000;
      else if (priceRange === 'premium') matchesPrice = tour.price >= 400000;
      
      return matchesFilter && matchesPrice;
    });
  }, [selectedFilter, priceRange]);

  // ✅ Ordenar tours
  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [filteredTours, sortBy]);

  // ✅ Abrir lightbox
  const openLightbox = (tour: any, index: number) => {
    setSelectedTour(tour);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // ✅ Limpiar filtros
  const clearFilters = () => {
    setSelectedFilter('todos');
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

      {/* Filtros */}
      <section className="bg-white shadow-md sticky top-20 z-40 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="🔍 Buscar tour..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
              />
            </div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Filtro Combinado Categoría + Ubicación */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                {tourFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>{filter.icon} {filter.name}</option>
                ))}
              </select>
              {/* Precio */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="todos">💰 Todos los precios</option>
                <option value="economico">$ Económico (&lt; $200k)</option>
                <option value="medio">$$ Medio ($200k - $400k)</option>
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
          {/* Contador */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-yamid-palm">{sortedTours.length}</span> tours encontrados
            </p>
            {(selectedFilter !== 'todos' || priceRange !== 'todos') && (
              <button onClick={clearFilters} className="text-yamid-gold hover:underline text-sm font-medium">
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
            <p className="text-gray-600">No encontramos tours con esos filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <Link 
                key={tour.slug} 
                href={`/tours/${tour.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-yamid-sand">
                  <Image 
                    src={tour.heroImage} 
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                          <span class="text-7xl opacity-50">${tour.emoji}</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yamid-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {tour.emoji} {tour.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{tour.rating}</span>
                  </div>
                </div>
                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-yamid-palm mb-2 group-hover:text-yamid-gold transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tour.duration}</span>
                  </div>
                  {/* Precio y CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Desde</span>
                      <p className="text-lg font-bold text-yamid-gold">{tour.priceText}</p>
                    </div>
                    <span className="text-yamid-gold font-semibold group-hover:translate-x-2 transition-transform">Ver →</span>
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
          <h2 className="text-3xl font-bold text-yamid-palm mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-700 mb-8">Tenemos experiencias personalizadas para ti y tu grupo</p>
          <Link href="/contacto" className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Contáctanos para opciones personalizadas
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {selectedTour && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={selectedTour.images.map((img: string) => ({ src: img, alt: selectedTour.name }))}
          index={currentImageIndex}
          plugins={[Thumbnails, Zoom]}
          thumbnails={{}}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      )}
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
