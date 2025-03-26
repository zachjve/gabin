import { useState, useEffect } from 'react';

export function useTheme(): boolean {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    // Initialisation avec une valeur par défaut côté serveur
    if (typeof window === 'undefined') return false;
    // Initialisation avec la valeur correcte côté client
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // Mettre à jour immédiatement pour être sûr d'avoir la bonne valeur
    setIsDarkTheme(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkTheme;
}
