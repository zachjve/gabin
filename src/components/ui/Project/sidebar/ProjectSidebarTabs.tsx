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
    <div className="flex border-b border-[var(--border)]">
      <button 
        className={`flex-1 py-3 px-4 text-center font-medium ${
          activeTab === 'zones' 
            ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' 
            : 'text-[var(--foreground-muted)]'
        }`}
        onClick={() => onTabChange('zones')}
      >
        <Layers size={16} className="inline mr-2" />
        Zones
      </button>
      <button 
        className={`flex-1 py-3 px-4 text-center font-medium ${
          activeTab === 'documents' 
            ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' 
            : 'text-[var(--foreground-muted)]'
        }`}
        onClick={() => onTabChange('documents')}
      >
        <FileText size={16} className="inline mr-2" />
        Documents
      </button>
      <button 
        className={`flex-1 py-3 px-4 text-center font-medium ${
          activeTab === 'conversation' 
            ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' 
            : 'text-[var(--foreground-muted)]'
        }`}
        onClick={() => onTabChange('conversation')}
      >
        <MessageSquare size={16} className="inline mr-2" />
        Gabin
      </button>
    </div>
  );
};

export default ProjectSidebarTabs;