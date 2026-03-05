'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Reemplaza con tu número real de WhatsApp
  const phoneNumber = '+57 301 3547422';
  const message = 'Hola YAMID Tours, quiero información sobre un tour';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Botón Flotante */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
        style={{
          animation: 'bounce 2s infinite'
        }}
      >
        {/* Efecto de onda/ping */}
        <span 
          className="absolute inset-0 rounded-full bg-green-500"
          style={{
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        ></span>
        
        {/* Ícono */}
        <MessageCircle className="w-7 h-7 relative z-10" />
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium z-50">
            ¡Escríbenos!
            <div 
              className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"
            ></div>
          </div>
        )}
      </button>

      {/* Animaciones personalizadas */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}