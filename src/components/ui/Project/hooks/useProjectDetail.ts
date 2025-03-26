// hooks/useProjectDetail.ts
import { useState, useEffect } from 'react';
import { ProjectDetails, ProjectTab } from '@/components/ui/Project/types/project-detail';
import { fetchProjectDetails } from '@/components/ui/Project/utils/projectUtils';

interface UseProjectDetailProps {
  projectId: number;
}

interface UseProjectDetailReturn {
  project: ProjectDetails | null;
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  activeTab: ProjectTab;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: ProjectTab) => void;
  toggleSidebar: () => void;
}

export const useProjectDetail = ({ projectId }: UseProjectDetailProps): UseProjectDetailReturn => {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ProjectTab>('zones');

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjectDetails(projectId);
        setProject(data);
      } catch (err) {
        setError('Impossible de charger les détails du projet');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [projectId]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return {
    project,
    loading,
    error,
    sidebarOpen,
    activeTab,
    setSidebarOpen,
    setActiveTab,
    toggleSidebar
  };
};