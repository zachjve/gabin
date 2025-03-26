// components/dashboard/ProjectList.tsx
import React from 'react';
import { Project } from '@/components/ui/Dashboard/types/project';
import ProjectCard from '@/components/ui/Dashboard/ProjectCard';
import Pagination from '@/components/ui/Dashboard/Pagination';
import { usePagination } from '@/components/ui/Dashboard/hooks/usePagination';

interface ProjectListProps {
  projects: Project[];
  viewMode: 'list' | 'grid';
  onFavoriteToggle: (id: number) => void;
  onProjectClick?: (id: number) => void;
  onEditProject?: (id: number) => void;
  onDeleteProject?: (id: number) => void;
  emptyMessage?: string;
  itemsPerPage?: number;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  viewMode,
  onFavoriteToggle,
  onProjectClick,
  onEditProject,
  onDeleteProject,
  emptyMessage = "Aucun projet ne correspond à vos critères",
  itemsPerPage = 9
}) => {
  const {
    currentPage,
    totalPages,
    currentItems,
    paginate
  } = usePagination<Project>({
    items: projects,
    initialItemsPerPage: itemsPerPage
  });

  const handleProjectClick = (id: number) => {
    if (onProjectClick) onProjectClick(id);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--foreground-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {currentItems.map(project => (
            <ProjectCard
              key={`project-${project.id}`}
              project={project}
              viewMode="list"
              onFavoriteToggle={onFavoriteToggle}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map(project => (
            <ProjectCard
              key={`grid-${project.id}`}
              project={project}
              viewMode="grid"
              onFavoriteToggle={onFavoriteToggle}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          className="mt-8"
        />
      )}
    </>
  );
};

export default ProjectList;