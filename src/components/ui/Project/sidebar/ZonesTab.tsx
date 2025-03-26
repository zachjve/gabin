// components/project/sidebar/ZonesTab.tsx
import React from 'react';
import { ProjectDetails } from '@/components/ui/Project/types/project-detail';

interface ZonesTabProps {
  project: ProjectDetails;
}

const ZonesTab: React.FC<ZonesTabProps> = ({ project }) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Parcelle</h3>
        <div className="bg-[var(--foreground)]/5 p-3 rounded-lg">
          <p className="font-medium">{project.parcelle}</p>
          <p className="text-sm text-[var(--foreground-muted)]">Surface: {project.surface} m²</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Zone principale</h3>
        <div className="bg-[var(--foreground)]/5 p-3 rounded-lg">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: 'var(--vert-olive)' }}
            ></div>
            <p className="font-medium">Zone {project.zone}</p>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] mt-1">
            Zone urbaine à vocation résidentielle
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Prescriptions</h3>
        <div className="space-y-2">
          <div className="bg-[var(--foreground)]/5 p-3 rounded-lg">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: 'var(--terracotta)' }}
              ></div>
              <p className="font-medium">Prescription architecturale</p>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">
              Hauteur maximale: 12m
            </p>
          </div>
          
          <div className="bg-[var(--foreground)]/5 p-3 rounded-lg">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: 'var(--bleu-ardoise)' }}
              ></div>
              <p className="font-medium">Espace boisé classé</p>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">
              Protection des arbres existants
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Servitudes</h3>
        <div className="bg-[var(--foreground)]/5 p-3 rounded-lg">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: 'var(--ocre)' }}
            ></div>
            <p className="font-medium">AC1 - Monument historique</p>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] mt-1">
            Périmètre de protection de 500m
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZonesTab;