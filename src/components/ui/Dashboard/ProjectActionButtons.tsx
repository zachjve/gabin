// components/dashboard/ProjectActionButtons.tsx
import React from 'react';

interface ProjectActionButtonsProps {
  onEdit?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
  className?: string;
}

const ProjectActionButtons: React.FC<ProjectActionButtonsProps> = ({
  onEdit,
  onShare,
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent, handler?: (e: React.MouseEvent) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (handler) handler(e);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button 
        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        onClick={(e) => handleClick(e, onEdit)}
        aria-label="Modifier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
      </button>
      <button 
        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        onClick={(e) => handleClick(e, onShare)}
        aria-label="Partager"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>
    </div>
  );
};

export default ProjectActionButtons;