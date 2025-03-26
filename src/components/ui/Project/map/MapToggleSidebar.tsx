// components/project/map/MapToggleSidebar.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MapToggleSidebarProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

const MapToggleSidebar: React.FC<MapToggleSidebarProps> = ({
  sidebarOpen,
  onToggle
}) => {
  return (
    <button 
      className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-white dark:bg-[var(--card-background)] shadow-md border border-[var(--border)] hidden md:block"
      onClick={onToggle}
      aria-label={sidebarOpen ? "Masquer la barre latérale" : "Afficher la barre latérale"}
    >
      {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
};

export default MapToggleSidebar;