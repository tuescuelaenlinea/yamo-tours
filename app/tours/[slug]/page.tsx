'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  MapPin, Star, Users, Clock, CheckCircle, XCircle, 
  MessageCircle, ArrowLeft, Calendar
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Base de datos COMPLETA de tours
const toursData: Record<string, any> = {
  // === ATARDECER - CARTAGENA ===
  'atardecer-phanton': {
    slug: 'atardecer-phanton',
    name: 'Atardecer Phanton',
    category: 'atardecer',
    location: 'Cartagena',
    description: 'Recorrido de dos horas ida y vuelta por la hermosa bahía de la ciudad de Cartagena de Indias a bordo del Barco Phantom. Tendremos salida atardecer todos los días.',
    duration: '2h',
    price: 80000,
    priceText: '$80.000 COP',
    rating: 4.8,
    reviews: 234,
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
  'cena-fenix-beach': {
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
  'cena-sibarita-master': {
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
  'atardecer-sibarita-master': {
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
  'cena-sibarita-express': {
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
    images: Array.from({ length: 3 }, (_, i) => `/images/atardecer/cena-sibarita-expres/${i + 1}.jpg`),
    heroImage: '/images/atardecer/cena-sibarita-expres.jpg'
  },
  'atardecer-sibarita-express': {
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
  'tour-noche-blanca': {
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
  'tour-bahia': {
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
  'atardecer-barco-carrucel': {
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
  'flamante-catamaran': {
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
  'isla-del-sol-day-tour': {
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
      'No se permite ingreso de alimentos/bebidas al Hotel',
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
  'isla-pelicano': {
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
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-pelicano/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-pelicano/hero.jpg'
  },
  'paue-beach-lounge': {
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
  'isla-isabela-day-tour': {
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
  'bora-bora-beach-club': {
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
  'pao-pao-beach-club': {
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
  'isla-matamba': {
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
  'cocotera-beach': {
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
  // === ISLAS DEL ROSARIO - TOURS ADICIONALES ===
  'isla-luxury': {
    slug: 'isla-luxury',
    name: 'Experiencia Isla Luxury',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Espectacular Playa de fina arena blanca, aguas cristalinas, arrecife de corales y gran muelle. Excelente servicio e inigualable cocina caribeña.',
    duration: '6h',
    price: 460000,
    priceText: '$460.000 COP',
    rating: 4.8,
    reviews: 134,
    emoji: '💎',
    includes: [
      'Transporte en Lancha (Embarque preferencial)',
      'Cama de Playa (Ubicación Aleatoria)',
      'Asoleadora (en el caso de reservar sólo para un Pax)',
      'Bebidas nacionales especificadas en el plan',
      'Careta (Calidad de Préstamo)',
      'Kayak y Paddle Board (Calidad de Préstamo)',
      'Juegos de Playa: Voleibol, microfútbol, raquetas, frisbee',
      'Almuerzo Típico: 5 opciones de proteína a elección',
      'Arroz de Mar, Medallones de Sierra en Zumo de Coco',
      'Medallones de Sierra frito, Pollo, Vegetariano',
      'Ducha en la playa',
      'Traslado al Oceanario (Opcional)'
    ],
    excludes: [
      'Consumos extras en la Isla',
      'Impuestos de embarcación'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Salida de Cartagena → Luxury' },
      { time: '4:00 PM', activity: 'Regreso Luxury → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-luxury/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-luxury/hero.jpg'
  },
  'hotel-isla-del-encanto': {
    slug: 'hotel-isla-del-encanto',
    name: 'Pasadía Hotel Isla del Encanto',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Espectacular Playa de fina arena blanca, aguas cristalinas, arrecife de corales y gran muelle. Naturaleza en todas sus zonas.',
    duration: '6h',
    price: 340000,
    priceText: '$340.000 COP',
    rating: 4.6,
    reviews: 167,
    emoji: '🏝️',
    includes: [
      'Transporte en lancha ida y vuelta',
      'Almuerzo servido estilo buffet',
      'Uso de las instalaciones',
      'Actividad gratis: Kayak (sujeto a disponibilidad)',
      'Recogida a partir de las 8 am en Centro, Getsemaní, Laguito, Bocagrande, Castillogrande y zona norte (solo en avenida principal)'
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
      { time: '8:00 AM', activity: 'Salida de Cartagena → Encanto' },
      { time: '3:00 PM', activity: 'Regreso Encanto → Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/hotel-isla-del-encanto/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/hotel-isla-del-encanto/hero.jpg'
  },
  'isla-lizamar': {
    slug: 'isla-lizamar',
    name: 'Pasadía Isla Lizamar',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de baño de mar, piscina con cascada de agua dulce, tobogán con salida al mar, sillas asoleadoras, bohío especial de hamacas y parque infantil.',
    duration: '6h',
    price: 350000,
    priceText: '$350.000 COP',
    rating: 4.7,
    reviews: 189,
    emoji: '🏊',
    includes: [
      'Guía Permanente - Reseña Histórica',
      'Transporte lancha rápida ida y Regreso',
      'Jugo de Bienvenida',
      'Tour Panorámico por el Archipiélago Islas del Rosario',
      'Uso de zonas como: Baño de Mar',
      'La piscina con cascada de agua dulce',
      'Piscina para niños',
      'Tobogán con salida al mar',
      'Sillas asoleadoras',
      'Bohío especial de hamacas',
      'Parque infantil',
      'Juegos recreativos con mesas de Buchacara, Ping pong, Dinamo, Póker y otros',
      'Almuerzo típico estilo buffet: arroz con coco, patacones, ensalada, pescado frito, refresco y frutas tropicales'
    ],
    excludes: [
      'Impuesto portuario'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena → Lizamar' },
      { time: '3:00 PM', activity: 'Regreso Lizamar → Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-lizamar/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-lizamar/hero.jpg'
  },
  'isla-cocoliso-basico': {
    slug: 'isla-cocoliso-basico',
    name: 'Isla Cocoliso Pasadía Básico 🏖',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Pasadía tradicional en Isla Cocoliso. Disfruta de este espectacular resort en Islas del Rosario con bebida de bienvenida y six pack incluido.',
    duration: '6h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.5,
    reviews: 145,
    emoji: '🏖️',
    includes: [
      'Transporte ida y vuelta desde el muelle de la Bodeguita',
      'Bebida De Bienvenida',
      'Almuerzo para adultos a escoger: pollo, pescado, arroz de mariscos y opción vegetariana',
      'Uso de zonas sociales',
      'Restaurante',
      'Baños sociales',
      'Un six pack'
    ],
    excludes: [
      'Tasa portuaria: $27.000 COP por persona (pago en efectivo. Sujeto a cambio)',
      'Toallas ($5.000)',
      'Actividades adicionales (snorkeling walking tour, etc)',
      'Traslados y entradas al acuario',
      'Otros gastos no especificados'
    ],
    itinerary: [
      { time: '7:30 AM - 8:00 AM', activity: 'Presentarse en el muelle (Taquilla #9)' },
      { time: '8:30 AM', activity: 'Salida de Cartagena → Cocoliso' },
      { time: '3:00 PM', activity: 'Regreso Cocoliso → Cartagena' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/isla-cocoliso/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-cocoliso/hero.jpg'
  },
  'isla-del-pirata': {
    slug: 'isla-del-pirata',
    name: 'Pasadía Hotel Isla del Pirata',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Una pequeña porción de tierra rodeada de piscinas naturales cristalinas. Uno de los ecosistemas más valiosos del Caribe colombiano.',
    duration: '4h',
    price: 390000,
    priceText: '$390.000 COP',
    rating: 4.8,
    reviews: 178,
    emoji: '🏴‍☠️',
    includes: [
      'Recepción y asistencia en el Muelle Turístico La Bodeguita a las 8:30 AM',
      'Traslado a la isla en lanchas rápidas de 30 o 50 pasajeros',
      'Uso de las instalaciones del hotel, excepto las habitaciones',
      'Frutas variadas y café de bienvenida',
      'Almuerzo estilo buffet típico isleño',
      'Agua mineral y/o gaseosa'
    ],
    excludes: [
      'Tasa portuaria: Debe cancelarse en efectivo en el muelle de salida',
      'Consumo en restaurante y/o bar',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:30 AM', activity: 'Presentarse en Muelle La Bodeguita' },
      { time: '10:00 AM', activity: 'Salida de Cartagena' },
      { time: '3:00 PM', activity: 'Regreso a Cartagena' },
      { time: '4:30 PM', activity: 'Llegada aproximada a Cartagena' }
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/isla-del-pirata/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-del-pirata/hero.jpg'
  },
  // === ISLAS DEL ROSARIO - NUEVOS TOURS IBIZA ISLAND ===
  'ibiza-island-vip': {
    slug: 'ibiza-island-vip',
    name: 'PASADIA IBBIZA ISLAND BEACH CLUB - VIP 🏝️❤️🏹',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Experiencia VIP exclusiva en Ibiza Island con cama de playa en primera línea, menú gourmet de 7 opciones incluyendo Filet Mignon y Pulpo, champagne de bienvenida y todas las comodidades premium.',
    duration: '7h',
    price: 0, // ⚠️ IMPORTANTE: Definir precio real aquí
    priceText: 'Consultar Precio VIP',
    rating: 5.0,
    reviews: 0,
    emoji: '👑',
    includes: [
      'Transporte en lancha deportiva Ida y vuelta',
      '1 Copa de champagne',
      'Una Cerveza Nacional por persona',
      'Almuerzo a elegir entre 7 opciones gourmet (Pargo rojo, Cazuela de mariscos, Pulpo a la grillete, Arroz marinero, Cordon bleu, Filet mignon, Baby beef a la pimienta)',
      'Bebida: Agua o Gaseosa',
      'Uso de Zonas Sociales',
      'Piscina de agua salada',
      'DJ en vivo y Animador',
      'Cama de playa para 3 pax en primera línea o Salas en segunda línea frente al mar',
      'Playa privada',
      'Ducha de agua dulce',
      'Toallas incluidas',
      'Pet Friendly (Mascotas pequeñas con bozal y vacuna)',
      'Traslado al oceanario',
      'Snorkeling y Kayak'
    ],  excludes: [
      'Gastos Administrativos ($26.500 P/P)',
      'Seguro de asistencia médica ($8.500 p/p)',
      'Ingreso de Alimentos y Bebidas externos',
      'No apto para mujeres embarazadas'
    ],
    itinerary: [
      { time: '07:20 AM', activity: 'Registro en Marina Todomar' },
      { time: '08:30 AM - 08:40 AM', activity: 'Salida hacia la isla' },
      { time: '03:15 PM - 03:30 PM', activity: 'Retorno a Cartagena (sujeto al clima)' }
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/ibbiza/${i + 1}.jpg`),
    heroImage: '/images/tours/ibbiza/6.jpg'
  },
  'ibiza-island-tradicional': {
    slug: 'ibiza-island-tradicional',
    name: 'PASADIA IBBIZA ISLAND BEACH CLUB - TRADICIONAL 🏝️❤️🏹',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de un día paradisíaco en Ibiza Island con almuerzo típico o internacional, cóctel de bienvenida, música en vivo, sillas asoleadoras y acceso a todas las instalaciones del beach club.',
    duration: '7h',
    price: 0, // ⚠️ IMPORTANTE: Definir precio real aquí
    priceText: 'Consultar Precio Tradicional',
    rating: 4.8,
    reviews: 0,
    emoji: '🏖️',
    includes: [
      'Transporte en lancha deportiva Ida y vuelta',
      'Cóctel de Bienvenida (con o sin alcohol)',
      'Una Cerveza Nacional por persona',
      'Almuerzo a elegir entre 7 opciones (Plato típico Pescado frito, Sancocho IBBIZA, Pechuga a la Plancha, Opción Vegetariana, Pastas con vegetales y Mariscos, Pastas Carbonara, Menú infantil)',
      'Bebida: Agua o Gaseosa',
      'Uso de Zonas Sociales',
      'Piscina de agua salada',
      'DJ en vivo y Animador',
      'Sillas Asoleadoras',
      'Playa privada',
      'Ducha de agua dulce',
      'Pet Friendly (Mascotas pequeñas con bozal y vacuna)',
      'Traslado al oceanario',
      'Snorkeling y Kayak'
    ],
    excludes: [
      'Toallas',
      'Gastos Administrativos ($26.500 P/P)',
      'Seguro de asistencia médica ($8.500 p/p)',
      'Ingreso de Alimentos y Bebidas externos',
      'No apto para mujeres embarazadas'
    ],
    itinerary: [
      { time: '07:20 AM', activity: 'Registro en Marina Todomar' },
      { time: '08:30 AM - 08:40 AM', activity: 'Salida hacia la isla' },
      { time: '03:15 PM - 03:30 PM', activity: 'Retorno a Cartagena (sujeto al clima)' }
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/ibbiza/${i + 1}.jpg`),
    heroImage: '/images/tours/ibbiza/6.jpg'
  },
  'mantas-beach-club': {
    slug: 'mantas-beach-club',
    name: 'Mantas Beach Club',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de áreas comunes, playa, restaurante, bar, WiFi y menú variado con opciones para adultos y niños. Incluye una bebida.',
    duration: '4h',
    price: 420000,
    priceText: '$420.000 COP',
    rating: 4.7,
    reviews: 156,
    emoji: '🐠',
    includes: [
      'Transporte ida y regreso',
      'Cóctel de bienvenida (limonada para los niños)',
      'Asoleadora',
      'Uso de las áreas comunes: baños, zona de playa, restaurante segundo piso y beach, bar',
      'WiFi',
      'Toalla opcional',
      'Opciones de Menú: Mojarra frita, Sierra en posta, Arroz de Camarón, Sancocho de Pescado, Pechuga de pollo a la plancha, Pasta o arroz con vegetales salteados',
      'Incluye una bebida (gaseosa o agua)',
      'Opciones de menú infantil: Fish & Chips, Chicken tenders'
    ],
    excludes: [
      'Tasa portuaria: Debe cancelarse en efectivo en el muelle de salida',
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/tours/mantas-beach-club/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/mantas-beach-club/hero.jpg'
  },
  'cholon-forever': {
    slug: 'cholon-forever',
    name: 'Cholón Forever',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Disfruta de una gran fiesta en botes y yates en la isla más rumbera del Caribe. Música crossover, bebidas de bienvenida y almuerzo.',
    duration: '8h',
    price: 380000,
    priceText: '$380.000 COP',
    rating: 4.9,
    reviews: 234,
    emoji: '🎉',
    includes: [
      'Punto de encuentro: Muelle de los Pegazos',
      'Bote deportivo',
      'Full Música Crossover',
      'Impuesto de Muelle',
      'Islas del Rosario (Tiempo de rumba en la piscinita)',
      'Isla Cholón',
      '2 Bebidas de bienvenida (Opciones: Cerveza, agua o gaseosa)',
      'Almuerzo'
    ],
    excludes: [
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/tours/cholon-forever/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/cholon-forever/hero.jpg'
  },
  'coralina-beach-isleno': {
    slug: 'coralina-beach-isleno',
    name: 'Coralina Beach – Pasadía Isleño',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Transfer desde hoteles, transporte en lancha rápida, copa de vino de bienvenida, almuerzo a la carta 3 tiempos y uso de instalaciones.',
    duration: '8h',
    price: 400000,
    priceText: '$400.000 COP (Temporada Baja)',
    rating: 4.8,
    reviews: 167,
    emoji: '🏝️',
    includes: [
      'Transfer de recogida en hoteles Bocagrande, Getsemaní, ciudad amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida o bebida sin alcohol para niños',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos con entrada (Sugerencia del chef)',
      'Plato fuerte a la carta de pasadía',
      'Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  'coralina-beach-deluxe': {
    slug: 'coralina-beach-deluxe',
    name: 'Coralina Beach – Pasadía Deluxe',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Transfer desde hoteles, transporte en lancha rápida, copa de vino, almuerzo 3 tiempos, toallas, sillas y BARRA LIBRE todo el día.',
    duration: '8h',
    price: 500000,
    priceText: '$500.000 COP (Temporada Baja)',
    rating: 4.9,
    reviews: 189,
    emoji: '✨',
    includes: [
      'Transfer de recogida en hoteles Bocagrande, Getsemaní, ciudad amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos con entrada (Sugerencia del chef)',
      'Plato fuerte a la carta de pasadía',
      'Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      'BARRA LIBRE',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  'coralina-beach-vip': {
    slug: 'coralina-beach-vip',
    name: 'Coralina Beach – Pasadía VIP',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Transfer desde hoteles, transporte en lancha rápida, copa de vino, almuerzo 3 tiempos, deck privado y masaje relajante 30 minutos.',
    duration: '8h',
    price: 550000,
    priceText: '$550.000 COP (Temporada Baja)',
    rating: 5.0,
    reviews: 145,
    emoji: '👑',
    includes: [
      'Transfer de recogida en hoteles Bocagrande, Getsemaní, ciudad amurallada y Marbella',
      'Transporte ida y vuelta en lancha rápida',
      'Copa de vino de bienvenida o bebida sin alcohol para niños',
      'Estación de café, agua y té',
      'Almuerzo a la carta 3 tiempos con entrada (Sugerencia del chef)',
      'Plato fuerte a la carta de pasadía',
      'Bebida sin alcohol y postre del día',
      'Toallas, sillas y camas asoleadoras',
      'Deck privado',
      'Masaje relajante 30 minutos',
      'Uso de instalaciones'
    ],
    excludes: [
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/coralina-beach/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/coralina-beach/hero.jpg'
  },
  'capri-beach-clasic': {
    slug: 'capri-beach-clasic',
    name: 'Capri Beach Club - Pasadía Clásic',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Traslados ida y regreso, almuerzo incluido (pescado, arroz de mariscos, pollo o vegetariano), actividades como paddle y snorkeling. Barra libre 11am-1pm.',
    duration: '8h',
    price: 480000,
    priceText: '$480.000 COP',
    rating: 4.7,
    reviews: 178,
    emoji: '🏖️',
    includes: [
      'Traslados ida y regreso (Desde la Bodeguita)',
      'Almuerzo incluido: Pescado, arroz de mariscos o pollo o vegetariano',
      'Actividades como paddle, snorkeling',
      'Barra libre de 11:00 am a 1:00 pm'
    ],
    excludes: [
      'No incluye impuestos de muelle',
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-capri/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-capri/hero.jpg'
  },
  'capri-beach-premium': {
    slug: 'capri-beach-premium',
    name: 'Capri Beach Club – Pasadía Premium',
    category: 'islas',
    location: 'Islas del Rosario',
    description: 'Traslados ida y regreso, almuerzo incluido, actividades como paddle y snorkeling. BARRA LIBRE TODO EL DÍA.',
    duration: '8h',
    price: 590000,
    priceText: '$590.000 COP',
    rating: 4.9,
    reviews: 201,
    emoji: '🌟',
    includes: [
      'Traslados ida y regreso (Desde la Bodeguita)',
      'Almuerzo incluido: Pescado, arroz de mariscos o pollo o vegetariano',
      'Actividades como paddle, snorkeling',
      'Barra libre todo el día'
    ],
    excludes: [
      'No incluye impuestos de muelle',
      'Otras actividades (no incluidas en el valor del pasadía)',
      'Kayak',
      'Snorkel',
      'Cualquier otra actividad y/o producto y/o servicio no especificado'
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Salida de Cartagena' },
      { time: '4:00 PM', activity: 'Regreso a Cartagena' }
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/isla-capri/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/isla-capri/hero.jpg'
  },
    // === TIERRA BOMBA ===
  'tamarindo-beach-club': {
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
  'ancestral-lounge-beach': {
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
  'namaste-beach': {
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
  'palmarito-beach-hotel': {
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
  'eteka-beach-club': {
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
  'hotel-tropical-inn': {
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
  'amare-beach-club': {
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
  'fenix-beach': {
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
  'isla-real': {
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
  'makani-beach-club': {
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
  'marlin-beach-marinero': {
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
  'marlin-beach-marlin': {
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
  'baru-playa-blanca-acuario': {
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
    images: Array.from({ length: 3 }, (_, i) => `/images/tours/baru-playa-blanca-acuario/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-playa-blanca-acuario/hero.jpg'
  },
  'tour-cinco-islas-premium': {
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
  'pasadias-playa-blanca': {
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
  'pasadias-tranquila-baru': {
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
  'pasadias-nena-beach-club': {
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
  'cabana-baru': {
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
    emoji: '🏡',
    includes: [],
    excludes: [],
    itinerary: [],
    images: Array.from({ length: 9 }, (_, i) => `/images/tours/baru-cabana/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana/hero.jpg'
  },
  'cabana-luxury-baru': {
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
    emoji: '🏠',
    includes: [],
    excludes: [],
    itinerary: [],
    images: Array.from({ length: 8 }, (_, i) => `/images/tours/baru-cabana-luxury/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana-luxury/hero.jpg'
  },
  'cabana-hospedaje-baru': {
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
    images: Array.from({ length: 7 }, (_, i) => `/images/tours/baru-cabana-hospedaje/gallery-${i + 1}.jpg`),
    heroImage: '/images/tours/baru-cabana-hospedaje/hero.jpg'
  },

  // === CULTURAL ===
  'tour-aviario-playa-blanca': {
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
  'tour-volcan-totumo': {
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
  'day-tour-isla-palma': {
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
  'tour-palenque': {
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
  'pasadia-isla-mucura': {
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
  }
};

  // ✅ Componente interno que usa useSearchParams
function TourDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const tour = toursData[slug];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tourDate, setTourDate] = useState(() => searchParams.get('fecha') || '');
  const [passengers, setPassengers] = useState(() => searchParams.get('personas') || '2');

  // Si no se encuentra el tour
  if (!tour) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">🏝️</p>
          <h1 className="text-2xl font-bold text-yamid-palm mb-4">Tour no encontrado</h1>
          <p className="text-gray-600 mb-6">
            El tour que buscas no está disponible actualmente.
          </p>
          <Link 
            href="/tours"
            className="inline-flex items-center text-yamid-gold hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a tours
          </Link>
        </div>
      </main>
    );
  }

  // ✅ Manejar envío de reserva a WhatsApp
  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '573001234567'; // ← Cambia por tu número real
    const total = tour.price * parseInt(passengers);
    
    const message = `🌴 *NUEVA RESERVA - YAMID Tours* 🌴

📋 *Detalles de la Reserva:*
━━━━━━━━━━━━━━━━━━━━
🏝️ *Tour:* ${tour.name}
📍 *Ubicación:* ${tour.location}
📅 *Fecha:* ${tourDate || 'Por definir'}
👥 *Personas:* ${passengers}
💰 *Precio por persona:* ${tour.priceText}
💵 *Total estimado:* $${total.toLocaleString()} COP
━━━━━━━━━━━━━━━━━━━━

📝 *Incluye:*
${tour.includes.map((i: string) => `• ${i}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar esta reserva. ¿Me indican los pasos para el pago?`;

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ✅ Abrir lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // ✅ Preparar fotos para el lightbox
  const photos = tour.images.map((img: string) => ({
    src: img,
    alt: `${tour.name} - Galería`
  }));

  // ✅ Tours relacionados (misma categoría)
  const relatedTours = Object.values(toursData)
    .filter((t: any) => t.slug !== tour.slug && t.category === tour.category)
    .slice(0, 3);

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
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-yamid-ocean to-yamid-gold flex items-center justify-center">
                  <span class="text-9xl opacity-30">${tour.emoji}</span>
                </div>
              `;
            }
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.name}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {tour.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {tour.rating} ({tour.reviews} reseñas)
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
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              
              {/* Detalles rápidos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5 text-yamid-gold" />
                  <span>Grupos pequeños</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star className="w-5 h-5 text-yamid-gold" />
                  <span>{tour.rating} rating</span>
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
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
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
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
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
                  <h3 className="font-semibold text-red-600 mb-3 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
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
            {tour.itinerary.length > 0 && (
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
            )}

          </div>

          {/* Columna Derecha - Formulario de Reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm">Precio por persona</p>
                <p className="text-3xl font-bold text-yamid-palm">{tour.priceText}</p>
              </div>

              <form onSubmit={handleReservation} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fecha del tour</label>
                  <input 
                    type="date" 
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Personas</label>
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
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

                <button 
                  type="submit" 
                  className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Reservar por WhatsApp</span>
                </button>

                <button 
                  type="button" 
                  onClick={() => {
                    const phoneNumber = '573001234567';
                    const message = `Hola YAMID Tours 👋\nTengo una consulta sobre el tour: ${tour.name}`;
                    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
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

        {/* Tours Relacionados */}
        {relatedTours.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center text-yamid-palm mb-12">
              Tours Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour: any) => (
                <Link 
                  key={relatedTour.slug} 
                  href={`/tours/${relatedTour.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-yamid-ocean flex items-center justify-center relative">
                    <Image 
                      src={relatedTour.heroImage}
                      alt={relatedTour.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-6xl">${relatedTour.emoji}</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-yamid-palm mb-2">{relatedTour.name}</h3>
                    <p className="text-gray-600 mb-4">{relatedTour.duration} • {relatedTour.location}</p>
                    <p className="text-yamid-gold font-bold text-lg">{relatedTour.priceText}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Lightbox Component */}
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

// ✅ Componente principal que envuelve en Suspense
export default function TourDetail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yamid-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalle del tour...</p>
        </div>
      </div>
    }>
      <TourDetailContent />
    </Suspense>
  );
}