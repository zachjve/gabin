// components/dashboard/ViewModeToggle.tsx
import React from 'react';
import { Grid, List } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ViewMode } from '@/components/ui/Dashboard/types/project';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant={viewMode === 'list' ? 'primary' : 'outline'} 
        size="sm"
        onClick={() => onViewModeChange('list')}
        aria-label="Vue liste"
        aria-pressed={viewMode === 'list'}
      >
        <List size={16} />
      </Button>
      <Button 
        variant={viewMode === 'grid' ? 'primary' : 'outline'} 
        size="sm"
        onClick={() => onViewModeChange('grid')}
        aria-label="Vue grille"
        aria-pressed={viewMode === 'grid'}
      >
        <Grid size={16} />
      </Button>
    </div>
  );
};

export default ViewModeToggle;