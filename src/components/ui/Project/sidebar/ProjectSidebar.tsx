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
    <div className="h-full w-full p-3 pr-0">
      <div 
        className="bg-[var(--terracotta)] h-full w-full flex flex-col rounded-xl shadow-xl z-20 overflow-hidden"
      >
        {/* Bouton pour fermer la sidebar sur mobile */}
        <button 
          className="md:hidden absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 text-white"
          onClick={onClose}
          aria-label="Fermer la barre latérale"
        >
          <X size={20} />
        </button>
        
        {/* Onglets de la sidebar */}
        <ProjectSidebarTabs activeTab={activeTab} onTabChange={onTabChange} />
        
        {/* Contenu de l'onglet actif */}
        <div className="flex-1 overflow-y-auto p-4 text-white">
          {activeTab === 'zones' && <ZonesTab project={project} />}
          {activeTab === 'documents' && <DocumentsTab project={project} />}
          {activeTab === 'conversation' && <ConversationTab project={project} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;