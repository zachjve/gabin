// types/project.ts
export interface Project {
    id: number;
    title: string;
    address: string;
    lastUpdated: string;
    status: "En cours" | "En attente" | "Terminé";
    color: string;
    progress: number;
    priority: 'Haute' | 'Moyenne' | 'Basse';
    isFavorite: boolean;
    deadline?: string;
    budget?: number;
    team?: string[];
  }
  
  export type ProjectSortField = 'date' | 'title' | 'status' | 'priority' | 'progress';
  export type SortOrder = 'asc' | 'desc';
  export type ViewMode = 'list' | 'grid';
  export type ProjectTab = 'tous' | 'favoris' | 'en-cours' | 'en-attente' | 'terminés';
  
  export type ProjectFilter = {
    searchTerm: string;
    status: string;
    priority: string;
    sortBy: ProjectSortField;
    sortOrder: SortOrder;
    activeTab: ProjectTab;
  };