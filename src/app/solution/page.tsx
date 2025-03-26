'use client';

import React from 'react';
import Solution from '@/components/ui/Solution/Solution';
import Button from '@/components/ui/Button';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header transparent={true} />
      {/* En-tête de la page - avec marge supérieure pour tenir compte du header */}
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-md text-[var(--foreground-muted)] mb-8">
            Découvrez comment Gabin simplifie l'accès aux documents d'urbanisme et vous aide à prendre les bonnes décisions pour vos projets immobiliers.
          </p>
        </div>
      </div>
      
      {/* Intégration du composant Solution */}
      <Solution />
      
      {/* Section CTA en bas de page */}
      <div className="bg-[var(--background)] py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à simplifier vos projets d'urbanisme ?</h2>
          <p className="text-md text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels qui gagnent du temps et sécurisent leurs décisions grâce à Gabin.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            href="/beta-program"
          >
            Early access
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 