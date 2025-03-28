'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useProjectDetail } from '@/components/ui/Project/hooks/useProjectDetail';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NotFound from '@/components/ui/NotFound';
import ProjectHeader from '@/components/ui/Project/ProjectHeader';
import ProjectSidebar from '@/components/ui/Project/sidebar/ProjectSidebar';
import ProjectMap from '@/components/ui/Project/map/ProjectMap';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = Number(params.id);
  
  const {
    project,
    loading,
    error,
    sidebarOpen,
    activeTab,
    setSidebarOpen,
    setActiveTab,
    toggleSidebar
  } = useProjectDetail({ projectId });

  const handleEditProject = () => {
    console.log(`Modification du projet ${projectId}`);
    // Ici, rediriger vers la page d'édition ou ouvrir une modal
  };

  const handleDeleteProject = () => {
    console.log(`Suppression du projet ${projectId}`);
    // Ici, afficher une confirmation avant suppression
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !project) {
    return (
      <NotFound 
        title="Projet non trouvé" 
        message="Le projet que vous recherchez n'existe pas ou a été supprimé."
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--background)]">
      <ProjectHeader 
        project={project}
        onToggleSidebar={toggleSidebar}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
      
      <div className="flex-1 overflow-hidden relative">
        {/* Carte en arrière-plan (toujours visible) */}
        <ProjectMap 
          project={project}
        />
        
        {sidebarOpen && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <PanelGroup direction="horizontal" className="h-full w-full">
              {/* Panneau de la sidebar avec pointer-events-auto pour permettre l'interaction */}
              <Panel 
                defaultSize={35} 
                minSize={25} 
                maxSize={80}
                className="pointer-events-auto"
              >
                <ProjectSidebar
                  project={project}
                  isOpen={sidebarOpen}
                  activeTab={activeTab}
                  onClose={() => setSidebarOpen(false)}
                  onTabChange={setActiveTab}
                />
              </Panel>
              
              {/* Poignée de redimensionnement améliorée */}
              <PanelResizeHandle className="group relative w-1 bg-transparent cursor-col-resize pointer-events-auto">
                <div className="absolute inset-y-0 -left-1 w-3 opacity-0" />
              </PanelResizeHandle>
              
              {/* Panneau vide pour la carte */}
              <Panel>
                <div className="h-full w-full" />
              </Panel>
            </PanelGroup>
          </div>
        )}
      </div>
    </div>
  );
} 