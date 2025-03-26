'use client'

import Button from "../Button";
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToFeatureVerbs = () => {
    const featureVerbsSection = document.querySelector('#feature-verbs');
    if (featureVerbsSection) {
      featureVerbsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[100vh] flex flex-col">
      {/* Fond avec motif architectural subtil */}
      <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 flex flex-col justify-between h-full py-8 relative z-10">
        {/* Contenu principal centré verticalement */}
        <div className="flex-grow flex items-center mt-16">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Colonne de gauche avec texte */}
            <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[var(--terracotta)]">Gagnez du temps</span> sur vos projets immobiliers.
              </h1>
              
              <p className="text-xl text-[var(--foreground-muted)]">
                Trouvez instantanément tous les documents d'urbanisme applicables à votre parcelle. Vérifiez rapidement la conformité de vos décisions et économisez un temps précieux à chaque étape du projet.
              </p>
              
              <div className="hidden md:block pt-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  href="/solution"
                >
                  Découvrir notre solution
                </Button>
              </div>
            </div>
            
            {/* Bouton visible uniquement sur mobile */}
            <div className="md:hidden flex justify-center">
              <Button 
                variant="outline" 
                size="lg"
                href="/solution"
              >
                Découvrir notre solution
              </Button>
            </div>
          </div>
        </div>
        
        {/* Flèche de défilement en bas */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="sm"
            className="animate-bounce-subtle rounded-full p-2 h-12 w-12"
            onClick={scrollToFeatureVerbs}
            aria-label="Défiler vers les fonctionnalités"
          >
            <ArrowDown size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
} 