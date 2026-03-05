'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// ✅ Ícono personalizado de WhatsApp (SVG)
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: 'informacion',
    mensaje: '',
    tourInteres: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario a WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.telefono || !formData.mensaje) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    // Tu número de WhatsApp
    const phoneNumber = '+573013547422'; // ← Cambia por tu número real

    // Crear mensaje formateado
    const message = `🌴 *NUEVO MENSAJE - YAMID Tours* 🌴

📋 *Datos del Cliente:*
━━━━━━━━━━━━━━━━━━━━
📛 *Nombre:* ${formData.nombre}
📧 *Email:* ${formData.email || 'No especificado'}
📱 *WhatsApp:* ${formData.telefono}
━━━━━━━━━━━━━━━━━━━━

💬 *Consulta:*
━━━━━━━━━━━━━━━━━━━━
📝 *Asunto:* ${formData.asunto}
🏝️ *Tour de interés:* ${formData.tourInteres || 'No especificado'}
━━━━━━━━━━━━━━━━━━━━

${formData.mensaje}

━━━━━━━━━━━━━━━━━━━━
*Enviado desde el sitio web*`;

    // Abrir WhatsApp
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    setFormStatus('success');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: 'informacion',
      mensaje: '',
      tourInteres: ''
    });
    
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  // Información de contacto
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono / WhatsApp',
      value: '+57 301 3547422',
      href: 'https://wa.me/573013547422',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      value: 'info@yamidtours.com',
      href: 'mailto:info@yamidtours.com',
      color: 'bg-yamid-gold'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Cartagena, Colombia',
      href: 'https://maps.google.com/?q=Cartagena,Colombia',
      color: 'bg-yamid-palm'
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      value: 'Lun - Dom: 8:00 AM - 8:00 PM',
      href: '#',
      color: 'bg-yamid-ocean'
    }
  ];

  // Tours populares para seleccionar
  const popularTours = [
    { slug: 'Bora-Bora', name: 'Bora Bora Beach Club' },
    { slug: 'makani', name: 'Makani Beach Club' },
    { slug: 'sibarita', name: 'Cena Sibarita Master' },
    { slug: 'islas-del-rosario', name: 'Islas del Rosario' },
    { slug: 'playa-blanca', name: 'Playa Blanca - Barú' },
    { slug: 'volcan-totumo', name: 'Volcán del Totumo' }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yamid-palm to-yamid-gold py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Contáctanos 📞
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            ¿Tienes preguntas? Estamos aquí para ayudarte a planear tu próxima aventura
          </p>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className={`${info.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{info.title}</h3>
                <p className="text-yamid-palm font-bold group-hover:text-yamid-gold transition-colors">
                  {info.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario y Mapa */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Formulario de Contacto */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-yamid-palm mb-2">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y te responderemos lo antes posible
              </p>

              {/* Mensajes de estado */}
              {formStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>¡Mensaje enviado! Te redirigiremos a WhatsApp.</span>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Por favor completa los campos obligatorios.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all"
                  />
                </div>

                {/* Email y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      WhatsApp / Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+57 300 123 4567"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Asunto
                  </label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all"
                  >
                    <option value="informacion">Información General</option>
                    <option value="reserva">Reserva de Tour</option>
                    <option value="cotizacion">Cotización Grupo</option>
                    <option value="queja">Queja o Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Tour de Interés */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Tour de Interés (Opcional)
                  </label>
                  <select
                    name="tourInteres"
                    value={formData.tourInteres}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all"
                  >
                    <option value="">Selecciona un tour...</option>
                    {popularTours.map(tour => (
                      <option key={tour.slug} value={tour.slug}>{tour.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos más sobre lo que necesitas..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yamid-gold focus:ring-2 focus:ring-yamid-gold/20 transition-all resize-none"
                  />
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  className="w-full bg-yamid-gold hover:bg-yamid-goldDark text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar por WhatsApp</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  🔒 Tus datos están seguros. Serás redirigido a WhatsApp para enviar el mensaje.
                </p>
              </form>
            </div>

            {/* Mapa y Redes Sociales */}
            <div className="space-y-8">
              {/* Mapa */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-80 relative bg-yamid-sand">
                  {/* Placeholder del mapa */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yamid-ocean to-yamid-gold">
                    <div className="text-center text-white">
                      <MapPin className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-bold">Cartagena, Colombia</p>
                      <p className="text-sm opacity-80">Próximamente: Mapa interactivo</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-yamid-palm mb-2">
                    Nuestra Ubicación
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Operamos tours en Cartagena y sus alrededores. Recogida disponible en hoteles del centro histórico, Bocagrande y Castillogrande.
                  </p>
                  <Link 
                    href="https://maps.google.com/?q=Cartagena,Colombia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yamid-gold font-semibold hover:underline inline-flex items-center"
                  >
                    Abrir en Google Maps
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-yamid-palm mb-4">
                  Síguenos en Redes Sociales
                </h3>
                <p className="text-gray-600 mb-6">
                  Mantente actualizado con nuestras últimas ofertas, fotos y experiencias
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/yamidtours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com/yamidtours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://wa.me/573001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <WhatsappIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-yamid-sand rounded-2xl p-8">
                <h3 className="text-xl font-bold text-yamid-palm mb-4">
                  ❓ Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  <details className="group bg-white rounded-lg p-4 cursor-pointer">
                    <summary className="font-semibold text-yamid-palm flex items-center justify-between">
                      ¿Necesito reservar con anticipación?
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Recomendamos reservar con al menos 24 horas de anticipación, especialmente en temporada alta.
                    </p>
                  </details>
                  <details className="group bg-white rounded-lg p-4 cursor-pointer">
                    <summary className="font-semibold text-yamid-palm flex items-center justify-between">
                      ¿Qué métodos de pago aceptan?
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Aceptamos efectivo, transferencia bancaria, y tarjetas de crédito/débito.
                    </p>
                  </details>
                  <details className="group bg-white rounded-lg p-4 cursor-pointer">
                    <summary className="font-semibold text-yamid-palm flex items-center justify-between">
                      ¿Hay recogida en el hotel?
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Sí, ofrecemos recogida gratuita en hoteles del centro histórico, Bocagrande y Castillogrande.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-yamid-palm to-yamid-gold py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para vivir una experiencia inolvidable?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Contáctanos hoy y recibe un 10% de descuento en tu primera reserva
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-yamid-palm hover:bg-yamid-sand px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 inline-flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat en WhatsApp
            </Link>
            <Link
              href="/tours"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-bold transition-all"
            >
              Ver Tours Disponibles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}