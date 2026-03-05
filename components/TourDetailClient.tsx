'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { MessageCircle } from 'lucide-react';

interface TourDetailClientProps {
  tour: any;
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const people = (document.getElementById('people') as HTMLSelectElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    
    const yourNumber = '573013547422';
    const total = tour.price * parseInt(people);
    
    const message = `🌴 *NUEVA RESERVA - YAMID Tours* 🌴
📋 *Detalles:* ${tour.name} | 📅 ${date} | 👥 ${people} | 💰 $${total.toLocaleString()} COP
👤 *Cliente:* ${name} | 📱 ${phone}
✅ Quiero confirmar esta reserva.`;

    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConsult = () => {
    const yourNumber = '57301 3547422';
    const message = `Hola YAMID Tours 👋\nTengo una consulta sobre: ${tour.name}`;
    const url = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const photos = tour.images.map((img: string) => ({ src: img, alt: tour.name }));

  return (
    <>
      {/* Formulario de Reserva */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <div className="mb-6">
            <p className="text-gray-500 text-sm">Precio por persona</p>
            <p className="text-3xl font-bold text-yamid-palm">${tour.price.toLocaleString()} COP</p>
          </div>

          <form onSubmit={handleReservation} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Fecha</label>
              <input type="date" id="date" required min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Personas</label>
              <select id="people" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold">
                <option value="1">1 Persona</option>
                <option value="2">2 Personas</option>
                <option value="3">3 Personas</option>
                <option value="4">4 Personas</option>
                <option value="5+">5+ Personas</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
              <input type="text" id="name" placeholder="Tu nombre completo" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">WhatsApp</label>
              <input type="tel" id="phone" placeholder="+57 300 123 4567" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold" />
            </div>
            <button type="submit" className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Reservar por WhatsApp</span>
            </button>
            <button type="button" onClick={handleConsult} className="w-full border-2 border-yamid-gold text-yamid-gold hover:bg-yamid-gold hover:text-white py-3 rounded-lg font-semibold transition-colors">
              Consultar Dudas
            </button>
          </form>
        </div>
      </div>

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
    </>
  );
}