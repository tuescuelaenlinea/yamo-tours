'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  MapPin, Star, Users, Clock, DollarSign, CheckCircle, XCircle, 
  MessageCircle, ArrowLeft, Anchor, Wifi, Music, Droplets, ShowerHead
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Base de datos COMPLETA con información real proporcionada
const transportData: Record<string, any> = {
  'yate-55-pies': {
    slug: 'yate-55-pies',
    name: 'Yate 55 Pies',
    type: 'yate',
    description: 'Yate exclusivo de 55 pies con 3 cuartos y 3 baños. Perfecto para grupos que buscan lujo y comodidad en el Caribe. Espacios amplios, tripulación profesional y equipamiento premium para una experiencia inolvidable.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 5.0,
    reviews: 12,
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: '3 Cuartos', icon: () => <span>🛏️</span>, included: true },
      { name: '3 Baños', icon: () => <span>🚿</span>, included: true },
      { name: 'Capitán y asistente', icon: CheckCircle, included: true },
      { name: '30 kilos de hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Guía a bordo', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Seguro de viaje', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 9 }, (_, i) => `/images/transporte/Yate-55-pies/gallery-${i + 1}.jpg`),
    heroImage: '/images/transporte/Yate-55-pies/hero.jpg',
    emoji: '🛥️',
    category: 'yate'
  },
  'bote-10-personas': {
    slug: 'bote-10-personas',
    name: 'Bote 10 Personas',
    type: 'bote',
    description: 'Bote cómodo y seguro para grupos pequeños. Ideal para traslados rápidos entre Cartagena y las islas del Rosario con máxima seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.7,
    reviews: 45,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Guía a bordo', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/bote-10-personas/${i + 1}.jpg`),
    heroImage: '/images/transporte/bote-10-personas.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'vite-42-pies': {
    slug: 'vite-42-pies',
    name: 'Vite 42 Pies - 26 Pax',
    type: 'bote',
    description: 'ESLORA: 42 pies, MOTORES: 2 Yamaha 300 HP. Equipado con asoleadoras en proa, ducha de agua dulce, sanitario interno, escaleras para bajar al mar y nevera para hielo.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.8,
    reviews: 34,
    capacity: 28,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Equipo de música', icon: Music, included: true },
      { name: 'Asoleadoras en proa', icon: () => <span>☀️</span>, included: true },
      { name: 'Ducha de agua dulce', icon: ShowerHead, included: true },
      { name: 'Sanitario interno', icon: () => <span>🚽</span>, included: true },
      { name: 'Escaleras para bajar al mar', icon: Anchor, included: true },
      { name: 'Nevera para hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/vite-42-pies/gallery-${i + 1}.jpg`),
    heroImage: '/images/transporte/vite-42-pies.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'bahaire-29-pies': {
    slug: 'bahaire-29-pies',
    name: 'Bahaire 29 Pies',
    type: 'bote',
    description: 'Bote ágil y confiable para experiencias en el mar. Equipado con sistema de sonido y chalecos de seguridad para máxima tranquilidad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.6,
    reviews: 28,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Equipo de música', icon: Music, included: true },
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/bahaire-29-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/Bahaire.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'galea-38-pies': {
    slug: 'galea-38-pies',
    name: 'Galea 38 Pies',
    type: 'bote',
    description: 'Bote espacioso con sistema de sonido integrado. Perfecto para paseos grupales con música y diversión en el Caribe.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.7,
    reviews: 31,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/galea-38-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/galea.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'le-marie-33-pies': {
    slug: 'le-marie-33-pies',
    name: 'Bote 33 Pies Le Marie',
    type: 'bote',
    description: 'Bote elegante y cómodo para experiencias memorables en el mar Caribe. Equipado para la diversión y seguridad de todos los pasajeros.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.8,
    reviews: 22,
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/transporte/le-marie-33-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/le-marie.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'chichi-ii': {
    slug: 'chichi-ii',
    name: 'Chichi II',
    type: 'bote',
    description: 'Bote confiable con sistema de sonido. Ideal para grupos pequeños que buscan diversión y seguridad en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por acordar',
    rating: 4.6,
    reviews: 19,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/chichi/${i + 1}.jpg`),
    heroImage: '/images/transporte/chichi.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'leroy-29-pies': {
    slug: 'leroy-29-pies',
    name: 'Bote Leroy 29 Pies',
    type: 'bote',
    description: 'Bote equipado con sistema de sonido y chalecos de seguridad. Experiencia segura y divertida para grupos pequeños.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'por Acordar',
    rating: 4.9,
    reviews: 15,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/leroi-29-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/leroi.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'sea-girl': {
    slug: 'sea-girl',
    name: 'Bote Sea Girl 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y cómodo. Perfecto para grupos medianos que buscan explorar el Caribe con estilo y seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.7,
    reviews: 26,
    capacity: 20,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/transporte/sea-girl/${i + 1}.jpg`),
    heroImage: '/images/transporte/sea-girl.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'la-realeza-2': {
    slug: 'la-realeza-2',
    name: 'La Realeza 2 - 29 Pies',
    type: 'bote',
    description: 'Bote 29 pies elegante y funcional. Ideal para experiencias privadas en el mar con comodidad y seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 18,
    capacity: 12,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/la-realeza-2/${i + 1}.jpg`),
    heroImage: '/images/transporte/la-realeza-2.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'bahaire-lujo': {
    slug: 'bahaire-lujo',
    name: 'Bahaire 29 Pies - Lujo',
    type: 'bote',
    description: 'Bote 29 pies con 2 motores 115 HP. Incluye sonido profesional Bluetooth, tripulación, bolsa de hielo (13 kilos) y gasolina.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.9,
    reviews: 21,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido profesional', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Tripulación', icon: CheckCircle, included: true },
      { name: 'Bolsa de hielo (13 kg)', icon: () => <span>🧊</span>, included: true },
      { name: 'Gasolina incluida', icon: () => <span>⛽</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/bahaire-29-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/bahaire.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'don-bruno': {
    slug: 'don-bruno',
    name: 'Bote Don Bruno 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y bien equipado. Perfecto para grupos que buscan comodidad y seguridad en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.7,
    reviews: 24,
    capacity: 20,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/don-bruno/${i + 1}.jpg`),
    heroImage: '/images/transporte/don-bruno.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'shamma': {
    slug: 'shamma',
    name: 'Bote Shamma 33 Pies',
    type: 'bote',
    description: 'Bote 33 pies con 2 motores 200 HP. Incluye baño, tripulación, Bluetooth, bolsa de hielo (13 kilos) y gasolina.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 17,
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Baño', icon: () => <span>🚽</span>, included: true },
      { name: 'Tripulación', icon: CheckCircle, included: true },
      { name: 'Bolsa de hielo (13 kg)', icon: () => <span>🧊</span>, included: true },
      { name: 'Gasolina incluida', icon: () => <span>⛽</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/shamma/${i + 1}.jpg`),
    heroImage: '/images/transporte/shamma.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'bote-30-pies': {
    slug: 'bote-30-pies',
    name: 'Bote 30 Pies',
    type: 'bote',
    description: 'Bote 30 pies con 2 motores 200 HP. Equipado con sonido Bluetooth para máxima diversión en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.6,
    reviews: 29,
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/transporte/bote-30-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/bote-30-pies.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'bote-onlyfans': {
    slug: 'bote-onlyfans',
    name: 'Bote OnlyFans 35 Pies',
    type: 'bote-premium',
    description: 'Bote 35 pies con 2 Suzuki 200 HP. Sonido JL Audio Marine profesional con Bluetooth, 10 parlantes, 2 balas, 9 bajos, 6 plantas, asoleadoras, baño, ducha, inversor 110V 3000W.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 5.0,
    reviews: 14,
    capacity: 15,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sonido JL Audio Marine profesional', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: '10 parlantes, 2 balas, 9 bajos, 6 plantas', icon: Music, included: true },
      { name: 'Asoleadoras en proa y consola', icon: () => <span>☀️</span>, included: true },
      { name: 'Baño en consola central', icon: () => <span>🚽</span>, included: true },
      { name: 'Ducha de agua dulce', icon: ShowerHead, included: true },
      { name: 'Inversor 110V 3000W', icon: () => <span>⚡</span>, included: true },
      { name: 'Escaleras para bajar al mar', icon: Anchor, included: true },
      { name: 'Nevera para hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Pólizas de seguro para pasajeros', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 10 }, (_, i) => `/images/transporte/bote-onlyfans/${i + 1}.jpg`),
    heroImage: '/images/transporte/bote-onlyfans.jpg',
    emoji: '🚤',
    category: 'bote-premium'
  },
  'bote-46-pies': {
    slug: 'bote-46-pies',
    name: 'Bote 46 Pies',
    type: 'bote',
    description: 'Bote 46 pies con 2 motores 200 HP. Capacidad para grupos grandes con sonido Bluetooth y máxima seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 20,
    capacity: 35,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/transporte/bote-46-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/bote-46-pies.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'lancha-0es3': {
    slug: 'lancha-0es3',
    name: 'Lancha Cero Estrés 42 Pies',
    type: 'bote-premium',
    description: 'Lancha deportiva 42 pies. Diversión garantizada con sistema de sonido Bluetooth y comodidad premium para grupos.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.9,
    reviews: 16,
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 8 }, (_, i) => `/images/transporte/lancha-0es3/${i + 1}.jpg`),
    heroImage: '/images/transporte/lancha-0es3.jpg',
    emoji: '🚤',
    category: 'bote-premium'
  },
  'fisher-price-30-pies': {
    slug: 'fisher-price-30-pies',
    name: 'Bote Fisher Price 30 Pies',
    type: 'bote',
    description: 'Bote 30 pies con 2 motores Mercury 150. Ducha de agua dulce, cojinería nueva, asoleadores en proa, enfriador con hielo.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.7,
    reviews: 23,
    capacity: 10,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Ducha de agua dulce', icon: ShowerHead, included: true },
      { name: 'Cojinería nueva', icon: () => <span>🛋️</span>, included: true },
      { name: 'Asoleadores en proa', icon: () => <span>☀️</span>, included: true },
      { name: 'Enfriador con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 11 }, (_, i) => `/images/transporte/bote-fisher-price-30-pies/${i + 1}.jpg`),
    heroImage: '/images/transporte/bote-fisher-price-30-pies.jpg',
    emoji: '🚤',
    category: 'bote'
  },
  'malokini-42-pies': {
    slug: 'malokini-42-pies',
    name: 'Bote Malokini 42 Pies',
    type: 'bote',
    description: 'Bote 42 pies espacioso y bien equipado. Perfecto para grupos que buscan explorar el Caribe con estilo y seguridad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 19,
    capacity: 18,
    duration: '9:00 AM - 4:00 PM',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Sistema de sonido', icon: Music, included: true },
      { name: 'Bluetooth', icon: () => <span>📱</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/transporte/malokini/${i + 1}.jpg`),
    heroImage: '/images/transporte/malokini.jpg',
    emoji: '🚤',
    category: 'bote'
  },
    // ==================== CATAMARANES ====================
  'catamaran-moana-lounge': {
    slug: 'catamaran-moana-lounge',
    name: 'Catamarán Moana Lounge',
    type: 'catamaran',
    description: 'CATAMARÁN MOANA Lounge. Capacidad para 45 personas con pista de baile, cocina, energía 110V y tripulación completa. Ideal para eventos y celebraciones.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 5.0,
    reviews: 32,
    capacity: 45,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Pista de baile', icon: () => <span>💃</span>, included: true },
      { name: '1 Baño', icon: () => <span>🚽</span>, included: true },
      { name: 'Cocina', icon: () => <span>🍳</span>, included: true },
      { name: 'Energía 110V', icon: () => <span>⚡</span>, included: true },
      { name: 'Sistema sonido Bluetooth', icon: Music, included: true },
      { name: 'Tripulación (Capitán y asistentes)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/catamaran-moana-longe/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-moana-longe.jpg',
    emoji: '⛵',
    category: 'catamaran-eventos'
  },
  'catamaran-armonia': {
    slug: 'catamaran-armonia',
    name: 'Catamarán Armonía',
    type: 'catamaran',
    description: 'Catamaran Armonia con 3 habitaciones, aire acondicionado, 2 baños, sistema sonido Bluetooth, cocina y ducha. Perfecto para grupos que buscan comodidad.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.9,
    reviews: 27,
    capacity: 16,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)',
      'Tampoco incluye zarpe desde el muelle'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/transporte/catamaran-armonia/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-armonia.jpg',
    emoji: '⛵',
    category: 'catamaran'
  },
  'powercat-43': {
    slug: 'powercat-43',
    name: 'Catamarán Powercat 43',
    type: 'catamaran',
    description: 'Catamaran powercat 43 con 3 habitaciones, aire acondicionado, 1 baño, sistema sonido Bluetooth, cocina y ducha. Experiencia premium en el mar.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 21,
    capacity: 25,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 5 }, (_, i) => `/images/transporte/catamaran-powercat/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-powercat.jpg',
    emoji: '⛵',
    category: 'catamaran'
  },
  'lagoon-44': {
    slug: 'lagoon-44',
    name: 'Catamarán Lagoon 44',
    type: 'catamaran',
    description: 'Catamaran Lagoon 44 con 4 habitaciones, aire acondicionado, 2 baños, sistema sonido Bluetooth, cocina y ducha. Espacio y confort garantizados.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.9,
    reviews: 25,
    capacity: 23,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/catamaran-lagoon-44/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-lagoon-44.jpg',
    emoji: '⛵',
    category: 'catamaran'
  },
  'powercat-47': {
    slug: 'powercat-47',
    name: 'Catamarán Powercat 47',
    type: 'catamaran',
    description: 'Catamaran powercat 47 con 4 habitaciones, aire acondicionado, 1 baño, sistema sonido Bluetooth, cocina y ducha. Ideal para grupos grandes.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 4.8,
    reviews: 18,
    capacity: 35,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/catamaran-powercat-47/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-powercat-47.jpg',
    emoji: '⛵',
    category: 'catamaran'
  },
  'supercat-65': {
    slug: 'supercat-65',
    name: 'Catamarán Supercat 65',
    type: 'catamaran',
    description: 'Catamaran supercat 65 con 3 habitaciones, aire acondicionado, 2 baños, sistema sonido Bluetooth, cocina y ducha. Capacidad para 56 personas.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 5.0,
    reviews: 29,
    capacity: 56,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/transporte/catamaran-supercat-65/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-supercat-65.jpg',
    emoji: '⛵',
    category: 'catamaran-eventos'
  },
  'catamaran-san-juan': {
    slug: 'catamaran-san-juan',
    name: 'Catamarán San Juan',
    type: 'catamaran',
    description: 'Catamaran san juan con 1 camerino, aire acondicionado, 6 baños, sistema sonido Bluetooth, cocina industrial, bar y pista de baile. ¡Para eventos masivos!',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 5.0,
    reviews: 41,
    capacity: 150,
    duration: 'Por definir',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (Capitán y asistente)', icon: CheckCircle, included: true },
      { name: 'Cooler con hielo', icon: () => <span>🧊</span>, included: true },
      { name: 'Botellas de agua', icon: () => <span>💧</span>, included: true },
      { name: 'Equipos de Snorkeling', icon: () => <span>🤿</span>, included: true },
      { name: 'Toallas', icon: () => <span>🏖️</span>, included: true },
      { name: 'Seguros', icon: CheckCircle, included: true },
      { name: 'Impuestos', icon: CheckCircle, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Tasas Corpoturismo', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Tasas de impuestos de Corpoturismo NO incluidas (aplica para zarpes desde Muelle La Bodeguita y Pegasos)'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/transporte/catamaran-san-juan/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-san-juan.jpg',
    emoji: '⛵',
    category: 'catamaran-eventos'
  },
  'maxicat-65': {
    slug: 'maxicat-65',
    name: 'Catamarán Maxicat 65',
    type: 'catamaran',
    description: 'Catamaran maxicat 65 PIES con 3 camarotes dobles, aire acondicionado, 2 baños, sonido Bluetooth 1 cabina 1.000W y 1 bajo de 1.000W, 8 salas lounge en proa, pista de baile, decorado estilo coastal nautical, salón con aire acondicionado.',
    location: 'Muelle de La Bodeguita',
    price: 0,
    priceText: 'Por definir',
    rating: 5.0,
    reviews: 38,
    capacity: 80,
    duration: '1-9 horas según destino',
    departure: 'Muelle de La Bodeguita',
    amenities: [
      { name: 'Chalecos salvavidas', icon: CheckCircle, included: true },
      { name: 'Tripulación (capitán + 2 marineros-meseros)', icon: CheckCircle, included: true },
      { name: 'Hielo 6 bolsas de 15 kilos', icon: () => <span>🧊</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: false },
      { name: 'Impuesto de zarpe', icon: () => <span>💵</span>, included: false }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'El valor del impuesto de zarpe NO ESTÁ INCLUIDO (10.000 por persona dentro de la bahía, 20.000 por persona fuera de la Bahía)'
    ],
    images: Array.from({ length: 7 }, (_, i) => `/images/transporte/catamaran-maxicat-65/${i + 1}.jpg`),
    heroImage: '/images/transporte/catamaran-maxicat-65.jpg',
    emoji: '⛵',
    category: 'catamaran-eventos'
  },

  // ==================== TRANSPORTE TERRESTRE ====================
  'party-bus': {
    slug: 'party-bus',
    name: 'Party Bus',
    type: 'bus',
    description: 'Recorrido por la ciudad haciendo 3 paradas: 1) Castillo de San Felipe, 2) Monumento de Zapatos Viejos, 3) Letras de Cartagena. ¡Fiesta sobre ruedas!',
    location: 'Recogida en hotel',
    price: 0,
    priceText: 'Por deinir',
    rating: 4.8,
    reviews: 156,
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    amenities: [
      { name: 'Animación', icon: () => <span>🎉</span>, included: true },
      { name: 'Música crossover', icon: Music, included: true },
      { name: 'Entrada a la discoteca', icon: () => <span>🎵</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: true }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 3 }, (_, i) => `/images/transporte/party-bus/${i + 1}.jpg`),
    heroImage: '/images/transporte/party-bus.jpg',
    emoji: '🚌',
    category: 'terrestre'
  },
  'chiva-rumbera': {
    slug: 'chiva-rumbera',
    name: 'Chiva Rumbera Tradicional',
    type: 'bus',
    description: 'Recorrido tradicional por Cartagena con 3 paradas: 1) Castillo de San Felipe, 2) Monumento de Zapatos Viejos, 3) Letras de Cartagena. ¡Experiencia 100% colombiana!',
    location: 'Recogida en hotel',
    price: 0,
    priceText: 'Por deinir',
    rating: 4.9,
    reviews: 203,
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    amenities: [
      { name: 'Animación', icon: () => <span>🎉</span>, included: true },
      { name: 'Música crossover', icon: Music, included: true },
      { name: 'Entrada a la discoteca', icon: () => <span>🎵</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: true }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Si no desean ingresar a la discoteca serán retornados al hotel'
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/transporte/chiva-rumbera-tradicional/${i + 1}.jpg`),
    heroImage: '/images/transporte/chiva-rumbera-tradicional.jpg',
    emoji: '🚌',
    category: 'terrestre'
  },
  'limo-hummer': {
    slug: 'limo-hummer',
    name: 'Limo Hummer Convertible',
    type: 'limusina',
    description: 'Limusina Hummer convertible con 2 botellas de champagne (V.E) o champiñón cero licor, decoración con globos y serpentinas, sonido semi profesional, copas en cristal, aire acondicionado, juego de luces, conductor uniformado, alfombra roja y sunroof.',
    location: 'Recogida en hotel',
   price: 0,
    priceText: 'Por deinir',
    rating: 5.0,
    reviews: 67,
    capacity: 16,
    duration: '1 hora',
    departure: 'Recogida en puerta del hotel',
    amenities: [
      { name: '2 Botellas de champagne (V.E)', icon: () => <span>🍾</span>, included: true },
      { name: 'Decoración con globos y serpentinas', icon: () => <span>🎈</span>, included: true },
      { name: 'Sonido semi profesional', icon: Music, included: true },
      { name: 'Copas en cristal', icon: () => <span>🥂</span>, included: true },
      { name: 'Aire acondicionado', icon: () => <span>❄️</span>, included: true },
      { name: 'Juego de luces al interior', icon: () => <span>💡</span>, included: true },
      { name: 'Conductor uniformado', icon: () => <span>👔</span>, included: true },
      { name: 'Alfombra roja', icon: () => <span>🔴</span>, included: true },
      { name: 'Sunroof o techo corredizo', icon: () => <span>☀️</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: true }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros'
    ],
    images: Array.from({ length: 4 }, (_, i) => `/images/transporte/limo-hummer/${i + 1}.jpg`),
    heroImage: '/images/transporte/limo-hummer.jpg',
    emoji: '🚗',
    category: 'terrestre-premium'
  },
  'city-tour-discoteca': {
    slug: 'city-tour-discoteca',
    name: 'City Tour Discoteca',
    type: 'bus',
    description: 'Recorrido nocturno por Cartagena con 3 paradas: 1) Castillo de San Felipe, 2) Monumento de Zapatos Viejos, 3) Letras de Cartagena. Animación, música crossover y entrada a discoteca incluida.',
    location: 'Recogida en hotel',
    pprice: 0,
    priceText: 'Por deinir',
    rating: 4.7,
    reviews: 134,
    capacity: 40,
    duration: '2 horas',
    departure: 'Recogida en puerta del hotel',
    amenities: [
      { name: 'Animación', icon: () => <span>🎉</span>, included: true },
      { name: 'Música crossover', icon: Music, included: true },
      { name: 'Entrada a la discoteca', icon: () => <span>🎵</span>, included: true },
      { name: 'Recogida en hotel', icon: () => <span>🚗</span>, included: true }
    ],
    policies: [
      'Confirmación: Inmediata tras pago',
      'Cancelación: Gratis hasta 24 horas antes',
      'Clima: Re-programación gratuita por mal clima',
      'Edad mínima: Niños aceptados con supervisión',
      'Documentación: Identificación requerida para todos los pasajeros',
      'Si no desean ingresar a la discoteca serán retornados al hotel'
    ],
    images: Array.from({ length: 6 }, (_, i) => `/images/transporte/city-tour-discoteca/${i + 1}.jpg`),
    heroImage: '/images/transporte/city-tour-discoteca.jpg',
    emoji: '🚌',
    category: 'terrestre'
  }
};

