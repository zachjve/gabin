'use client'

import React from 'react';
import Button from '../Button';

export default function ContactCTA() {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Des questions ? Contactez-nous
          </h2>
          
          <p className="text-md text-[var(--foreground-muted)] mb-10 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions concernant Gabin.
          </p>
          
          <Button 
            variant="outline" 
            href="/contact"
            className="mx-auto text-lg px-8 py-3"
          >
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  );
} 