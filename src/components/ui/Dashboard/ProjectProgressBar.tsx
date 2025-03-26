// components/dashboard/ProjectProgressBar.tsx
import React from 'react';

interface ProjectProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({
  progress,
  showLabel = true,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/80">Progression</span>
          <span className="text-white/80">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-white h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectProgressBar;