// components/TourDetailClient.tsx
'use client';  // ✅ Aquí SÍ va 'use client'

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ✅ Sub-componente: Galería con Lightbox
export function Gallery({ images, tourName }: { images: string[], tourName: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = images.map((img) => ({ src: img, alt: `${tourName} - Galería` }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image 
              src={img} 
              alt={`${tourName} - Vista ${index + 1}`}
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-yamid-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={photos}
        index={currentImageIndex}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ showToggle: true }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}

// ✅ Sub-componente: Formulario de Reserva
export function ReservationForm({ tour }: { tour: any }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const people = (document.getElementById('people') as HTMLSelectElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    
    const yourNumber = '573013547422'; // ✅ Tu número real (sin espacios)
    const total = tour.price * parseInt(people);
    
    const message = `🌴 *NUEVA RESERVA - YAMID Tours* 🌴

📋 *Detalles de la Reserva:*
━━━━━━━━━━━━━━━━━━━━
🏝️ *Tour:* ${tour.name}
📅 *Fecha:* ${date}
👥 *Personas:* ${people}
💰 *Precio por persona:* $${tour.price.toLocaleString()} COP
💵 *Total estimado:* $${total.toLocaleString()} COP
━━━━━━━━━━━━━━━━━━━━

👤 *Datos del Cliente:*
━━━━━━━━━━━━━━━━━━━━
📛 *Nombre:* ${name}
📱 *WhatsApp:* ${phone}
━━━━━━━━━━━━━━━━━━━━

✅ Quiero confirmar esta reserva. ¿Me indican los pasos para el pago?`;

    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  const handleConsult = () => {
    const yourNumber = '573013547422';
    const message = `Hola YAMID Tours 👋

Tengo una consulta sobre el tour:
🏝️ *${tour.name}*

¿Me pueden brindar más información?`;
    
    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Precio por persona</p>
        <p className="text-3xl font-bold text-yamid-palm">${tour.price.toLocaleString()} COP</p>
      </div>

      {formStatus === 'success' && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✅ ¡Redirigiendo a WhatsApp!
        </div>
      )}

      <form onSubmit={handleReservation} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Fecha</label>
          <input 
            type="date" 
            id="date"
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Personas</label>
          <select 
            id="people"
            required
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
          <input 
            type="text" 
            id="name"
            placeholder="Tu nombre completo"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">WhatsApp</label>
          <input 
            type="tel" 
            id="phone"
            placeholder="+57 300 123 4567"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold"
          />
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
          onClick={handleConsult}
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
  );
}

// ✅ Export default vacío (este archivo se usa por sub-componentes)
export default function TourDetailClient() {
  return null;
}