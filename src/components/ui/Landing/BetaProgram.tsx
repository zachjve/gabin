'use client'

import React from 'react';
import Button from '../Button';
import Card from '../Card';

export default function BetaProgram() {

  return (
    <section className="py-24 bg-[var(--foreground)]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez notre early access
          </h2>
          <p className="text-md text-[var(--foreground-muted)] mb-6">
            Nous sommes en phase de développement et recherchons des architectes, promoteurs et professionnels de l'immobilier pour tester gratuitement notre solution.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Card variant="full" color="var(--terracotta)" className="shadow-sm p-4">
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-8 text-white">
                Avantages pour nos early-testeurs
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <p className="text-lg text-white">Accès gratuit à la plateforme pendant toute la durée du early access</p>
                </li>

                <li className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <p className="text-lg text-white">Accès prioritaire à la plateforme avant son lancement officiel</p>
                </li>
                
                <li className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <p className="text-lg text-white">Influence directe sur le développement des fonctionnalités</p>
                </li>
                
                <li className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <p className="text-lg text-white">Tarif préférentiel lors du lancement officiel</p>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            variant="primary" 
            href="/beta-program"
            className="mx-auto text-lg px-8 py-3"
          >
            Early Access
          </Button>
        </div>
      </div>
    </section>
  );
}