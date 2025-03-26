import React from 'react';
import Link from 'next/link';

type CardProps = {
  children: React.ReactNode;
  color?: string;
  className?: string;
  headerSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'full';
  href?: string;
  onClick?: () => void;
};

export default function Card({
  children,
  color,
  className = '',
  headerSize = 'sm',
  variant = 'default',
  href,
  onClick,
}: CardProps) {
  // Classes de base pour toutes les cartes
  const baseClasses = "rounded-xl overflow-hidden shadow-md";
  
  // Classes pour les cartes cliquables
  const clickableClasses = (href || onClick) ? 
    "cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" : "";
  
  // Hauteurs prédéfinies pour le header
  const headerHeights = {
    sm: '24px',
    md: '48px',
    lg: '72px'
  };
  
  // Combinaison des classes
  const cardClasses = `${baseClasses} ${clickableClasses} ${className}`;
  
  // Contenu de la carte
  const cardContent = variant === 'full' && color ? (
    <div 
      className={cardClasses}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="p-6 text-white">
        {children}
      </div>
    </div>
  ) : (
    <div 
      className={`${cardClasses} bg-[var(--card-background)]`}
      onClick={onClick}
    >
      {color && (
        <div 
          className="w-full"
          style={{ 
            backgroundColor: color,
            height: headerHeights[headerSize] 
          }}
        ></div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
  
  // Si la carte a un lien, on l'enveloppe dans un composant Link
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }
  
  // Sinon, on retourne simplement le contenu de la carte
  return cardContent;
} 