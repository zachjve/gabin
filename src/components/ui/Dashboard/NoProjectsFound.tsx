// components/dashboard/NoProjectsFound.tsx
import React, { ReactNode } from 'react';
import Button from '@/components/ui/Button';
import { ChevronLeft, Star, PlusCircle } from 'lucide-react';

interface NoProjectsFoundProps {
  message: string;
  actionText?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
}

const NoProjectsFound: React.FC<NoProjectsFoundProps> = ({
  message,
  actionText,
  actionIcon,
  onAction
}) => {
  return (
    <div className="text-center py-12">
      <p className="text-[var(--foreground-muted)] mb-4">{message}</p>
      
      {actionText && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionIcon && <span className="mr-2">{actionIcon}</span>}
          {actionText}
        </Button>
      )}
    </div>
  );
};

// Composants pré-configurés pour les cas d'usage courants
export const NoFavorites: React.FC<{ onAddFavorites: () => void }> = ({ onAddFavorites }) => (
  <NoProjectsFound 
    message="Vous n'avez pas encore de projets favoris" 
    actionText="Ajouter des favoris"
    actionIcon={<Star size={16} />}
    onAction={onAddFavorites}
  />
);

export const NoProjects: React.FC<{ onCreateProject: () => void }> = ({ onCreateProject }) => (
  <NoProjectsFound 
    message="Vous n'avez pas encore de projets" 
    actionText="Créer un nouveau projet"
    actionIcon={<PlusCircle size={16} />}
    onAction={onCreateProject}
  />
);

export const NoFilteredProjects: React.FC<{ onResetFilters: () => void }> = ({ onResetFilters }) => (
  <NoProjectsFound 
    message="Aucun projet ne correspond à vos critères" 
    actionText="Réinitialiser les filtres"
    onAction={onResetFilters}
  />
);

export const BackToAllProjects: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => (
  <NoProjectsFound 
    message="Aucun projet dans cette catégorie pour le moment"
    actionText="Voir tous les projets"
    actionIcon={<ChevronLeft size={16} />}
    onAction={onViewAll}
  />
);

export default NoProjectsFound;