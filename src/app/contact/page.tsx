'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Footer from '@/components/ui/Footer';
import { Send, Mail, Phone } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    nom: '',
    email: '',
    profession: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'envoi de formulaire
    console.log('Formulaire soumis:', formState);
    
    // Afficher un message de succès (dans une application réelle, ceci serait fait après confirmation du serveur)
    setFormStatus({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    });
    
    // Réinitialiser le formulaire
    setFormState({
      nom: '',
      email: '',
      profession: '',
      message: ''
    });
  };

  // Options pour le select de profession
  const professionOptions = [
    { value: '', label: 'Sélectionnez votre profession', disabled: true },
    { value: 'architecte', label: 'Architecte' },
    { value: 'promoteur', label: 'Promoteur immobilier' },
    { value: 'urbaniste', label: 'Urbaniste' },
    { value: 'constructeur', label: 'Constructeur' },
    { value: 'autre', label: 'Autre profession' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header transparent={true} />
      {/* En-tête de la page - avec marge supérieure pour tenir compte du header */}
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-md text-[var(--foreground-muted)] mb-8">
            Vous avez des questions sur Gabin ou besoin d'informations supplémentaires ? 
            Notre équipe est à votre disposition pour vous aider.
          </p>
        </div>
      </div>
      
      {/* Section principale avec formulaire et informations de contact */}
      <div className="container mx-auto px-4 py-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div>
            <Card className="p-2">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                {formStatus.success && (
                  <div className="mb-6 p-4 bg-[var(--vert-olive)]/10 border border-[var(--vert-olive)]/20 rounded-md">
                    <p className="text-[var(--vert-olive)] font-medium">{formStatus.message}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <Input
                      label="Nom complet"
                      name="nom"
                      placeholder="Votre nom et prénom"
                      value={formState.nom}
                      onChange={handleChange}
                      required
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                    
                    <Select
                      label="Profession"
                      name="profession"
                      options={professionOptions}
                      value={formState.profession}
                      onChange={handleChange}
                      required
                    />
                    
                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                    
                    <div>
                      <Button 
                        variant="primary" 
                        size="lg"
                        type="submit"
                        className="w-full md:w-auto"
                      >
                        <Send size={18} className="mr-2" />
                        Envoyer le message
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
          
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
              <p className="text-[var(--foreground-muted)] mb-8">
                N'hésitez pas à nous contacter directement par email ou téléphone.
              </p>
            </div>
            
            <div className="space-y-6">              
              <Card color="var(--bleu-ardoise)" variant="full" className="transform transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start p-2">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-white/90">
                      contact@gabin-ia.fr
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card color="var(--vert-olive)" variant="full" className="transform transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start p-2">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Téléphone</h3>
                    <p className="text-white/90">
                      +33 (0)6 41 80 20 46<br />
                      Du lundi au vendredi, 9h-18h
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Carte ou image */}
            <div className="mt-8 rounded-xl overflow-hidden h-[300px] bg-[var(--foreground)]/5 flex items-center justify-center">
              <p className="text-[var(--foreground-muted)]">[Emplacement pour carte ou image]</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 