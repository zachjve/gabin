'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import Footer from '@/components/ui/Footer';
import { Send, Users, Calendar, Zap, Award } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function BetaProgramPage() {
  const [formState, setFormState] = useState({
    nom: '',
    email: '',
    profession: '',
    entreprise: '',
    telephone: '',
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
      message: "Votre demande a été envoyée avec succès. Notre équipe vous contactera dans les plus brefs délais pour vous donner accès au bêta-testing."
    });
    
    // Réinitialiser le formulaire
    setFormState({
      nom: '',
      email: '',
      profession: '',
      entreprise: '',
      telephone: '',
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

  // Avantages du early access
  const avantages = [
    {
      icon: <Calendar size={24} />,
      title: "Accès gratuit pendant 30 jours",
      description: "Testez toutes les fonctionnalités de Gabin sans aucun engagement financier pendant un mois complet."
    },
    {
      icon: <Users size={24} />,
      title: "Accès prioritaire",
      description: "Bénéficiez d'un accès exclusif à notre plateforme avant son lancement officiel sur le marché."
    },
    {
      icon: <Zap size={24} />,
      title: "Influence sur le développement",
      description: "Vos retours seront pris en compte pour améliorer la plateforme et développer de nouvelles fonctionnalités."
    },
    {
      icon: <Award size={24} />,
      title: "Tarif préférentiel",
      description: "En tant que bêta-testeur, vous bénéficierez d'une offre spéciale lors du lancement officiel de Gabin."
    }
  ];

  // Définition des couleurs pour chaque carte d'avantage
  const avantageColors = [
    'var(--terracotta)',
    'var(--bleu-ardoise)',
    'var(--vert-olive)',
    'var(--ocre)'
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header transparent={true} />
      {/* En-tête de la page - avec marge supérieure pour tenir compte du header */}
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-md text-[var(--foreground-muted)] mb-8">
            Rejoignez notre communauté de early-testeurs et découvrez en avant-première comment 
            Gabin innove l'analyse des règles d'urbanisme pour les professionnels.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Les avantages du early access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {avantages.map((avantage, index) => (
            <Card 
              key={index} 
              color={avantageColors[index % avantageColors.length]}
              variant="full"
              className="h-full transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <div className="text-white">{avantage.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{avantage.title}</h3>
                <p className="text-white/90">
                  {avantage.description.split(' ').map((word, i, arr) => {
                    // Mettre en gras certains segments importants
                    if (
                      (index === 0 && i >= arr.length - 5) || 
                      (index === 1 && i >= arr.length - 6) ||
                      (index === 2 && i >= arr.length - 5) ||
                      (index === 3 && i >= arr.length - 7)
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
      
      {/* Section principale avec formulaire et informations */}
      <div className="bg-[var(--foreground)]/5 py-42">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire d'inscription */}
            <div>
              <Card className="p-2">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Rejoindre le early access</h2>
                  
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
                        label="Email professionnel"
                        name="email"
                        type="email"
                        placeholder="votre.email@entreprise.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                          label="Profession"
                          name="profession"
                          options={professionOptions}
                          value={formState.profession}
                          onChange={handleChange}
                          required
                        />
                        
                        <Input
                          label="Entreprise"
                          name="entreprise"
                          placeholder="Nom de votre entreprise"
                          value={formState.entreprise}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <Input
                        label="Téléphone"
                        name="telephone"
                        placeholder="Votre numéro de téléphone"
                        value={formState.telephone}
                        onChange={handleChange}
                      />
                      
                      <Textarea
                        label="Pourquoi souhaitez-vous rejoindre le bêta-testing ?"
                        name="message"
                        placeholder="Décrivez brièvement vos attentes et comment vous utiliseriez Gabin dans votre activité..."
                        rows={4}
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
                          Envoyer ma demande
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
            
            {/* Informations sur le early access */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Comment fonctionne le early access ?</h2>
                <p className="text-[var(--foreground-muted)] mb-8">
                  Notre early access est conçu pour vous permettre de découvrir et d'évaluer Gabin 
                  dans des conditions réelles d'utilisation, tout en nous aidant à améliorer notre solution.
                </p>
              </div>
              
              <Card color="var(--terracotta)" variant="full" className="p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Inscription</h3>
                      <p className="text-white/90">
                        Remplissez le formulaire ci-contre pour nous faire part de votre intérêt.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Validation</h3>
                      <p className="text-white/90">
                        Notre équipe examine votre demande et vous contacte sous 48h pour confirmer votre participation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Accès</h3>
                      <p className="text-white/90">
                        Vous recevez vos identifiants et accédez immédiatement à la plateforme.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Utilisation et feedback</h3>
                      <p className="text-white/90">
                        Testez Gabin pendant 30 jours et partagez régulièrement vos retours d'expérience.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card color="var(--bleu-ardoise)" variant="full" className="p-6 mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Places limitées</h3>
                <p className="text-white/90 mb-4">
                  Pour garantir une expérience de qualité, nous limitons le nombre de participants 
                  au early access. Ne tardez pas à vous inscrire !
                </p>
                <div className="flex items-center">
                  <Users size={24} className="text-white/70 mr-2" />
                  <span className="text-white font-medium">20 places disponibles</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section de contact */}
      <div className="bg-[var(--background)] py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Des questions avant de vous lancer ?</h2>
          <p className="text-md text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos interrogations 
            concernant le early access et vous aider à déterminer si Gabin correspond à vos besoins.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            href="/contact"
          >
            Contactez-nous
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 