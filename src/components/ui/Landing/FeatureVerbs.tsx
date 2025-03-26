'use client'

import React from 'react';
import { MapPin, FileSearch, Check, MessageSquare, Share2 } from 'lucide-react';
import Card from '../Card';

export default function FeatureVerbs() {
  // Définition des couleurs pour chaque carte
  const featureColors = [
    'var(--terracotta)',
    'var(--bleu-ardoise)',
    'var(--vert-olive)',
    'var(--ocre)',
    'var(--mauve-terracotta)'
  ];

  // Données des fonctionnalités
  const features = [
    {
      icon: <MapPin size={20} />,
      title: "Localiser",
      description: "Identifiez instantanément la parcelle et toutes les zones d'urbanisme associées sur une carte interactive."
    },
    {
      icon: <FileSearch size={20} />,
      title: "Découvrir",
      description: "Accédez en un seul clic à tous les documents réglementaires applicables à votre projet."
    },
    {
      icon: <Check size={20} />,
      title: "Vérifier",
      description: "Assurez-vous de n'oublier aucun document et contrôlez les sources originales en toute transparence."
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Analyser",
      description: "Posez directement vos questions à Gabin et obtenez des réponses précises sur les contraintes spécifiques à votre parcelle."
    },
    {
      icon: <Share2 size={20} />,
      title: "Partager",
      description: "Exportez et partagez facilement les documents et analyses avec tous les intervenants de votre projet."
    }
  ];

  return (
    <section id="feature-verbs" className="py-42 bg-[var(--foreground)]/5">
      <div className="container mx-auto px-4">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prenez les bonnes décisions pour
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-[var(--terracotta)]">
            accélérer vos projets
          </p>
        </div>

        {/* Cartes de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              color={featureColors[index % featureColors.length]}
              variant="full"
              className="h-full transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/90">
                  {feature.description.split(' ').map((word, i, arr) => {
                    // Mettre en gras certains segments importants
                    if (
                      (index === 0 && i >= arr.length - 7) || 
                      (index === 1 && (i <= 2 || i >= arr.length - 8)) ||
                      (index === 2 && (i <= 3 || i >= arr.length - 5)) ||
                      (index === 3 && i >= arr.length - 8) ||
                      (index === 4 && i >= arr.length - 6)
                    ) {
                      return <span key={i} className="font-semibold">{word} </span>;
                    }
                    return word + ' ';
                  })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}