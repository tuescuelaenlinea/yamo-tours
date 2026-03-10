'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, Star, Users, Bed, DollarSign, Wifi, Droplet, Coffee } from 'lucide-react';

// ✅ Base de datos COMPLETA de hospedaje con información real
const accommodations = [
  // === HOTEL NENA BEACH - BARÚ ===
  {
    slug: 'nena-beach-suite-vista-al-mar',
    name: 'Hotel Nena Beach - Suite Vista Al Mar',
    type: 'hotel',
    description: 'Suite por pareja con vista al mar. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 450000,
    priceText: '$450.000 COP/noche',
    rating: 4.8,
    reviews: 45,
    image: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-al-mar.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Mascotas: No permitidas', 'Fiestas: No permitidas', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche por alimentos/bebidas externas)', 'Restaurante', 'Actividades acuáticas (Jet Sky, plancton, buceo, snorkeling)', 'Transporte terrestre y marítimo', 'Seguro hotelero'],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-al-mar.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-piso1-frente-al-mar',
    name: 'Hotel Nena Beach - Habitación 1er Piso Frente Al Mar',
    type: 'hotel',
    description: 'Habitación 1er piso frente al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 350000,
    priceText: '$350.000 COP/noche',
    rating: 4.7,
    reviews: 38,
    image: '/images/hospedaje/nena-beach-club/hotel-nena-suit-frente-al-mar-piso1.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 6 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-frente-al-mar-piso1/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-frente-al-mar-piso1.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-piso2-frente-al-mar',
    name: 'Hotel Nena Beach - Habitación 2do Piso Frente Al Mar',
    type: 'hotel',
    description: 'Habitación 2do piso frente al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 600000,
    priceText: '$600.000 COP/noche',
    rating: 4.9,
    reviews: 52,
    image: '/images/hospedaje/nena-beach-club/hotel-nena-suit-piso2.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 6 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-piso2/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-piso2.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-luxury-vista-piscina-piso2',
    name: 'Hotel Nena Beach - Luxury Vista A Piscina 2do Piso',
    type: 'hotel',
    description: 'Habitación Luxury vista a piscina 2do piso por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 420000,
    priceText: '$420.000 COP/noche',
    rating: 4.8,
    reviews: 41,
    image: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso2.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 8 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso2/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso2.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-piso1-frente-piscina',
    name: 'Hotel Nena Beach - Habitación 1er Piso Frente A Piscina',
    type: 'hotel',
    description: 'Habitación 1er piso frente a piscina por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 300000,
    priceText: '$300.000 COP/noche',
    rating: 4.6,
    reviews: 34,
    image: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso1.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso1/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso1.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-glamping-vista-al-mar',
    name: 'Hotel Nena Beach - Glamping Vista Al Mar',
    type: 'glamping',
    description: 'Glamping con vista al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 415000,
    priceText: '$415.000 COP/noche',
    rating: 4.9,
    reviews: 28,
    image: '/images/hospedaje/nena-beach-club/glamping-vista-al-mar.jpg',
    emoji: '⛺',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/nena-beach-club/glamping-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/glamping-vista-al-mar.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-instalaciones',
    name: 'Hotel Nena Beach - Instalaciones Nena Beach Club',
    type: 'hotel',
    description: 'Acceso a instalaciones de Nena Beach Club. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales.',
    location: 'Barú',
    price: 280000,
    priceText: '$280.000 COP/noche',
    rating: 4.7,
    reviews: 56,
    image: '/images/hospedaje/nena-beach-club/nena-beach-club.jpg',
    emoji: '🏖️',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Cancelación: Gratis hasta 48 horas antes', 'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/nena-beach-club/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/nena-beach-club.jpg',
    category: 'nena-beach'
  },
  {
    slug: 'nena-beach-pasadia',
    name: 'Hotel Nena Beach - Pasadía Nena Beach Club',
    type: 'pasadia',
    description: 'Pasadía con transporte terrestre ida y regreso (salida 7am, regreso 3pm o salida 9:30am, regreso 5:30pm). Incluye cóctel de bienvenida, cama de playa, almuerzo, café, duchas, vestieres, locker y piscina.',
    location: 'Barú',
    price: 320000,
    priceText: '$320.000 COP/persona',
    rating: 4.8,
    reviews: 89,
    image: '/images/hospedaje/nena-beach-club/nena-beach-club-pasadia.jpg',
    emoji: '☀️',
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    amenities: ['desayuno-americano', 'coctel-bienvenida', 'servicio-cafe', 'sillas-playa', 'agua-dulce', 'wifi-24h', 'energia-24h', 'piscina', 'duchas', 'vestieres', 'locker'],
    policies: ['Horarios: 7am-3pm o 9:30am-5:30pm', 'Niños 0-4 años no pagan pasadía (solo consumos)', 'No incluye tours a Islas del Rosario'],
    extrasNotIncluded: ['Actividades acuáticas: buceo, snorkeling, plancton luminoso, Jet Sky'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/nena-beach-club\nena-beach-club-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/nena-beach-club-pasadia.jpg',
    category: 'nena-beach'
  },

  // === HOTEL ETEKA - BARÚ ===
  {
    slug: 'eteka-habitacion-estandar',
    name: 'Hotel Eteka - Habitación Estándar',
    type: 'hotel',
    description: 'Habitación estándar en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 640000,
    priceText: '$640.000 COP/noche + 19% IVA',
    rating: 4.7,
    reviews: 34,
    image: '/images/hospedaje/eteka/eteka-estandar.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/eteka/eteka-estandar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-estandar.jpg',
    category: 'eteka'
  },
  {
    slug: 'eteka-suit-vista-al-mar',
    name: 'Hotel Eteka - Suite Vista Al Mar',
    type: 'hotel',
    description: 'Suite con vista al mar en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 1070000,
    priceText: '$1.070.000 COP/noche + 19% IVA',
    rating: 4.9,
    reviews: 28,
    image: '/images/hospedaje/eteka/eteka-suit-vista-al-mar.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/eteka/eteka-suit-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-suit-vista-al-mar.jpg',
    category: 'eteka'
  },
  {
    slug: 'eteka-junior-suite',
    name: 'Hotel Eteka - Junior Suite',
    type: 'hotel',
    description: 'Junior Suite en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 785000,
    priceText: '$785.000 COP/noche + 19% IVA',
    rating: 4.8,
    reviews: 31,
    image: '/images/hospedaje/eteka/eteka-junior-suit.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/eteka/eteka-junior-suit/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-junior-suit.jpg',
    category: 'eteka'
  },
  {
    slug: 'eteka-suit-vista-mar-cielo',
    name: 'Hotel Eteka - Suite Vista Al Mar Cielo',
    type: 'hotel',
    description: 'Suite vista al mar cielo en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 1400000,
    priceText: '$1.400.000 COP/noche + 19% IVA',
    rating: 5.0,
    reviews: 19,
    image: '/images/hospedaje/eteka/eteka-suit-vista-mar-cielo.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 7 }, (_, i) => `/images/hospedaje/eteka/eteka-suit-vista-mar-cielo/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-suit-vista-mar-cielo.jpg',
    category: 'eteka'
  },
  {
    slug: 'eteka-suit-vista-mar-evolucion',
    name: 'Hotel Eteka - Suite Vista Al Mar Evolución',
    type: 'hotel',
    description: 'Suite vista al mar evolución en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 1100000,
    priceText: '$1.100.000 COP/noche + 19% IVA',
    rating: 4.9,
    reviews: 22,
    image: '/images/hospedaje/eteka/eteka-vista-mar-evolucion.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 7 }, (_, i) => `/images/hospedaje/eteka/eteka-vista-mar-evolucion/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-vista-mar-evolucion.jpg',
    category: 'eteka'
  },
  {
    slug: 'eteka-pasadia',
    name: 'Hotel Eteka - Pasadía Eteka Beach Club',
    type: 'pasadia',
    description: 'Pasadía con transporte en lancha ida y regreso, bebida de bienvenida, experiencia gastronómica de 3 tiempos, uso de playa semi-privada, toallas y más.',
    location: 'Barú',
    price: 320000,
    priceText: '$320.000 COP/persona + 19% IVA',
    rating: 4.8,
    reviews: 67,
    image: '/images/hospedaje/eteka/eteka-pasadia.jpg',
    emoji: '☀️',
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    amenities: ['transporte-lancha', 'bebida-bienvenida', 'experiencia-gastronomica-3-tiempos', 'playa-semi-privada', 'toallas', 'lounge'],
    policies: ['Horarios lancha: 10:00, 10:30, 11:00, 11:30 am (ida) | 4:00 pm ó 5:00 pm (regreso)', 'Salida: Playa de Bocagrande (detrás del Hospital Bocagrande)', 'Tarifa no incluye 19% de IVA', 'PROHIBIDO FUMAR', 'SOLO NIÑOS MAYORES DE 12 AÑOS'],
    extrasNotIncluded: ['Bebidas no incluidas'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/eteka/eteka-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-pasadia.jpg',
    category: 'eteka'
  },

  // === ISLA DEL SOL - ISLAS DEL ROSARIO ===
  {
    slug: 'isla-del-sol-day-tour',
    name: 'Isla Del Sol – Day Tour',
    type: 'pasadia',
    description: 'Pasadía en Isla del Sol, Islas del Rosario. Adulto: $420.000 | Adulto Open Bar: $420.000 | Adulto Open Bar VIP: $560.000 | Niño 4-10 años: $360.000 | Niño 2-3 años: $320.000',
    location: 'Islas del Rosario',
    price: 420000,
    priceText: 'Desde $420.000 COP/persona',
    rating: 4.9,
    reviews: 156,
    image: '/images/hospedaje/hotel_isla_del_sol/day-tour.jpg',
    emoji: '🏝️',
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    amenities: ['transporte-lancha-rapida', 'frutas-bienvenida', 'almuerzo-tipico', 'postre-tipico', 'sillas-asoleadoras', 'piscina-agua-mar', 'recorrido-parque-natural'],
    policies: ['IDA: Presentarse en Muelle La Bodeguita puerta #4 (diagonal Torre del Reloj) entre 7:45 am', 'SALIDA: 8:15 - 8:30 am aprox.', 'REGRESO: 2:45 - 3:00 pm aprox. | LLEGADA Cartagena: 4:30 - 5:00 pm', 'No se permite ingreso de alimentos/bebidas al Hotel', 'No se permiten mascotas', 'Volumen prudente de parlantes', 'No se permiten cavas/neveras con bebidas', 'Reserva: 50% de anticipo mínimo', 'Cancelación sin penalidad: 24hrs de anticipación', 'No-show: penalidad 100% del valor'],
    extrasNotIncluded: ['Gastos no especificados', 'Tasa Portuaria: $29.000 por persona (solo efectivo, sujeto a cambio)', 'Servicio de toallas', 'Actividades adicionales: Buceo, Snorkel, Masajes, entrada al oceanario, Caminatas Ecológicas'],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/day-tour/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/day-tour.jpg',
    category: 'isla-del-sol'
  },
  {
    slug: 'isla-del-sol-bungalo-clasico-abanico',
    name: 'Isla Del Sol – Bungaló Clásico Abanico',
    type: 'bungalow',
    description: 'Bungaló clásico con abanico. Valor sencilla o doble: $750.000 | Persona adicional: $320.000 | Niños 4-10 años: $195.000 | Niños 0-3 años: $105.000 | Capacidad máxima: 5 personas',
    location: 'Islas del Rosario',
    price: 750000,
    priceText: '$750.000 COP/noche (sin IVA)',
    rating: 4.8,
    reviews: 43,
    image: '/images/hospedaje/hotel_isla_del_sol/bungalo-clasico-abanico.jpg',
    emoji: '🏡',
    capacity: 5,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['alimentacion-completa', 'bebidas-no-alcoholicas', 'coctel-bienvenida', 'playa-piscina', 'sillas-asoleadoras', 'recorrido-parque-natural', 'postre-cocadas', 'servicio-toallas', 'cafe-colombiano'],
    policies: ['Tarifa sin IVA (sumar 19% para colombianos)', 'Alimentación: Primer día (almuerzo típico + cena a la carta) | Día de salida (desayuno + almuerzo a la carta)', 'Estadías +1 noche: 3 comidas incluidas'],
    extrasNotIncluded: ['Gastos no especificados', 'Tasa Portuaria: $29.000 por persona (solo efectivo)', 'Transporte Cartagena-Islas del Sol-Cartagena: $140.000 p/p (compartido con tour del día)', 'Uso de muelles y parque nacional: $23.000 p/p (solo efectivo)', 'Transporte adulto/niño 4+ años ida y vuelta: $160.000'],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/bungalo-clasico-abanico/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/bungalo-clasico-abanico.jpg',
    category: 'isla-del-sol'
  },
  {
    slug: 'isla-del-sol-bungalo-estandar-vista-jardin',
    name: 'Isla Del Sol – Bungaló Estándar Vista Al Jardín',
    type: 'bungalow',
    description: 'Bungaló estándar con vista al jardín. Persona adicional: $380.000 | Niños 4-10 años: $280.000 | Niños 0-3 años: $104.000',
    location: 'Islas del Rosario',
    price: 877000,
    priceText: '$877.000 COP/noche (sin IVA)',
    rating: 4.9,
    reviews: 38,
    image: '/images/hospedaje/hotel_isla_del_sol/bungalo_estandar_vista_al_jardin.jpg',
    emoji: '🏡',
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['bungalow-estandar', 'bano-privado', 'tv-satelital', 'nevera', 'luz-electrica-energia-solar', 'aire-acondicionado', 'terraza-hamaca', 'cama-doble-sencilla'],
    policies: ['Alimentación completa con bebidas no alcohólicas', 'Primer día: Almuerzo típico + Cena a la Carta | Día de salida: Desayuno + Almuerzo a la Carta', 'Estadías +1 noche: 3 comidas incluidas', 'Cóctel de bienvenida, playa, piscina, sillas, recorrido parque natural, postre, toallas, café'],
    extrasNotIncluded: ['Gastos no especificados', 'Tasa Portuaria: $29.000 por persona (solo efectivo)', 'Tarifa sin IVA (sumar 19% para colombianos)', 'Transporte Cartagena-Islas del Sol-Cartagena: compartido con tour del día', 'Uso de muelles y parque nacional: $23.000 p/p (solo efectivo)', 'Transporte adulto/niño 4+ años ida y vuelta: $160.000'],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/bungalo_estandar_vista_al_jardin/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/bungalo_estandar_vista_al_jardin.jpg',
    category: 'isla-del-sol'
  },

  // === HOTEL AURA BARÚ ===
  {
    slug: 'aura-baru-experiencia-deluxe',
    name: 'Hotel Aura Barú – Experiencia Deluxe',
    type: 'hotel',
    description: 'Aura Hotel Barú - DELUXE EXPERIENCE con transporte terrestre incluido. Persona adicional: $380.000 | Niños 4-10 años: $280.000 | Niños 0-3 años: $104.000',
    location: 'Barú',
    price: 385000,
    priceText: '$385.000 COP/persona (sin IVA)',
    rating: 4.8,
    reviews: 52,
    image: '/images/hospedaje/aura-experiencia-deluxe1.jpg',
    emoji: '🏨',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['recogida-hotel', 'transporte-carro', 'coctel-bienvenida', 'bono-consumible-adultos-90k-ninos-50k', 'asoleadoras', 'camas-playa', 'toallas', 'duchas-agua-dulce', 'kayaks', 'paddle-board', 'ping-pong'],
    policies: ['Recogida en hoteles del Centro, Manga, Bocagrande, Castillo Grande, Laguito, Crespo', 'Transporte en carro: 1h aprox.', 'Tarifa sin IVA (sumar 19% para colombianos)'],
    extrasNotIncluded: ['Gastos no especificados', 'Tasa Portuaria: $29.000 por persona (solo efectivo)', 'Consumos y actividades no especificadas'],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/aura-experiencia-deluxe/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/aura-experiencia-deluxe1.jpg',
    category: 'aura-baru'
  },


  // === FINCA VERANERAS - TURBACO ===
  {
    slug: 'finca-veraneras',
    name: 'Finca Veraneras',
    type: 'finca',
    description: 'Finca en Turbaco. Pasadía (9:00 am - 4:30 pm): $950.000 | Pasanoche (6:00 pm - 8:00 am): $1.500.000 | 24 horas: $1.700.000',
    location: 'Turbaco',
    price: 950000,
    priceText: 'Desde $950.000 COP',
    rating: 4.7,
    reviews: 28,
    image: '/images/hospedaje/finca-veraneras.jpg',
    emoji: '🏡',
    capacity: 20,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['piscina', 'zona-bbq', 'parqueadero', 'zona-verde'],
    policies: ['Reserva con anticipo requerida', 'Consultar disponibilidad'],
    extrasNotIncluded: ['Alimentación', 'Transporte', 'Actividades adicionales'],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/finca-veraneras/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/finca-veraneras/finca-veraneras.jpg',
    category: 'finca'
  }, 
  
];

// Categorías de hospedaje
const accommodationTypes = [
  { id: 'todos', name: 'Todos', icon: '🏠' },
  { id: 'hotel', name: 'Hoteles', icon: '🏨' },
  { id: 'glamping', name: 'Glamping', icon: '⛺' },
  { id: 'pasadia', name: 'Pasadías', icon: '☀️' },
  { id: 'bungalow', name: 'Bungalós', icon: '🏡' },
  { id: 'finca', name: 'Fincas', icon: '🌴' }
];

// Iconos de amenidades
const amenityIcons: Record<string, any> = {
  'desayuno-americano': () => <span>🥐</span>,
  'coctel-bienvenida': () => <span>🍹</span>,
  'servicio-cafe': () => <span>☕</span>,
  'sillas-playa': () => <span>🏖️</span>,
  'agua-dulce': () => <span>💧</span>,
  'wifi-24h': Wifi,
  'energia-24h': () => <span>⚡</span>,
  'piscina': () => <span>🏊</span>,
  'duchas': () => <span>🚿</span>,
  'vestieres': () => <span>👕</span>,
  'locker': () => <span>🔐</span>,
  'transporte-lancha': () => <span>🚤</span>,
  'transporte-carro': () => <span>🚗</span>,
  'bebida-bienvenida': () => <span>🥤</span>,
  'experiencia-gastronomica-3-tiempos': () => <span>🍽️</span>,
  'playa-semi-privada': () => <span>🏝️</span>,
  'toallas': () => <span>🛁</span>,
  'lounge': () => <span>🛋️</span>,
  'frutas-bienvenida': () => <span>🍉</span>,
  'almuerzo-tipico': () => <span>🍛</span>,
  'postre-tipico': () => <span>🍰</span>,
  'sillas-asoleadoras': () => <span>☀️</span>,
  'piscina-agua-mar': () => <span>🌊</span>,
  'recorrido-parque-natural': () => <span>🌿</span>,
  'alimentacion-completa': () => <span>🍴</span>,
  'bebidas-no-alcoholicas': () => <span>🥤</span>,
  'postre-cocadas': () => <span>🥥</span>,
  'servicio-toallas': () => <span>🛁</span>,
  'cafe-colombiano': () => <span>☕</span>,
  'bano-privado': () => <span>🚽</span>,
  'tv-satelital': () => <span>📺</span>,
  'nevera': () => <span>🧊</span>,
  'luz-electrica-energia-solar': () => <span>☀️</span>,
  'aire-acondicionado': () => <span>❄️</span>,
  'terraza-hamaca': () => <span>🌅</span>,
  'cama-doble-sencilla': () => <span>🛏️</span>,
  'recogida-hotel': () => <span>🚗</span>,
  'bono-consumible-adultos-90k-ninos-50k': () => <span>🎫</span>,
  'asoleadoras': () => <span>☀️</span>,
  'camas-playa': () => <span>🏖️</span>,
  'kayaks': () => <span>🛶</span>,
  'paddle-board': () => <span>🏄</span>,
  'ping-pong': () => <span>🏓</span>,
  'zona-bbq': () => <span>🔥</span>,
  'parqueadero': () => <span>🅿️</span>,
  'zona-verde': () => <span>🌳</span>
};

// ✅ Componente interno que usa useSearchParams
function HospedajeContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(() => searchParams.get('tipo') || 'todos');
  const [priceRange, setPriceRange] = useState('todos');
  const [sortBy, setSortBy] = useState('popularity');

  // Filtrar hospedajes
  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = !searchTerm || 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'todos' || acc.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange === 'economico') matchesPrice = acc.price < 400000;
    else if (priceRange === 'medio') matchesPrice = acc.price >= 400000 && acc.price < 800000;
    else if (priceRange === 'premium') matchesPrice = acc.price >= 800000;
    
    return matchesSearch && matchesType && matchesPrice;
  });

  // Ordenar
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('todos');
    setPriceRange('todos');
    setSortBy('popularity');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yamid-palm to-yamid-gold py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Hospedaje Exclusivo 🏨</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Hoteles boutique, bungalós, glamping y fincas en el Caribe colombiano
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
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                {accommodationTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.icon} {type.name}</option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-yamid-gold"
              >
                <option value="todos">💰 Todos los precios</option>
                <option value="economico">$ Económico (&lt; $400k)</option>
                <option value="medio">$$ Medio ($400k - $800k)</option>
                <option value="premium">$$$ Premium (&gt; $800k)</option>
              </select>
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
              <span className="font-bold text-yamid-palm">{sortedAccommodations.length}</span> opciones encontradas
              {searchTerm && <span className="ml-2">para "<strong>{searchTerm}</strong>"</span>}
            </p>
            {(searchTerm || selectedType !== 'todos' || priceRange !== 'todos') && (
              <button onClick={clearFilters} className="text-yamid-gold hover:underline text-sm font-medium">
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-12">
        {sortedAccommodations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-600">No encontramos hospedajes con esos filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAccommodations.map((acc) => (
              <Link 
                key={acc.slug} 
                href={`/hospedaje/${acc.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-yamid-sand">
                  <Image 
                    src={acc.image} 
                    alt={acc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
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
                      {accommodationTypes.find(t => t.id === acc.category)?.icon} {acc.type.toUpperCase()}
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
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {acc.capacity} {acc.capacity === 1 ? 'persona' : 'personas'}</span>
                    {acc.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {acc.bedrooms} hab</span>}
                  </div>
                  {/* Amenidades preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.amenities.slice(0, 4).map((amenity, idx) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <span key={idx} className="text-xs bg-yamid-sand px-2 py-1 rounded flex items-center gap-1">
                          {Icon && <Icon className="w-3 h-3" />}
                          {amenity.replace('-', ' ')}
                        </span>
                      );
                    })}
                  </div>
                  {/* Precio y CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Desde</span>
                      <p className="text-lg font-bold text-yamid-gold">{acc.priceText}</p>
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
          <p className="text-gray-700 mb-8">Tenemos acceso a propiedades exclusivas no listadas públicamente</p>
          <Link href="/contacto" className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Contáctanos para opciones personalizadas
          </Link>
        </div>
      </section>
    </main>
  );
}

// ✅ Componente principal que envuelve en Suspense
export default function HospedajePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yamid-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando hospedajes...</p>
        </div>
      </div>
    }>
      <HospedajeContent />
    </Suspense>
  );
}