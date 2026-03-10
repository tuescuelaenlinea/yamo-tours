import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-yamid-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Información */}
          <div>
            <h3 className="text-2xl font-bold text-yamid-gold mb-4">YAMO TOURS</h3>
            <p className="text-gray-300 mb-4">
              Agencia de turismo • Agencia de viajes • Alquiler de casas de vacaciones
            </p>
            <div className="flex space-x-4">
              {/* Íconos de Redes Sociales */}
              <a href="#" className="w-10 h-10 bg-yamid-gold rounded-full flex items-center justify-center hover:bg-yamid-goldDark transition-colors">
                <span className="text-white font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-yamid-gold rounded-full flex items-center justify-center hover:bg-yamid-goldDark transition-colors">
                <span className="text-white font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-yamid-gold rounded-full flex items-center justify-center hover:bg-yamid-goldDark transition-colors">
                <span className="text-white font-bold">wa</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-bold text-yamid-gold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/destinos" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/transporte" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Transportes
                </Link>
              </li>
              <li>
                <Link href="/hospedaje" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Hospedajes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Destinos Populares */}
          <div>
            <h4 className="text-lg font-bold text-yamid-gold mb-4">Destinos Populares</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/destinos/cartagena" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Cartagena
                </Link>
              </li>
              <li>
                <Link href="/destinos/islas-rosario" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Islas del Rosario
                </Link>
              </li>
              <li>
                <Link href="/destinos/baru" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Playa Blanca - Barú
                </Link>
              </li>
              <li>
                <Link href="/destinos/tierra-bomba" className="text-gray-300 hover:text-yamid-gold transition-colors">
                  Tierra Bomba
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-bold text-yamid-gold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>Cartagena, Colombia</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📞</span>
                <span>+57 301 3547422</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>✉️</span>
                <span>comercial@yamotours.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>⏰</span>
                <span>Abierto hasta las 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 YAMO TOURS. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-yamid-gold transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-yamid-gold transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}