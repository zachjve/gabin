// components/project/sidebar/ProjectSidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { ProjectDetails, ProjectTab } from '@/components/ui/Project/types/project-detail';
import ProjectSidebarTabs from '@/components/ui/Project/sidebar/ProjectSidebarTabs';
import ZonesTab from '@/components/ui/Project/sidebar/ZonesTab';
import DocumentsTab from '@/components/ui/Project/sidebar/DocumentsTab';
import ConversationTab from '@/components/ui/Project/sidebar/ConversationTab';

interface ProjectSidebarProps {
  project: ProjectDetails;
  isOpen: boolean;
  activeTab: ProjectTab;
  onClose: () => void;
  onTabChange: (tab: ProjectTab) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  project,
  isOpen,
  activeTab,
  onClose,
  onTabChange
}) => {
  return (
    <div 
      className="bg-white dark:bg-[var(--card-background)] h-full w-full flex flex-col border-r border-[var(--border)] z-20"
    >
      {/* Bouton pour fermer la sidebar sur mobile */}
      <button 
        className="md:hidden absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--foreground)]/5"
        onClick={onClose}
        aria-label="Fermer la barre latérale"
      >
        <X size={20} />
      </button>
      
      {/* Onglets de la sidebar */}
      <ProjectSidebarTabs activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Contenu de l'onglet actif */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'zones' && <ZonesTab project={project} />}
        {activeTab === 'documents' && <DocumentsTab project={project} />}
        {activeTab === 'conversation' && <ConversationTab project={project} />}
      </div>
    </div>
  );
};

export default ProjectSidebar;