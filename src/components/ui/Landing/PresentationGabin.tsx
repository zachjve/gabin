'use client'

import React from 'react';
import Card from '../Card';

export default function PresentationGabin() {
  // Les deux sections de présentation
  const sections = [
    {
      id: 'recherche',
      title: "Accédez à tous les documents d'urbanisme",
      description: "Trouvez instantanément l'ensemble des documents réglementaires applicables à votre parcelle. Grâce à Gabin, vous pouvez vérifier la source de chaque document et vous assurer de disposer de toutes les informations officielles nécessaires à votre projet.",
      color: "var(--bleu-ardoise)",
      imagePosition: "left" // Image à gauche, texte à droite
    },
    {
      id: 'analyse',
      title: "Interprétez facilement les règles d'urbanisme",
      description: "Posez vos questions directement à Gabin pour comprendre les implications concrètes des règlements pour votre projet. Vous pourrez analyser rapidement les contraintes spécifiques, interpréter les textes complexes et prendre des décisions éclairées en toute confiance.",
      color: "var(--vert-olive)",
      imagePosition: "right" // Image à droite, texte à gauche
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        {/* Titre principal de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Découvrez Gabin
          </h2>
          <p className="text-md text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Votre assistant d'urbanisme intelligent qui simplifie vos recherches documentaires et sécurise vos décisions
          </p>
        </div>

        {/* Les deux sections de présentation */}
        <div className="space-y-24">
          {sections.map((section) => (
            <div key={section.id} className="w-full">
              <Card variant="full" color={section.color}>
                <div className="grid md:grid-cols-2 gap-16 items-center p-8">
                  {/* Zone d'illustration */}
                  <div className={`h-[400px] bg-white/5 rounded-lg overflow-hidden relative ${
                    section.imagePosition === "left" ? "md:order-1" : "md:order-2"
                  }`}>
                    <div className="relative z-10 flex items-center justify-center h-full p-8">
                      <div className="text-center text-white/60">
                        <p>[Y'aura une image]</p>
                        <p className="text-sm mt-4">[Espace réservé pour l'illustration]</p>
                      </div>
                    </div>
                  </div>

                  {/* Texte */}
                  <div className={`flex flex-col space-y-6 ${
                    section.imagePosition === "left" ? "md:order-2" : "md:order-1"
                  }`}>
                    <h3 className="text-3xl font-bold text-white">
                      {section.title}
                    </h3>
                    
                    <p className="text-xl text-white/90">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}