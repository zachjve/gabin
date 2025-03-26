// components/project/ProjectHeader.tsx
import React from 'react';
import { ChevronLeft, Edit, Trash2, Menu, MapPin, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ProjectDetails } from '@/components/ui/Project/types/project-detail';
import { formatDate } from '@/components/ui/Project/utils/projectUtils';

interface ProjectHeaderProps {
  project: ProjectDetails;
  onToggleSidebar: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onToggleSidebar,
  onEdit,
  onDelete
}) => {
  return (
    <header 
      style={{ backgroundColor: project.color }} 
      className="py-4 px-6 flex items-center justify-between z-10 shadow-md"
    >
      <div className="flex items-center">
        <Button 
          variant="outline" 
          href="/dashboard"
          className="mr-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
        >
          <ChevronLeft size={20} />
        </Button>
        
        <div>
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white mr-3">{project.title}</h1>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              {project.status}
            </span>
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="mr-4">{project.address}</span>
            <Calendar size={14} className="mr-1" />
            <span>Date de création : {formatDate(project.lastUpdated)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          onClick={onEdit}
        >
          <Edit size={16} className="mr-2" />
          Modifier
        </Button>
        <Button 
          variant="outline" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          onClick={onDelete}
        >
          <Trash2 size={16} className="mr-2" />
          Supprimer
        </Button>
        <Button
          variant="outline"
          className="md:hidden bg-white/20 text-white border-white/30 hover:bg-white/30"
          onClick={onToggleSidebar}
        >
          <Menu size={16} />
        </Button>
      </div>
    </header>
  );
};

export default ProjectHeader;