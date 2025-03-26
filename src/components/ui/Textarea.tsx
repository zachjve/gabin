import React, { useId } from 'react';

type TextareaProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  rows?: number;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  label,
  placeholder,
  id,
  className = '',
  rows = 4,
  helpText,
  error,
  disabled = false,
  onChange,
  ...props
}: TextareaProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaProps>) {
  // Utiliser useId au lieu de Math.random()
  const generatedId = useId();
  const textareaId = id || `textarea-${generatedId}`;
  
  // Classes de base pour le textarea
  const baseTextareaClasses = "w-full px-4 py-2 rounded-md border bg-[var(--card-background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all";
  
  // Classes pour les états d'erreur et désactivé
  const stateClasses = error 
    ? "border-[var(--error)] focus:ring-[var(--error)]" 
    : disabled 
      ? "border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed" 
      : "border-gray-300 dark:border-gray-700";
  
  // Combinaison des classes
  const textareaClasses = `${baseTextareaClasses} ${stateClasses} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        className={textareaClasses}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-[var(--error)]">{error}</p>
      )}
    </div>
  );
} 