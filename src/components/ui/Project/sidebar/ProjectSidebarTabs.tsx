// components/project/sidebar/ProjectSidebarTabs.tsx
import React from 'react';
import { Layers, FileText, MessageSquare } from 'lucide-react';
import { ProjectTab } from '@/components/ui/Project/types/project-detail';

interface ProjectSidebarTabsProps {
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}

const ProjectSidebarTabs: React.FC<ProjectSidebarTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex border-b border-white/20">
      {(['zones', 'documents', 'conversation'] as ProjectTab[]).map((tab) => {
        const isActive = activeTab === tab;
        
        // Définir l'icône en fonction de l'onglet
        let Icon;
        let label;
        
        switch(tab) {
          case 'zones':
            Icon = Layers;
            label = 'Zones';
            break;
          case 'documents':
            Icon = FileText;
            label = 'Documents';
            break;
          case 'conversation':
            Icon = MessageSquare;
            label = 'Gabin';
            break;
        }
        
        return (
          <button 
            key={tab}
            className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 flex items-center justify-center ${
              isActive ? 'bg-white text-[var(--terracotta)]' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => onTabChange(tab)}
          >
            <Icon size={16} className="mr-2" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectSidebarTabs;