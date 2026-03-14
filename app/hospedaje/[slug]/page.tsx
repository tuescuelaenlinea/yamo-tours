'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  MapPin, Star, Users, Bed, CheckCircle, XCircle, 
  MessageCircle, ArrowLeft, Wifi, Droplet, Coffee
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Base de datos COMPLETA de hospedajes
const accommodationsData: Record<string, any> = {
  // ==================== HOTEL NENA BEACH - BARÚ ====================
  'nena-beach-suite-vista-al-mar': {
    slug: 'nena-beach-suite-vista-al-mar',
    name: 'Hotel Nena Beach - Suite Vista Al Mar',
    type: 'hotel',
    description: 'Suite por pareja con vista al mar. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 45,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Mascotas: No permitidas',
      'Fiestas: No permitidas',
      'Nota: Si llega antes del horario establecido puede pedir en recepción guardar el equipaje hasta la entrega de la habitación. O puede reservar cama anticipadamente la cual tiene un costo de $50.000 por día para los huéspedes'
    ],
    extrasNotIncluded: [
      'Bar (NOTA: Por el ingreso de bebidas o alimentos se cobra descorche)',
      'Restaurante',
      'Actividades acuáticas (Jet Sky, plancton luminoso, buceo, snorkeling)',
      'Transporte terrestre y Marítimo',
      'Seguro hotelero'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-al-mar.jpg',
    emoji: '🏨',
    category: 'nena-beach'
  },
  'nena-beach-piso1-frente-al-mar': {
    slug: 'nena-beach-piso1-frente-al-mar',
    name: 'Hotel Nena Beach - Habitación 1er Piso Frente Al Mar',
    type: 'hotel',
    description: 'Habitación 1er piso frente al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.7,
    reviews: 38,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 6 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-frente-al-mar-piso1/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-frente-al-mar-piso1.jpg',
    emoji: '🏨',
    category: 'nena-beach'
  },
  'nena-beach-piso2-frente-al-mar': {
    slug: 'nena-beach-piso2-frente-al-mar',
    name: 'Hotel Nena Beach - Habitación 2do Piso Frente Al Mar',
    type: 'hotel',
    description: 'Habitación 2do piso frente al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 52,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 6 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-piso2/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-piso2.jpg',
    emoji: '🏨',
    category: 'nena-beach'
  },
  'nena-beach-luxury-vista-piscina-piso2': {
    slug: 'nena-beach-luxury-vista-piscina-piso2',
    name: 'Hotel Nena Beach - Luxury Vista A Piscina 2do Piso',
    type: 'hotel',
    description: 'Habitación Luxury vista a piscina 2do piso por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 41,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 8 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso2/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso2.jpg',
    emoji: '🏨',
    category: 'nena-beach'
  },
  'nena-beach-piso1-frente-piscina': {
    slug: 'nena-beach-piso1-frente-piscina',
    name: 'Hotel Nena Beach - Habitación 1er Piso Frente A Piscina',
    type: 'hotel',
    description: 'Habitación 1er piso frente a piscina por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.6,
    reviews: 34,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso1/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/hotel-nena-suit-vista-piscina-piso1.jpg',
    emoji: '🏨',
    category: 'nena-beach'
  },
  'nena-beach-glamping-vista-al-mar': {
    slug: 'nena-beach-glamping-vista-al-mar',
    name: 'Hotel Nena Beach - Glamping Vista Al Mar',
    type: 'glamping',
    description: 'Glamping con vista al mar por pareja. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales por noche.',
    location: 'Barú',
   price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 28,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/nena-beach-club/glamping-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/glamping-vista-al-mar.jpg',
    emoji: '⛺',
    category: 'nena-beach'
  },
   'la-cabana-glamping-geronimo': {
    slug: 'la-cabana-glamping-geronimo',
    name: 'La  Cabaña Glamping Geronimo',
    type: 'glamping',
    description: 'La  Cabaña Glamping Geronimo es un Hotel de Playa ubicado en Playa Blanca isla de Baru, Consta de  dos niveles, en el nivel 1 están ubicados un Bar y un Restaurante,  Piscina, Yacuzzi, Bar en Piscina, un Glamping Silver y 3 Glamping Platinium con vista al mar, y en la segunda y tercera línea 6 Glamping Gold., en el 2 nivel se  se encuentran 3 Glamping Diamond con vista al mar, y la segunda y tercera línea con 5 Glamping Gold.',
    location: 'Barú',
   price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 28,
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
  { name: 'Desayuno', icon: () => <span>🥐</span>, included: true },
  { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true },
  { name: 'Centro de Buceo (frente al hotel)', icon: () => <span>🤿</span>, included: false },
  { name: 'Actividades acuáticas (frente al hotel)', icon: () => <span>🚤</span>, included: false }
    ],
    policies: [
      'Reservas: Se toman con nombre completo del huésped, teléfono y correo de la agencia',
      'Pago inicial: 50% del valor total para confirmar la reserva',
      'Comisión de agencia: Se paga cuando el huésped termina de pagar la reserva'
    ],
    extrasNotIncluded: [
      'Comisión en alojamiento: 15% del valor de venta (a cargo de la agencia)'
    ],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/glamping-geronimo/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/glamping-geronimo/1.jpg',
    emoji: '⛺',
    category: 'glamping-geronimo'
  },
  'nena-beach-instalaciones': {
    slug: 'nena-beach-instalaciones',
    name: 'Hotel Nena Beach - Instalaciones Nena Beach Club',
    type: 'hotel',
    description: 'Acceso a instalaciones de Nena Beach Club. Persona adicional de 5 a 9 años: $50.000, de 10+ años: $100.000 adicionales.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.7,
    reviews: 56,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancelación: Gratis hasta 48 horas antes de la llegada',
      'Nota: Guarda equipaje en recepción si llegas temprano o reserva cama anticipada por $50.000'
    ],
    extrasNotIncluded: ['Bar (descorche)', 'Restaurante', 'Actividades acuáticas', 'Transporte', 'Seguro hotelero'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/nena-beach-club/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/nena-beach-club.jpg',
    emoji: '🏖️',
    category: 'nena-beach'
  },
  'nena-beach-pasadia': {
    slug: 'nena-beach-pasadia',
    name: 'Hotel Nena Beach - Pasadía Nena Beach Club',
    type: 'pasadia',
    description: 'Pasadía con transporte terrestre ida y regreso (salida 7am, regreso 3pm o salida 9:30am, regreso 5:30pm). Incluye cóctel de bienvenida, cama de playa, almuerzo, café, duchas, vestieres, locker y piscina.',
    location: 'Barú',
   price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 89,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    checkIn: '7:00 AM',
    checkOut: '5:30 PM',
    amenities: [
      { name: 'Desayuno (tipo americano)', icon: () => <span>🥐</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Servicio café', icon: Coffee, included: true },
      { name: 'Sillas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Agua dulce', icon: Droplet, included: true },
      { name: 'WiFi 24 horas', icon: Wifi, included: true },
      { name: 'Energía 24 horas', icon: () => <span>⚡</span>, included: true },
      { name: 'Acceso a piscina', icon: () => <span>🏊</span>, included: true },
      { name: 'Duchas', icon: () => <span>🚿</span>, included: true },
      { name: 'Vestieres', icon: () => <span>👕</span>, included: true },
      { name: 'Locker', icon: () => <span>🔐</span>, included: true }
    ],
    policies: [
      'Horarios: 7am-3pm o 9:30am-5:30pm',
      'Niños 0-4 años no pagan pasadía (solo consumos)',
      'No incluye tours a Islas del Rosario'
    ],
    extrasNotIncluded: ['Actividades acuáticas: buceo, snorkeling, plancton luminoso, Jet Sky'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/nena-beach-club/nena-beach-club-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/nena-beach-club/nena-beach-club-pasadia.jpg',
    emoji: '☀️',
    category: 'nena-beach'
  },
  // ==================== HOTEL ETEKA - BARÚ ====================
  'eteka-habitacion-estandar': {
    slug: 'eteka-habitacion-estandar',
    name: 'Hotel Eteka - Habitación Estándar',
    type: 'hotel',
    description: 'Habitación estándar en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.7,
    reviews: 34,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/eteka/eteka-estandar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-estandar.jpg',
    emoji: '🏨',
    category: 'eteka'
  },
  'eteka-suit-vista-al-mar': {
    slug: 'eteka-suit-vista-al-mar',
    name: 'Hotel Eteka - Suite Vista Al Mar',
    type: 'hotel',
    description: 'Suite con vista al mar en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 28,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/eteka/eteka-suit-vista-al-mar/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-suit-vista-al-mar.jpg',
    emoji: '🏨',
    category: 'eteka'
  },
  'eteka-junior-suite': {
    slug: 'eteka-junior-suite',
    name: 'Hotel Eteka - Junior Suite',
    type: 'hotel',
    description: 'Junior Suite en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 31,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 5 }, (_, i) => `/images/hospedaje/eteka/eteka-junior-suit/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-junior-suit.jpg',
    emoji: '🏨',
    category: 'eteka'
  },
  'eteka-suit-vista-mar-cielo': {
    slug: 'eteka-suit-vista-mar-cielo',
    name: 'Hotel Eteka - Suite Vista Al Mar Cielo',
    type: 'hotel',
    description: 'Suite vista al mar cielo en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 5.0,
    reviews: 19,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 7 }, (_, i) => `/images/hospedaje/eteka/eteka-suit-vista-mar-cielo/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-suit-vista-mar-cielo.jpg',
    emoji: '🏨',
    category: 'eteka'
  },
  'eteka-suit-vista-mar-evolucion': {
    slug: 'eteka-suit-vista-mar-evolucion',
    name: 'Hotel Eteka - Suite Vista Al Mar Evolución',
    type: 'hotel',
    description: 'Suite vista al mar evolución en Eteka Beach Club, Barú.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 22,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [],
    policies: ['Tarifa no incluye 19% de IVA', 'Horarios: 9:30am - 5:30pm'],
    extrasNotIncluded: [],
    images: Array.from({ length: 7 }, (_, i) => `/images/hospedaje/eteka/eteka-vista-mar-evolucion/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-vista-mar-evolucion.jpg',
    emoji: '🏨',
    category: 'eteka'
  },
  'eteka-pasadia': {
    slug: 'eteka-pasadia',
    name: 'Hotel Eteka - Pasadía Eteka Beach Club',
    type: 'pasadia',
    description: 'Pasadía con transporte en lancha ida y regreso, bebida de bienvenida, experiencia gastronómica de 3 tiempos, uso de playa semi-privada, toallas y más.',
    location: 'Barú',
    price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 67,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    checkIn: '10:00 AM',
    checkOut: '5:00 PM',
    amenities: [
      { name: 'Transporte en lancha Ida y Regreso', icon: () => <span>🚤</span>, included: true },
      { name: 'Bebida de Bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Experiencia Gastronómica de 3 tiempos', icon: () => <span>🍽️</span>, included: true },
      { name: 'Uso de la playa semi-privada', icon: () => <span>🏖️</span>, included: true },
      { name: '1 toalla por persona por el día', icon: () => <span>🛁</span>, included: true }
    ],
    policies: [
      'Horarios de transporte: 10:00, 10:30, 11:00, 11:30 am (ida) | 4:00 pm ó 5:00 pm (regreso)',
      'La lancha sale de la playa de Bocagrande (detrás del Hospital Bocagrande)',
      'Tarifa no incluye 19% de IVA',
      'PROHIBIDO FUMAR',
      'SOLO NIÑOS MAYORES DE 12 AÑOS'
    ],
    extrasNotIncluded: ['Bebidas no incluidas'],
    images: Array.from({ length: 10 }, (_, i) => `/images/hospedaje/eteka/eteka-pasadia/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/eteka/eteka-pasadia.jpg',
    emoji: '☀️',
    category: 'eteka'
  },

    // ==================== ISLA DEL SOL - ISLAS DEL ROSARIO ====================
  'isla-del-sol-day-tour': {
    slug: 'isla-del-sol-day-tour',
    name: 'Isla Del Sol – Day Tour',
    type: 'pasadia',
    description: 'Pasadía en Isla del Sol, Islas del Rosario. Adulto: $420.000 | Adulto Open Bar: $420.000 | Adulto Open Bar VIP: $560.000 | Niño 4-10 años: $360.000 | Niño 2-3 años: $320.000',
    location: 'Islas del Rosario',
   price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 156,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    checkIn: '7:45 AM',
    checkOut: '5:00 PM',
    amenities: [
      { name: 'Transporte Cartagena – Isla del Sol – Cartagena', icon: () => <span>🚤</span>, included: true },
      { name: 'Frutas tropicales de Bienvenida', icon: () => <span>🍉</span>, included: true },
      { name: 'Almuerzo típico (pescado frito, arroz con coco, yuca, patacón, ensalada)', icon: () => <span>🍛</span>, included: true },
      { name: 'Postre típico', icon: () => <span>🍰</span>, included: true },
      { name: 'Sillas asoleadoras', icon: () => <span>☀️</span>, included: true },
      { name: 'Piscina (con agua de mar)', icon: () => <span>🏊</span>, included: true },
      { name: 'Recorrido panorámico por el Parque Nacional Natural', icon: () => <span>🌿</span>, included: true }
    ],
    policies: [
      'IDA: Presentarse en Muelle La Bodeguita puerta #4 (diagonal Torre del Reloj) entre 7:45 am',
      'SALIDA: 8:15 - 8:30 am aprox.',
      'REGRESO: 2:45 - 3:00 pm aprox. | LLEGADA Cartagena: 4:30 - 5:00 pm',
      'No se permite ingreso de alimentos/bebidas al Hotel',
      'No se permiten mascotas',
      'Volumen prudente de parlantes',
      'No se permiten cavas/neveras con bebidas',
      'Reserva: 50% de anticipo mínimo',
      'Cancelación sin penalidad: 24hrs de anticipación',
      'No-show: penalidad 100% del valor'
    ],
    extrasNotIncluded: [
      'Gastos no especificados',
      'Tasa Portuaria: $29.000 por persona (solo efectivo, sujeto a cambio)',
      'Servicio de toallas',
      'Actividades adicionales: Buceo, Snorkel, Masajes, entrada al oceanario, Caminatas Ecológicas'
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/day-tour/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/day-tour.jpg',
    emoji: '🏝️',
    category: 'isla-del-sol'
  },
  'isla-del-sol-bungalo-clasico-abanico': {
    slug: 'isla-del-sol-bungalo-clasico-abanico',
    name: 'Isla Del Sol – Bungaló Clásico Abanico',
    type: 'bungalow',
    description: 'Bungaló clásico con abanico. Valor sencilla o doble: $750.000 | Persona adicional: $320.000 | Niños 4-10 años: $195.000 | Niños 0-3 años: $105.000 | Capacidad máxima: 5 personas',
    location: 'Islas del Rosario',
    price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 43,
    capacity: 5,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Alimentación completa con bebidas no alcohólicas', icon: () => <span>🍴</span>, included: true },
      { name: 'Cóctel de bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Playa y Piscina con agua del mar', icon: () => <span>🏖️</span>, included: true },
      { name: 'Sillas asoleadoras', icon: () => <span>☀️</span>, included: true },
      { name: 'Recorrido panorámico por el Parque Nacional', icon: () => <span>🌿</span>, included: true },
      { name: 'Postre típico (Cocadas)', icon: () => <span>🥥</span>, included: true },
      { name: 'Servicio de toallas', icon: () => <span>🛁</span>, included: true },
      { name: 'Café Colombiano', icon: Coffee, included: true }
    ],
    policies: [
      'Tarifa sin IVA (sumar 19% para colombianos)',
      'Alimentación: Primer día (almuerzo típico + cena a la carta) | Día de salida (desayuno + almuerzo a la carta)',
      'Estadías +1 noche: 3 comidas incluidas'
    ],
    extrasNotIncluded: [
      'Gastos no especificados',
      'Tasa Portuaria: $29.000 por persona (solo efectivo)',
      'Transporte Cartagena-Islas del Sol-Cartagena: $140.000 p/p (compartido con tour del día)',
      'Uso de muelles y parque nacional: $23.000 p/p (solo efectivo)',
      'Transporte adulto/niño 4+ años ida y vuelta: $160.000'
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/bungalo-clasico-abanico/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/bungalo-clasico-abanico.jpg',
    emoji: '🏡',
    category: 'isla-del-sol'
  },
  'isla-del-sol-bungalo-estandar-vista-jardin': {
    slug: 'isla-del-sol-bungalo-estandar-vista-jardin',
    name: 'Isla Del Sol – Bungaló Estándar Vista Al Jardín',
    type: 'bungalow',
    description: 'Bungaló estándar con vista al jardín. Persona adicional: $380.000 | Niños 4-10 años: $280.000 | Niños 0-3 años: $104.000',
    location: 'Islas del Rosario',
    price: 0,
    priceText: 'por definir',
    rating: 4.9,
    reviews: 38,
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Bungalow Estándar', icon: () => <span>🏡</span>, included: true },
      { name: 'Un baño privado', icon: () => <span>🚽</span>, included: true },
      { name: 'Televisión satelital', icon: () => <span>📺</span>, included: true },
      { name: 'Nevera', icon: () => <span>🧊</span>, included: true },
      { name: 'Luz Eléctrica y Energía Solar', icon: () => <span>⚡</span>, included: true },
      { name: 'Aire Acondicionado', icon: () => <span>❄️</span>, included: true },
      { name: 'Terraza con Hamaca', icon: () => <span>🌅</span>, included: true },
      { name: 'Cama doble y sencilla', icon: () => <span>🛏️</span>, included: true }
    ],
    policies: [
      'Alimentación completa con bebidas no alcohólicas',
      'Primer día: Almuerzo típico + Cena a la Carta | Día de salida: Desayuno + Almuerzo a la Carta',
      'Estadías +1 noche: 3 comidas incluidas',
      'Cóctel de bienvenida, playa, piscina, sillas, recorrido parque natural, postre, toallas, café'
    ],
    extrasNotIncluded: [
      'Gastos no especificados',
      'Tasa Portuaria: $29.000 por persona (solo efectivo)',
      'Tarifa sin IVA (sumar 19% para colombianos)',
      'Transporte Cartagena-Islas del Sol-Cartagena: compartido con tour del día',
      'Uso de muelles y parque nacional: $23.000 p/p (solo efectivo)',
      'Transporte adulto/niño 4+ años ida y vuelta: $160.000'
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/hospedaje/hotel_isla_del_sol/bungalo_estandar_vista_al_jardin/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/hotel_isla_del_sol/bungalo_estandar_vista_al_jardin.jpg',
    emoji: '🏡',
    category: 'isla-del-sol'
  },

  // ==================== HOTEL AURA BARÚ ====================
  'aura-baru-experiencia-deluxe': {
    slug: 'aura-baru-experiencia-deluxe',
    name: 'Hotel Aura Barú – Experiencia Deluxe',
    type: 'hotel',
    description: 'Aura Hotel Barú - DELUXE EXPERIENCE con transporte terrestre incluido. Persona adicional: $380.000 | Niños 4-10 años: $280.000 | Niños 0-3 años: $104.000',
    location: 'Barú',
   price: 0,
    priceText: 'por definir',
    rating: 4.8,
    reviews: 52,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    amenities: [
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: true },
      { name: 'Transporte en carro (1h aprox.)', icon: () => <span>🚗</span>, included: true },
      { name: 'Coctel de Bienvenida', icon: () => <span>🍹</span>, included: true },
      { name: 'Bono Consumible ($90.000 adultos / $50.000 niños)', icon: () => <span>🎫</span>, included: true },
      { name: 'Asoleadoras', icon: () => <span>☀️</span>, included: true },
      { name: 'Camas de playa', icon: () => <span>🏖️</span>, included: true },
      { name: 'Toallas y duchas de agua dulce', icon: () => <span>🚿</span>, included: true },
      { name: 'Kayaks', icon: () => <span>🛶</span>, included: true },
      { name: 'Paddle board', icon: () => <span>🏄</span>, included: true },
      { name: 'Mesa de Ping Pong', icon: () => <span>🏓</span>, included: true }
    ],
    policies: [
      'Recogida en hoteles del Centro, Manga, Bocagrande, Castillo Grande, Laguito, Crespo',
      'Transporte en carro: 1h aprox.',
      'Tarifa sin IVA (sumar 19% para colombianos)'
    ],
    extrasNotIncluded: [
      'Gastos no especificados',
      'Tasa Portuaria: $29.000 por persona (solo efectivo)',
      'Consumos y actividades no especificadas'
    ],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/aura-experiencia-deluxe/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/aura-experiencia-deluxe1.jpg',
    emoji: '🏨',
    category: 'aura-baru'
  },

  // ==================== FINCA VERANERAS - TURBACO ====================
  'finca-veraneras': {
    slug: 'finca-veraneras',
    name: 'Finca Veraneras',
    type: 'finca',
    description: 'Finca en Turbaco. Pasadía (9:00 am - 4:30 pm): $950.000 | Pasanoche (6:00 pm - 8:00 am): $1.500.000 | 24 horas: $1.700.000',
    location: 'Turbaco',
   price: 0,
    priceText: 'por definir',
    rating: 4.7,
    reviews: 28,
    capacity: 20,
    bedrooms: 4,
    bathrooms: 3,
    checkIn: '9:00 AM',
    checkOut: '4:30 PM',
    amenities: [
      { name: 'Piscina', icon: () => <span>🏊</span>, included: true },
      { name: 'Zona BBQ', icon: () => <span>🔥</span>, included: true },
      { name: 'Parqueadero', icon: () => <span>🅿️</span>, included: true },
      { name: 'Zona verde', icon: () => <span>🌳</span>, included: true }
    ],
    policies: ['Reserva con anticipo requerida', 'Consultar disponibilidad'],
    extrasNotIncluded: ['Alimentación', 'Transporte', 'Actividades adicionales'],
    images: Array.from({ length: 3 }, (_, i) => `/images/hospedaje/finca-veraneras/${i + 1}.jpg`),
    heroImage: '/images/hospedaje/finca-veraneras.jpg',
    emoji: '🏡',
    category: 'finca'
  }
};

// ✅ Componente interno que usa useSearchParams
function AccommodationDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const accommodation = accommodationsData[slug];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(() => searchParams.get('checkin') || '');
  const [checkOutDate, setCheckOutDate] = useState(() => searchParams.get('checkout') || '');
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

   // ✅ Manejar envío de reserva a WhatsApp (Corregido para iOS y Android)
  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ 1. Número limpio sin espacios
    const phoneNumber = '573013547422'; 
    
    // Cálculo de noches (mantenemos tu lógica original)
    const nights = checkInDate && checkOutDate 
      ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
      : 1;
    
    // Cálculo del total (aseguramos que sea un número válido)
    const priceNum = accommodation.price || 0;
    const guestsNum = parseInt(guests) || 1;
    const total = priceNum * nights * guestsNum;
    
    const message = `🏨 *NUEVA RESERVA - HOSPEDAJE* 🏨

 *Detalles de la Reserva:*
━━━━━━━━━━━━━━━━━━━━
🏡 *Propiedad:* ${accommodation.name}
📍 *Ubicación:* ${accommodation.location}
📅 *Check-in:* ${checkInDate || 'Por definir'}
📅 *Check-out:* ${checkOutDate || 'Por definir'}
🌙 *Noches:* ${nights}
👥 *Huéspedes:* ${guests}
💰 *Precio por noche:* ${accommodation.priceText}
💵 *Total estimado:* $${total.toLocaleString()} COP
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar disponibilidad y proceder con la reserva.`;

    // ✅ 2. URL Optimizada: Usamos 'wa.me' y eliminamos espacios
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = accommodation.images.map((img: string) => ({ src: img, alt: `${accommodation.name} - Galería` }));

  const relatedAccommodations = Object.values(accommodationsData)
    .filter((a: any) => a.slug !== accommodation.slug && a.category === accommodation.category)
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
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {accommodation.location}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {accommodation.rating} ({accommodation.reviews} reseñas)</span>
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
                  <span className="text-sm font-medium">{accommodation.capacity} {accommodation.capacity === 1 ? 'huésped' : 'huéspedes'}</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Bed className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{accommodation.bedrooms} {accommodation.bedrooms === 1 ? 'habitación' : 'habitaciones'}</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <span className="text-2xl mb-2 block">🚿</span>
                  <span className="text-sm font-medium">{accommodation.bathrooms} {accommodation.bathrooms === 1 ? 'baño' : 'baños'}</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Star className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{accommodation.rating} rating</span>
                </div>
              </div>
            </div>

            {/* Galería */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accommodation.images.map((img: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer" onClick={() => openLightbox(index)}>
                    <Image src={img} alt={`${accommodation.name} - Vista ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="absolute inset-0 flex items-center justify-center bg-yamid-sand"><span class="text-4xl text-yamid-gold-dark">📷</span></div>`;
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
                      {amenity.included ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-yamid-gold" />}
                        <span className={amenity.included ? 'text-gray-700' : 'text-gray-400'}>{amenity.name}</span>
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
                {accommodation.policies.map((policy: string, index: number) => (
                  <p key={index}>• {policy}</p>
                ))}
              </div>
            </div>

            {/* Servicios No Incluidos */}
            {accommodation.extrasNotIncluded?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-yamid-palm mb-4">Servicios No Incluidos</h2>
                <ul className="space-y-2 text-gray-600">
                  {accommodation.extrasNotIncluded.map((extra: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      {extra}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Columna Derecha - Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm">Precio desde</p>
                <p className="text-3xl font-bold text-yamid-palm">{accommodation.priceText}</p>
              </div>
              <form onSubmit={handleReservation} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check-in</label>
                  <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check-out</label>
                  <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Huéspedes</label>
                  <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold">
                    {Array.from({ length: accommodation.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Huésped' : 'Huéspedes'}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2">
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

        {/* Relacionados */}
        {relatedAccommodations.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-yamid-palm mb-6">Hospedajes Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAccommodations.map((related: any) => (
                <Link key={related.slug} href={`/hospedaje/${related.slug}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40 bg-yamid-sand">
                    <Image src={related.heroImage} alt={related.name} fill className="object-cover" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; target.parentElement!.innerHTML = `<div class="absolute inset-0 flex items-center justify-center"><span class="text-5xl">${related.emoji}</span></div>`; }} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-yamid-palm">{related.name}</h3>
                    <p className="text-sm text-gray-600">{related.location}</p>
                    <p className="text-yamid-gold font-bold mt-2">{related.priceText}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={photos} index={currentImageIndex} plugins={[Thumbnails, Zoom]} thumbnails={{}} zoom={{ maxZoomPixelRatio: 3 }} />
    </main>
  );
}

// ✅ Componente principal que envuelve en Suspense
export default function AccommodationDetail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yamid-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalle...</p>
        </div>
      </div>
    }>
      <AccommodationDetailContent />
    </Suspense>
  );
}