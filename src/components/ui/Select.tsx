import React, { useId, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  options: SelectOption[];
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  value?: string;
  required?: boolean;
};

export default function Select({
  label,
  options,
  id,
  placeholder,
  className = '',
  disabled = false,
  error,
  helpText,
  onChange,
  name,
  value,
  required = false,
  ...props
}: SelectProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof SelectProps>) {
  const reactId = useId();
  const selectId = useMemo(() => `select-${name || id || reactId}`, [name, id, reactId]);
  
  // Classes de base pour le select
  const baseSelectClasses = "w-full px-4 py-2 rounded-md border appearance-none bg-[var(--card-background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all pr-10";
  
  // Classes pour les états d'erreur et désactivé
  const stateClasses = error 
    ? "border-[var(--error)] focus:ring-[var(--error)]" 
    : disabled 
      ? "border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed" 
      : "border-gray-300 dark:border-gray-700";
  
  // Combinaison des classes
  const selectClasses = `${baseSelectClasses} ${stateClasses} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          onChange={onChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[var(--foreground-muted)]">
          <ChevronDown size={18} />
        </div>
      </div>
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-[var(--error)]">{error}</p>
      )}
    </div>
  );
} 