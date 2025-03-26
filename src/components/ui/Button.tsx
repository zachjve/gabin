import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  color?: string; // Pour la couleur au survol du variant white
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  color,
  ...props
}: ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>) {
  // Classes de base pour tous les boutons
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 cursor-pointer";
  
  // Classes spécifiques à la variante
  const variantClasses = {
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] border border-transparent hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md",
    outline: "bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] hover:-translate-y-[1px] hover:shadow-md",
    white: "bg-transparent text-white border border-white hover:bg-white hover:-translate-y-[1px] hover:shadow-md"
  };
  
  // Classes spécifiques à la taille
  const sizeClasses = {
    sm: "py-2 px-4 text-sm h-[36px]",
    md: "py-3 px-6 text-base h-[48px]",
    lg: "py-4 px-8 text-lg h-[60px]"
  };
  
  // Style personnalisé pour la couleur au survol du variant white
  const hoverStyle = variant === 'white' && color ? {
    '--hover-color': color
  } as React.CSSProperties : {};
  
  // Combinaison de toutes les classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    variant === 'white' && color ? 'hover:text-[var(--hover-color)]' : ''
  } ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses} style={hoverStyle}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={buttonClasses} onClick={onClick} style={hoverStyle} {...props}>
      {children}
    </button>
  );
} 