'use client'

import React, { useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helpText?: string;
  error?: string;
  disabled?: boolean;
  onSearch?: () => void;
  variant?: 'default' | 'white';
};

export default function Input({
  label,
  placeholder,
  type = 'text',
  id,
  className = '',
  icon,
  iconPosition = 'left',
  helpText,
  error,
  disabled = false,
  onSearch,
  variant = 'default',
  ...props
}: InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>) {
  // État pour gérer l'affichage du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  
  // Utiliser useId de React pour générer un ID stable
  const generatedId = useId();
  
  // Déterminer le type d'input réel en fonction de l'état showPassword
  const actualType = type === 'password' && showPassword ? 'text' : type;
  
  // Utiliser l'ID fourni ou l'ID généré
  const inputId = id || `input-${generatedId}`;
  
  // Classes de base pour l'input
  const baseInputClasses = "w-full px-4 py-2 rounded-md border focus:outline-none transition-all";
  
  // Classes spécifiques au variant
  const variantClasses = variant === 'white' 
    ? "bg-transparent text-white placeholder-white/70 border-white focus:border-white" 
    : "bg-[var(--card-background)] text-[var(--foreground)] border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent autofill:bg-[var(--autocomplete-background)] autofill:text-[var(--foreground)]";
  
  // Classes pour les états d'erreur et désactivé
  const stateClasses = error 
    ? variant === 'white'
      ? "border-red-300 focus:ring-red-300" 
      : "border-[var(--error)] focus:ring-[var(--error)]" 
    : disabled 
      ? "opacity-60 cursor-not-allowed" 
      : "";
  
  // Classes pour l'icône
  const iconClasses = icon 
    ? iconPosition === 'left' 
      ? "pl-10" 
      : "pr-10" 
    : "";
  
  // Ajuster les classes si c'est un champ de mot de passe
  const passwordClasses = type === 'password' ? "pr-10" : "";
  
  // Combinaison des classes
  const inputClasses = `${baseInputClasses} ${variantClasses} ${stateClasses} ${iconClasses} ${passwordClasses} ${className}`;
  
  // Fonction pour basculer l'affichage du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Gérer la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
    // Propager l'événement original
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };
  
  // Déterminer la couleur de l'icône en fonction du variant
  const iconColor = variant === 'white' 
    ? "text-white" 
    : "text-gray-500 dark:text-white";
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className={`block text-sm font-medium mb-1 ${variant === 'white' ? 'text-white' : ''}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
            {icon}
          </span>
        )}
        
        <input
          id={inputId}
          type={actualType}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${iconColor}`}>
            {icon}
          </span>
        )}
        
        {type === 'password' && (
          <button
            type="button"
            className={`absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none ${iconColor}`}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {helpText && !error && (
        <p className={`mt-1 text-sm ${variant === 'white' ? 'text-white/70' : 'text-[var(--foreground-muted)]'}`}>
          {helpText}
        </p>
      )}
      
      {error && (
        <p className={`mt-1 text-sm ${variant === 'white' ? 'text-red-300' : 'text-[var(--error)]'}`}>
          {error}
        </p>
      )}
    </div>
  );
} 