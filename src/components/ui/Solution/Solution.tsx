'use client'

import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import Tabs from '../Tabs';
import Card from '../Card';

export default function Solution() {
  const steps = [
    {
      id: 'step1',
      label: 'Localiser',
      number: '1',
      title: "Localisez votre projet",
      description: "Entrez simplement l'adresse de votre projet immobilier. Gabin localise automatiquement la parcelle cadastrale et affiche les zones PLU correspondantes sur une carte interactive.",
      imagePlaceholder: "Carte interactive avec visualisation de parcelle",
      color: "var(--terracotta)",
      tabColor: "var(--terracotta)"
    },
    {
      id: 'step2',
      label: 'Découvrir',
      number: '2',
      title: "Collecte automatique des documents",
      description: "Gabin recherche et rassemble automatiquement tous les documents d'urbanisme pertinents : PLU, prescriptions spéciales, servitudes et règlements applicables à votre parcelle.",
      imagePlaceholder: "Documents collectés automatiquement",
      color: "var(--bleu-ardoise)",
      tabColor: "var(--bleu-ardoise)"
    },
    {
      id: 'step3',
      label: 'Vérifier',
      number: '3',
      title: "Vérifiez les sources",
      description: "Consultez les documents originaux et assurez-vous de la fiabilité des informations. Gabin vous permet d'accéder directement aux sources officielles pour une transparence totale.",
      imagePlaceholder: "Vérification des sources et documents",
      color: "var(--vert-olive)",
      tabColor: "var(--vert-olive)"
    },
    {
      id: 'step4',
      label: 'Analyser',
      number: '4',
      title: "Analysez avec Gabin, votre assistant",
      description: "Posez directement vos questions à Gabin : \"Quelle hauteur maximale est autorisée ?\", \"Puis-je construire en limite de propriété ?\". Notre IA vous guide à travers les règles d'urbanisme propres à votre projet.",
      imagePlaceholder: "Conversation avec l'assistant",
      color: "var(--ocre)",
      tabColor: "var(--ocre)"
    },
    {
      id: 'step5',
      label: 'Partager',
      number: '5',
      title: "Partagez vos analyses",
      description: "Exportez facilement les documents et analyses sous forme de rapport structuré. Partagez-les avec tous les intervenants de votre projet pour faciliter la prise de décision collective.",
      imagePlaceholder: "Partage de documents et rapports",
      color: "var(--mauve-terracotta)",
      tabColor: "var(--mauve-terracotta)"
    }
  ];

  const [activeStep, setActiveStep] = useState(steps[0].id);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const currentIndex = steps.findIndex(s => s.id === activeStep);

  const navigateStep = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, steps.length - 1)
      : Math.max(currentIndex - 1, 0);
    setActiveStep(steps[newIndex].id);
  };

  // Gestion de l'autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (!autoplayPaused) {
        autoplayTimer.current = setInterval(() => {
          const currentIndex = steps.findIndex(s => s.id === activeStep);
          const nextIndex = (currentIndex + 1) % steps.length;
          setActiveStep(steps[nextIndex].id);
        }, 8000); // Change toutes les 8 secondes
      }
    };

    startAutoplay();

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [activeStep, autoplayPaused, steps]);

  // Pause l'autoplay lors de l'interaction utilisateur
  const handleUserInteraction = () => {
    setAutoplayPaused(true);
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    // Reprend l'autoplay après 10 secondes d'inactivité
    setTimeout(() => setAutoplayPaused(false), 15000);
  };

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateStep('prev');
      if (e.key === 'ArrowRight') navigateStep('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Gestion du swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) { // Seuil minimum pour le swipe
      if (diff > 0) navigateStep('next');
      else navigateStep('prev');
    }
  };

  return (
    <div className="bg-[var(--background)]"
         onMouseEnter={handleUserInteraction}
         onClick={handleUserInteraction}
         onTouchStart={handleUserInteraction}>
      {/* Tabs fixes en haut */}
      <div className="bg-[var(--background)] py-4">
        <div className="container mx-auto px-4">
          <Tabs 
            tabs={steps.map(step => ({ 
              id: step.id, 
              label: step.label,
              color: step.tabColor
            }))}
            activeTab={activeStep}
            onChange={setActiveStep}
            className="justify-center"
          />
        </div>
      </div>

      {/* Contenu avec navigation */}
      <div className="relative overflow-hidden py-16 bg-[var(--foreground)]/5">
        {/* Conteneur avec support du swipe */}
        <div 
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {steps.map((step, index) => (
            <div key={step.id} className="w-screen flex-shrink-0 px-4 md:px-8">
              <div className="max-w-7xl mx-auto w-full">
                <Card variant="full" color={step.color}>
                  <div className="grid md:grid-cols-2 gap-16 items-center p-8">
                    {/* Texte - toujours à gauche */}
                    <div className="flex flex-col space-y-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-white/10 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {step.number}
                        </div>
                        <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                      </div>
                      
                      <p className="text-xl text-white/90">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Zone d'illustration - toujours à droite */}
                    <div className="h-[500px] bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="relative z-10 flex items-center justify-center h-full p-8">
                        <div className="text-center text-white/60">
                          <div className="mb-4 flex justify-center">
                            {/* ... existing icon code ... */}
                          </div>
                          <p>{step.imagePlaceholder}</p>
                          <p className="text-sm mt-4">[Espace réservé pour l'illustration]</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de progression */}
        <div className="flex justify-center mt-8 gap-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-[var(--primary)]' 
                  : 'w-2 bg-[var(--primary)]/30 hover:bg-[var(--primary)]/50'
              }`}
              aria-label={`Aller à l'étape ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}