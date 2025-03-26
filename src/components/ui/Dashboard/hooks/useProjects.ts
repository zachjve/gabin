// hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { Project, ProjectFilter, ProjectTab } from '@/components/ui/Dashboard/types/project';
import { filterProjects, getRecentProjects, getFavoriteProjects } from '@/components/ui/Dashboard/utils/projectUtils';

interface UseProjectsProps {
  initialProjects: Project[];
}

interface UseProjectsReturn {
  allProjects: Project[];
  recentProjects: Project[];
  favoriteProjects: Project[];
  filteredProjects: Project[];
  filters: ProjectFilter;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setSortBy: (field: ProjectFilter['sortBy']) => void;
  setSortOrder: (order: ProjectFilter['sortOrder']) => void;
  setActiveTab: (tab: ProjectTab) => void;
  toggleFavorite: (projectId: number) => void;
}

export const useProjects = ({ initialProjects }: UseProjectsProps): UseProjectsReturn => {
  const [allProjects, setAllProjects] = useState<Project[]>(initialProjects);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const [filters, setFilters] = useState<ProjectFilter>({
    searchTerm: '',
    status: 'Tous',
    priority: 'Toutes',
    sortBy: 'date',
    sortOrder: 'desc',
    activeTab: 'tous'
  });

  // Mettre à jour les projets quand les données changent
  useEffect(() => {
    setRecentProjects(getRecentProjects(allProjects));
    setFavoriteProjects(getFavoriteProjects(allProjects));
    
    const filtered = filterProjects(allProjects, filters);
    setFilteredProjects(filtered);
  }, [allProjects, filters]);

  const setSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const setStatusFilter = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const setPriorityFilter = (priority: string) => {
    setFilters(prev => ({ ...prev, priority }));
  };

  const setSortBy = (sortBy: ProjectFilter['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSortOrder = (sortOrder: ProjectFilter['sortOrder']) => {
    setFilters(prev => ({ ...prev, sortOrder }));
  };

  const setActiveTab = (activeTab: ProjectTab) => {
    setFilters(prev => ({ ...prev, activeTab }));
  };

  const toggleFavorite = (projectId: number) => {
    setAllProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, isFavorite: !project.isFavorite } 
          : project
      )
    );
  };

  return {
    allProjects,
    recentProjects,
    favoriteProjects,
    filteredProjects,
    filters,
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    setSortBy,
    setSortOrder,
    setActiveTab,
    toggleFavorite
  };
};