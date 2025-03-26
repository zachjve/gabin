// utils/projectUtils.ts
import { Project, ProjectFilter, ProjectSortField, SortOrder } from "@/components/ui/Dashboard/types/project";

export const projectColors = [
  "var(--terracotta)",
  "var(--ocre)",
  "var(--vert-olive)",
  "var(--bleu-ardoise)",
  "var(--mauve-terracotta)",
  "var(--gris-architecte)"
];

export const getColorForProject = (id: number): string => {
  return projectColors[(id - 1) % projectColors.length];
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export const filterProjects = (projects: Project[], filters: ProjectFilter): Project[] => {
  let filtered = [...projects];
  
  // Filtrer par onglet actif
  if (filters.activeTab === 'favoris') {
    filtered = filtered.filter(project => project.isFavorite);
  } else if (filters.activeTab === 'en-cours') {
    filtered = filtered.filter(project => project.status === 'En cours');
  } else if (filters.activeTab === 'terminés') {
    filtered = filtered.filter(project => project.status === 'Terminé');
  } else if (filters.activeTab === 'en-attente') {
    filtered = filtered.filter(project => project.status === 'En attente');
  }
  
  // Appliquer la recherche
  if (filters.searchTerm) {
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      project.address.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }
  
  // Appliquer le filtre de statut
  if (filters.status !== 'Tous') {
    filtered = filtered.filter(project => project.status === filters.status);
  }
  
  // Appliquer le filtre de priorité
  if (filters.priority !== 'Toutes') {
    filtered = filtered.filter(project => project.priority === filters.priority);
  }
  
  // Appliquer le tri
  sortProjects(filtered, filters.sortBy, filters.sortOrder);
  
  return filtered;
};

export const sortProjects = (projects: Project[], sortBy: ProjectSortField, sortOrder: SortOrder): void => {
  if (sortBy === 'date') {
    projects.sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime();
      const dateB = new Date(b.lastUpdated).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  } else if (sortBy === 'title') {
    projects.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    });
  } else if (sortBy === 'status') {
    projects.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    });
  } else if (sortBy === 'priority') {
    const priorityOrder = { 'Haute': 3, 'Moyenne': 2, 'Basse': 1 };
    projects.sort((a, b) => {
      const priorityA = priorityOrder[a.priority];
      const priorityB = priorityOrder[b.priority];
      return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
    });
  } else if (sortBy === 'progress') {
    projects.sort((a, b) => {
      return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress;
    });
  }
};

export const getRecentProjects = (projects: Project[], count: number = 3): Project[] => {
  return [...projects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, count);
};

export const getFavoriteProjects = (projects: Project[]): Project[] => {
  return projects.filter(project => project.isFavorite);
};