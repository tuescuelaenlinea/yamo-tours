'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/logo.svg" 
              alt="YAMO Tours Logo" 
              width={60} 
              height={60}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-yamid-palm">YAMO Tours</h1>
              <p className="text-xs text-yamid-gold-dark">Tu aventura en el Caribe</p>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/destinos" className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium">
              Destinos
            </Link>
            <Link href="/tours" className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium">
              Tours
            </Link>
           {/* <Link href="/casas" className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium">
              Casas
            </Link>*/}
            <Link href="/contacto" className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium">
              Contacto
            </Link>
          </nav>

          {/* Botón Reserva Desktop */}
          <button className="hidden md:block bg-yamid-gold hover:bg-yamid-goldDark text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Reservar Ahora
          </button>

          {/* Botón Hamburguesa Móvil */}
          <button 
            className="md:hidden text-yamid-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú Móvil */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium px-4"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/destinos" 
                className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium px-4"
                onClick={() => setMenuOpen(false)}
              >
                Destinos
              </Link>
              <Link 
                href="/tours" 
                className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium px-4"
                onClick={() => setMenuOpen(false)}
              >
                Tours
              </Link>
              <Link 
                href="/casas" 
                className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium px-4"
                onClick={() => setMenuOpen(false)}
              >
                Casas
              </Link>
              <Link 
                href="/contacto" 
                className="text-yamid-dark hover:text-yamid-gold transition-colors font-medium px-4"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
              <button className="bg-yamid-gold hover:bg-yamid-goldDark text-white px-6 py-3 rounded-lg font-semibold transition-colors mx-4">
                Reservar Ahora
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}