// Función helper para generar imágenes de fallback
const generateGalleryImages = (basePath: string, count: number) => {
  return Array.from({ length: count }, (_, i) => `${basePath}/${i + 1}.jpg`);
};

export default function TransportDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = transportData[slug];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [passengers, setPassengers] = useState('2');
  
  // ✅ NUEVOS ESTADOS
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">🚤</p>
          <h1 className="text-2xl font-bold text-yamid-palm mb-4">Servicio no encontrado</h1>
          <Link href="/transporte" className="text-yamid-gold hover:underline inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a transporte
          </Link>
        </div>
      </main>
    );
  }

  // ✅ CÁLCULO DINÁMICO DEL TOTAL
  // Nota: Como la mayoría de transportes tienen price: 0 ("Por acordar"), 
  // el cálculo solo mostrará el recargo si hay un precio base definido.
  const priceNum = service.price || 0;
  const passengersNum = parseInt(passengers) || 1;
  const baseTotal = priceNum * passengersNum;
  
  let finalTotal = baseTotal;
  let extraNote = '';

  if (paymentMethod === 'tarjeta') {
    finalTotal = Math.round(baseTotal * 1.05); // +5%
    extraNote = 'Incluye 5% por procesamiento con tarjeta.';
  } else if (paymentMethod === 'transferencia') {
    extraNote = 'Sin costos adicionales.';
  } else {
    extraNote = 'Pago en efectivo el día del servicio.';
  }

  // ✅ Manejar envío de cotización a WhatsApp
  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert('Por favor, escribe tu nombre completo para continuar.');
      return;
    }

    const phoneNumber = '573013547422';
    
    const message = `🚤 *NUEVA COTIZACIÓN - TRANSPORTE* 🚤

 *Datos del Cliente:*
👤 *Nombre:* ${customerName}
📧 *Email:* ${customerEmail || 'No especificado'}
💳 *Pago Preferido:* ${paymentMethod.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━
 *Detalles del Servicio:*
━━━━━━━━━━━━━━━━━━━━
🚢 *Embarcación:* ${service.name}
📍 *Salida:* ${service.departure}
📅 *Fecha:* ${serviceDate || 'Por definir'}
⏰ *Hora:* ${serviceTime || 'Por definir'}
👥 *Pasajeros:* ${passengers}
⏱️ *Duración:* ${service.duration}
💰 *Valor Base:* ${service.priceText}
💵 *TOTAL ESTIMADO:* $${finalTotal.toLocaleString()} COP
${paymentMethod === 'tarjeta' && baseTotal > 0 ? '⚠️ (Incluye recargo 5% tarjeta)' : ''}
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar disponibilidad y recibir cotización completa.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = service.images.map((img: string) => ({
    src: img,
    alt: `${service.name} - Galería`
  }));

  const relatedServices = Object.values(transportData)
    .filter((s: any) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-96">
        <Image 
          src={service.heroImage} 
          alt={service.name}
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
                  <span class="text-9xl opacity-30">${service.emoji}</span>
                </div>
              `;
            }
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.name}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {service.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {service.rating} ({service.reviews} reseñas)
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
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            {/* Detalles Rápidos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Detalles del Servicio</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Users className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{service.capacity} personas</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Clock className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{service.duration}</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <MapPin className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">Salida: {service.departure}</span>
                </div>
                <div className="text-center p-4 bg-yamid-sand rounded-lg">
                  <Star className="w-6 h-6 text-yamid-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">{service.rating} rating</span>
                </div>
              </div>
            </div>

            {/* Galería */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.images.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image 
                      src={img} 
                      alt={`${service.name} - Vista ${index + 1}`}
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
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Incluye / No Incluye</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Incluido
                  </h3>
                  <ul className="space-y-2">
                    {service.amenities.filter((a: any) => a.included).map((amenity: any, index: number) => {
                      const Icon = amenity.icon;
                      return (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          {Icon && typeof Icon === 'function' && <Icon className="w-4 h-4 text-yamid-gold" />}
                          {amenity.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> No incluido
                  </h3>
                  <ul className="space-y-2">
                    {service.amenities.filter((a: any) => !a.included).map((amenity: any, index: number) => {
                      const Icon = amenity.icon;
                      return (
                        <li key={index} className="flex items-center gap-2 text-gray-500">
                          {Icon && typeof Icon === 'function' && <Icon className="w-4 h-4" />}
                          {amenity.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Políticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-yamid-palm mb-4">Políticas</h2>
              <ul className="space-y-3 text-gray-700">
                {service.policies.map((policy: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yamid-gold">•</span>
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna Derecha - Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 border-t-4 border-yamid-gold">
              
              {/* Precio Base (Pequeño, arriba) */}
              <div className="mb-6 text-center">
                <p className="text-gray-500 text-sm">Valor base</p>
                <p className="text-xl font-semibold text-gray-700">{service.priceText}</p>
                {service.price > 0 && (
                  <p className="text-xs text-gray-500 mt-1">* Varía según pasajeros y método de pago</p>
                )}
              </div>

              <form onSubmit={handleReservation} className="space-y-5">
                
                {/* Campos Personales */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombre Completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    placeholder="ejemplo@correo.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Fecha</label>
                    <input 
                      type="date" 
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hora</label>
                    <input 
                      type="time" 
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pasajeros</label>
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
                  >
                    {Array.from({ length: service.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Pasajero' : 'Pasajeros'}</option>
                    ))}
                  </select>
                </div>

                {/* ✅ SECCIÓN DESTACADA: TOTAL + MÉTODO DE PAGO */}
                <div className="bg-yamid-sand/30 p-4 rounded-lg border border-yamid-gold/30 mt-6">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-gray-700 font-medium">Total Estimado:</span>
                    <div className="text-right">
                      <span className="block text-3xl font-bold text-yamid-palm">
                        ${finalTotal.toLocaleString()} COP
                      </span>
                      <span className="text-xs text-gray-500 block h-4">
                        {extraNote}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800">Método de Pago:</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold font-medium cursor-pointer shadow-sm"
                    >
                      <option value="efectivo">💵 Efectivo (Sin recargo)</option>
                      <option value="transferencia">🏦 Transferencia (Sin recargo)</option>
                      <option value="tarjeta">💳 Tarjeta de Crédito (+5%)</option>
                    </select>
                    
                    {/* Alerta Visual Dinámica */}
                    {paymentMethod === 'tarjeta' && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-yellow-800 bg-yellow-100 p-2 rounded border border-yellow-200">
                        <span className="font-bold">⚠️ Nota:</span>
                        El valor total ya incluye el 5% adicional por comisiones bancarias.
                      </div>
                    )}
                  </div>
                </div>
                {/* ✅ FIN SECCIÓN DESTACADA */}

                <button 
                  type="submit" 
                  className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Cotizar por WhatsApp</span>
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
                🔒 Tus datos están seguros. Serás redirigido a WhatsApp.
              </div>
            </div>
          </div>

        </div>

        {/* Servicios Relacionados */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-yamid-palm mb-6">Servicios Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((related: any) => (
                <Link 
                  key={related.slug}
                  href={`/transporte/${related.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 bg-yamid-ocean">
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
                    <p className="text-sm text-gray-600">{related.departure}</p>
                    <p className="text-yamid-gold font-bold mt-2">{related.priceText}</p>
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