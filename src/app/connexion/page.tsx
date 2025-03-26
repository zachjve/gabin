'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Mail, Lock } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function ConnexionPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'envoi de formulaire
    console.log('Tentative de connexion:', formState.email);
    
    // Simulation de connexion réussie (dans une application réelle, ceci serait fait après vérification du serveur)
    setFormStatus({
      success: true,
      message: "Connexion réussie. Vous allez être redirigé vers votre tableau de bord."
    });
    
    // Simulation de redirection (dans une application réelle, on redirigerait vers le tableau de bord)
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header transparent={true} />
      {/* En-tête de la page - avec marge supérieure pour tenir compte du header */}
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-md text-[var(--foreground-muted)] mb-8">
            Connectez-vous à votre compte Gabin pour accéder à votre espace personnel 
            et gérer vos projets.
          </p>
        </div>
      </div>
      
      {/* Section principale avec formulaire de connexion */}
      <div className="container mx-auto px-4 py-8 mb-16">
        <div className="max-w-md mx-auto">
          {/* Formulaire de connexion */}
          <Card className="p-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Connexion</h2>
              
              {formStatus.success && (
                <div className="mb-6 p-4 bg-[var(--vert-olive)]/10 border border-[var(--vert-olive)]/20 rounded-md">
                  <p className="text-[var(--vert-olive)] font-medium">{formStatus.message}</p>
                </div>
              )}
              
              {formStatus.success === false && (
                <div className="mb-6 p-4 bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/20 rounded-md">
                  <p className="text-[var(--terracotta)] font-medium">{formStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formState.email}
                    onChange={handleChange}
                    icon={<Mail size={18} />}
                    required
                  />
                  
                  <Input
                    label="Mot de passe"
                    name="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={formState.password}
                    onChange={handleChange}
                    icon={<Lock size={18} />}
                    required
                  />
                  
                  <div className="flex justify-end">
                    <a href="/mot-de-passe-oublie" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  
                  <div>
                    <Button 
                      variant="primary" 
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Se connecter
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
          
          {/* Section d'aide */}
          <div className="mt-8 text-center">
            <p className="text-[var(--foreground-muted)] mb-4">
              Vous n'avez pas encore de compte ?
            </p>
            <Button 
              variant="outline" 
              href="/beta-program"
            >
              Rejoindre le early access
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 