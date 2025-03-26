'use client'

import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--foreground)]/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-[var(--primary)]">Gabin</h2>
            </Link>
            <p className="text-sm text-[var(--foreground-muted)] mb-6 max-w-md">
              Gabin simplifie l'analyse des règles d'urbanisme pour les architectes, promoteurs et professionnels de l'immobilier.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solution" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Solution
                </Link>
              </li>
              <li>
                <Link href="/beta-program" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Early Access
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Légal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-[var(--foreground-muted)] text-sm hover:text-[var(--terracotta)] transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Barre de copyright */}
        <div className="border-t border-[var(--foreground)]/10 mt-12 pt-6 text-center text-sm text-[var(--foreground-muted)]">
          <p>© {currentYear} Gabin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
} 