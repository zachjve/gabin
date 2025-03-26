'use client';

import React, { createContext, useContext, useState } from 'react';

// Contexte pour les onglets
type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook pour utiliser le contexte des onglets
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Les composants d\'onglets doivent être utilisés à l\'intérieur d\'un composant Tabs');
  }
  return context;
};

// Composant principal Tabs
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ 
  defaultValue, 
  value, 
  onValueChange, 
  children, 
  className = '' 
}: TabsProps) {
  const [tabValue, setTabValue] = useState(value || defaultValue || '');
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setTabValue(newValue);
    }
  };
  
  return (
    <TabsContext.Provider 
      value={{ 
        value: value !== undefined ? value : tabValue, 
        onValueChange: handleValueChange 
      }}
    >
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Composant TabsList
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-[var(--background-muted)] p-1 ${className}`}>
      {children}
    </div>
  );
}

// Composant TabsTrigger
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabsTrigger({ 
  value, 
  children, 
  className = '',
  disabled = false
}: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isSelected = selectedValue === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
        ${isSelected 
          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
          : 'text-[var(--foreground-muted)] hover:bg-[var(--background-hover)]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`
      }
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

// Composant TabsContent
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ 
  value, 
  children, 
  className = '' 
}: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;
  
  if (!isSelected) return null;
  
  return (
    <div 
      role="tabpanel"
      className={`mt-2 ${className}`}
    >
      {children}
    </div>
  );
} 