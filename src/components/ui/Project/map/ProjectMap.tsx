// components/project/map/ProjectMap.tsx
import React from 'react';
import { ProjectDetails } from '@/components/ui/Project/types/project-detail';
import AddressSearch from './AddressSearch';
import MapToggleSidebar from './MapToggleSidebar';

interface ProjectMapProps {
  project: ProjectDetails;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

const ProjectMap: React.FC<ProjectMapProps> = ({
  project,
  sidebarOpen,
  onToggleSidebar,
  className = ""
}) => {
  const handleAddressSearch = (address: string) => {
    console.log(`Recherche d'adresse: ${address}`);
    // Logique pour mettre à jour la carte
  };

  return (
    <div className={`relative ${className}`}>
      <AddressSearch 
        initialAddress={project.address} 
        onSearch={handleAddressSearch}
      />
      
      <MapToggleSidebar 
        sidebarOpen={sidebarOpen} 
        onToggle={onToggleSidebar} 
      />
            
      {/* Remplacer le placeholder par une vraie carte interactive */}
      <div className="h-full w-full bg-[var(--foreground)]/5">
        {/* Ici, vous pouvez intégrer une bibliothèque de cartographie comme Leaflet ou Google Maps */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[var(--foreground-muted)]">Carte interactive du projet</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;