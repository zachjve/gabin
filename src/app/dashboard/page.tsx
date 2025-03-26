'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { TabsContent } from '@/components/ui/Dashboard/TabsSystem';
import { ViewMode } from '@/components/ui/Dashboard/types/project';
import { useProjects } from '@/components/ui/Dashboard/hooks/useProjects';
import ProjectList from '@/components/ui/Dashboard/ProjectList';
import ProjectFilters from '@/components/ui/Dashboard/ProjectFilters';
import DashboardTabs from '@/components/ui/Dashboard/DashboardTabs';
import DashboardHeader from '@/components/ui/Dashboard/DashboardHeader';
import { NoFavorites, BackToAllProjects } from '@/components/ui/Dashboard/NoProjectsFound';

// Importation des données mock (à remplacer par des appels API)
import { mockProjects } from '@/components/ui/Dashboard/data/mockProjects';

export default function DashboardPage() {
  // État pour le mode d'affichage (liste ou grille)
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Utilisation du hook personnalisé pour gérer les projets
  const {
    filteredProjects,
    favoriteProjects,
    filters,
    setSearchTerm,
    setActiveTab,
    toggleFavorite
  } = useProjects({ initialProjects: mockProjects });

  // Gestion des événements
  const handleProjectClick = (id: number) => {
    // Navigation vers la page du projet
    window.location.href = `/projet/${id}`;
  };
  
  const handleCreateProject = () => {
    // Logique pour créer un nouveau projet
    console.log('Création d\'un nouveau projet');
  };
  
  const handleEditProject = (id: number) => {
    // Logique pour éditer un projet
    console.log(`Édition du projet ${id}`);
  };
  
  const handleAddToFavorites = () => {
    // Redirection vers l'onglet "tous" pour permettre à l'utilisateur d'ajouter des favoris
    setActiveTab('tous');
  };
  
  const handleViewAllProjects = () => {
    // Redirection vers l'onglet "tous"
    setActiveTab('tous');
  };

  const handleDeleteProject = (id: number) => {
    // Logique pour supprimer un projet
    console.log(`Suppression du projet ${id}`);
    // Vous pourriez implémenter une confirmation avant suppression
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header transparent={true} />
      
      {/* En-tête de la page */}
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <DashboardHeader 
          userName="Gabin" 
          onCreateProject={handleCreateProject} 
        />
      </div>
      
      {/* Section de tous les projets avec onglets, filtres, recherche et pagination */}
      <div className="container mx-auto px-4 py-8 mb-16">
        <h2 className="text-3xl font-bold mb-6">Tous vos projets</h2>
        
        <DashboardTabs 
          activeTab={filters.activeTab} 
          viewMode={viewMode}
          onTabChange={setActiveTab}
          onViewModeChange={setViewMode}
        >
          <TabsContent value="tous" className="mt-0">
            <div className="bg-[var(--card-background)] rounded-xl shadow-sm p-8">
              <ProjectFilters 
                searchTerm={filters.searchTerm}
                onSearch={setSearchTerm}
              />
              
              <ProjectList 
                projects={filteredProjects}
                viewMode={viewMode}
                onFavoriteToggle={toggleFavorite}
                onProjectClick={handleProjectClick}
                onEditProject={handleEditProject}
                onDeleteProject={handleDeleteProject}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="favoris" className="mt-0">
            <div className="bg-[var(--card-background)] rounded-xl shadow-sm p-8">
              {favoriteProjects.length > 0 ? (
                <ProjectList 
                  projects={favoriteProjects}
                  viewMode={viewMode}
                  onFavoriteToggle={toggleFavorite}
                  onProjectClick={handleProjectClick}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                />
              ) : (
                <NoFavorites onAddFavorites={handleAddToFavorites} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="en-cours" className="mt-0">
            <div className="bg-[var(--card-background)] rounded-xl shadow-sm p-8">
              {filteredProjects.length > 0 ? (
                <ProjectList 
                  projects={filteredProjects}
                  viewMode={viewMode}
                  onFavoriteToggle={toggleFavorite}
                  onProjectClick={handleProjectClick}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                />
              ) : (
                <BackToAllProjects onViewAll={handleViewAllProjects} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="en-attente" className="mt-0">
            <div className="bg-[var(--card-background)] rounded-xl shadow-sm p-8">
              {filteredProjects.length > 0 ? (
                <ProjectList 
                  projects={filteredProjects}
                  viewMode={viewMode}
                  onFavoriteToggle={toggleFavorite}
                  onProjectClick={handleProjectClick}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                />
              ) : (
                <BackToAllProjects onViewAll={handleViewAllProjects} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="terminés" className="mt-0">
            <div className="bg-[var(--card-background)] rounded-xl shadow-sm p-8">
              {filteredProjects.length > 0 ? (
                <ProjectList 
                  projects={filteredProjects}
                  viewMode={viewMode}
                  onFavoriteToggle={toggleFavorite}
                  onProjectClick={handleProjectClick}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                />
              ) : (
                <BackToAllProjects onViewAll={handleViewAllProjects} />
              )}
            </div>
          </TabsContent>
        </DashboardTabs>
      </div>
    </div>
  );
}