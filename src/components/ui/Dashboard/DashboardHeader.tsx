// components/layout/DashboardHeader.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface DashboardHeaderProps {
  userName: string;
  onCreateProject: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onCreateProject
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="max-w-3xl mb-6">
        <p className="text-md text-[var(--foreground-muted)]">
          Bienvenue sur votre espace personnel {userName}. Créez, gérez et accédez à vos projets.
        </p>
      </div>
      
      <div>
        <Button 
          variant="primary"
          className="flex items-center gap-2 px-6 py-3"
          onClick={onCreateProject}
        >
          <Plus size={20} />
          Nouveau projet
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;