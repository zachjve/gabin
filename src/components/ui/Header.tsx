'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import { Menu, X, ChevronUp } from 'lucide-react';

type HeaderProps = {
  transparent?: boolean;
};

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Gestion de l'affichage du header
      if (currentScrollY > lastScrollY) {
        setHideHeader(true); // Scroll vers le bas -> cache le header
      } else {
        setHideHeader(false); // Scroll vers le haut -> montre le header
      }
      
      // Mise à jour de l'état scrolled
      setScrolled(currentScrollY > 10);
      
      // Affichage du bouton de retour en haut
      setShowScrollTop(currentScrollY > 400);
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Classe de base pour le header - maintenant avec marges
  const headerBaseClass = "fixed top-6 left-6 right-4 z-50 transition-all duration-300 rounded-2xl";
  
  // Classes conditionnelles selon l'état de défilement et la transparence
  const headerClasses = `${headerBaseClass} ${
    scrolled 
      ? "bg-[var(--background)]/40 backdrop-blur-md shadow-md" 
      : transparent 
        ? "bg-transparent" 
        : "bg-[var(--background)]/60 backdrop-blur-sm"
  } transform ${hideHeader ? '-translate-y-32' : 'translate-y-0'}`;
  
  // Définir les couleurs pour les liens et le logo
  const linkColors = [
    'var(--terracotta)',
    'var(--ocre)',
    'var(--vert-olive)',
    'var(--bleu-ardoise)'
  ];
  
  // Définir les couleurs réelles pour le hover
  const defaultColors: Record<string, string> = {
    'var(--terracotta)': '#CA7A5C',
    'var(--ocre)': '#DCB15B',
    'var(--vert-olive)': '#7E8E59',
    'var(--bleu-ardoise)': '#5E7B91',
    'var(--brun-terracotta)': '#966E51'
  };
  
  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo avec lettres colorées */}
            <Link href="/" className="flex items-center">
              <div className="font-bold text-2xl transition-transform duration-300 hover:scale-110">
                Gabin
              </div>
            </Link>
            
            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "/solution", label: "Solution", colorIndex: 0 },
                { href: "/contact", label: "Contact", colorIndex: 2 },
                { href: "/connexion", label: "Se connecter", colorIndex: 3 }
              ].map((item, index) => {
                const colorKey = linkColors[item.colorIndex];
                const actualColor = defaultColors[colorKey] || colorKey;
                
                return (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="px-3 py-2 rounded-md transition-all duration-200 text-[var(--foreground)]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${actualColor}70`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button variant="primary" size="sm" href="/beta-program">
                Early Access
              </Button>
            </nav>
            
            {/* Bouton menu mobile */}
            <button 
              className="md:hidden text-[var(--foreground)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menu mobile avec effet de glissement */}
        <div 
          className={`md:hidden absolute top-16 left-0 right-0 bg-[var(--background)]/90 backdrop-blur-md rounded-b-xl shadow-lg transition-all duration-300 transform ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {[
                { href: "/solution", label: "Solution", colorIndex: 0 },
                { href: "/contact", label: "Contact", colorIndex: 2 },
                { href: "/connexion", label: "Se connecter", colorIndex: 3 }
              ].map((item, index) => {
                const colorKey = linkColors[item.colorIndex];
                const actualColor = defaultColors[colorKey] || colorKey;
                
                return (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="px-3 py-2 rounded-md transition-all duration-200 text-[var(--foreground)]"
                    onClick={() => setMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${actualColor}70`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button 
                variant="primary" 
                size="sm" 
                className="mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Essai gratuit
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Bouton de retour en haut */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[var(--terracotta)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--terracotta)]/80 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
        aria-label="Retour en haut"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
}