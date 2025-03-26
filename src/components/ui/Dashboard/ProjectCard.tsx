// components/dashboard/ProjectCard.tsx
import React from 'react';
import { MapPin, Calendar, Trash2, Edit } from 'lucide-react';
import Card from '@/components/ui/Card';
import { Project } from '@/components/ui/Dashboard/types/project';
import { formatDate } from '@/components/ui/Dashboard/utils/projectUtils';
import FavoriteButton from '@/components/ui/Dashboard/FavoriteButton';
import StatusBadge from '@/components/ui/Dashboard/StatusBadge';
import ProjectProgressBar from '@/components/ui/Dashboard/ProjectProgressBar';
import ProjectActionButtons from '@/components/ui/Dashboard/ProjectActionButtons';

interface ProjectCardProps {
  project: Project;
  viewMode: 'list' | 'grid';
  onFavoriteToggle: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode,
  onFavoriteToggle,
  onEdit,
  onDelete,
  onClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle(project.id);
  };

  const handleCardClick = () => {
    if (onClick) onClick(project.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(project.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(project.id);
  };

  // Rendu en mode liste
  if (viewMode === 'list') {
    return (
      <div 
        className="p-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer relative"
        style={{ backgroundColor: project.color }}
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-white">{project.title}</h4>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/80 text-sm">
              <p>{project.address}</p>
              <p>Date de création : {formatDate(project.lastUpdated)}</p>
              <StatusBadge status={project.status} />
            </div>
          </div>
          
          <FavoriteButton 
            isFavorite={project.isFavorite} 
            onClick={handleFavoriteClick} 
          />
        </div>
        
        <div className="flex mt-4 justify-end gap-2">
          <button 
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            onClick={handleEdit}
            aria-label="Modifier"
          >
            <Edit size={16} />
          </button>
          <button 
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            onClick={handleDelete}
            aria-label="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }
  
  // Rendu en mode grille
  return (
    <Card 
      color={project.color}
      className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
      href="#"
      variant="full"
      onClick={handleCardClick}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-start mb-4">
          <StatusBadge status={project.status} />
          
          <FavoriteButton 
            isFavorite={project.isFavorite} 
            onClick={handleFavoriteClick}
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        
        <div className="space-y-2 flex-grow">
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 text-white/80 flex-shrink-0 mt-1" />
            <p className="text-white/80 text-sm">{project.address}</p>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-white/80" />
            <p className="text-white/80 text-sm">
              Date de création : {formatDate(project.lastUpdated)}
            </p>
          </div>
        </div>
        
        <div className="flex mt-4 justify-end gap-2">
          <button 
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            onClick={handleEdit}
            aria-label="Modifier"
          >
            <Edit size={16} />
          </button>
          <button 
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            onClick={handleDelete}
            aria-label="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;