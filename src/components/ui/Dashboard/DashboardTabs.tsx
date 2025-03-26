// components/layout/DashboardTabs.tsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Dashboard/TabsSystem';
import { ProjectTab } from '@/components/ui/Dashboard/types/project';
import ViewModeToggle from '@/components/ui/Dashboard/ViewModeToggle';

// Définir les couleurs pour les onglets
const tabColors: Record<ProjectTab, string> = {
  'tous': 'var(--terracotta)',
  'favoris': 'var(--ocre)',
  'en-cours': 'var(--vert-olive)',
  'en-attente': 'var(--bleu-ardoise)',
  'terminés': 'var(--mauve-terracotta)'
};

// Définir les couleurs réelles pour le survol
const defaultColors: Record<string, string> = {
  'var(--terracotta)': '#CA7A5C',
  'var(--ocre)': '#DCB15B',
  'var(--vert-olive)': '#7E8E59',
  'var(--bleu-ardoise)': '#5E7B91',
  'var(--brun-terracotta)': '#966E51',
  'var(--mauve-terracotta)': '#9D7B8E',
  'var(--gris-architecte)': '#6F7278'
};

interface DashboardTabsProps {
  activeTab: ProjectTab;
  viewMode: 'list' | 'grid';
  onTabChange: (tab: ProjectTab) => void;
  onViewModeChange: (mode: 'list' | 'grid') => void;
  children: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  viewMode,
  onTabChange,
  onViewModeChange,
  children
}) => {
  return (
    <Tabs defaultValue="tous" value={activeTab} onValueChange={(value) => onTabChange(value as ProjectTab)}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          {Object.keys(tabColors).map((tab) => {
            const tabId = tab as ProjectTab;
            const colorKey = tabColors[tabId];
            const actualColor = defaultColors[colorKey] || colorKey;
            const isActive = activeTab === tabId;
            
            return (
              <button
                key={tabId}
                onClick={() => onTabChange(tabId)}
                className="px-4 py-2 rounded-md text-sm transition-all duration-200 text-base"
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = `${actualColor}80`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tabId === 'tous' ? 'Tous' : 
                 tabId === 'favoris' ? 'Favoris' : 
                 tabId === 'en-cours' ? 'En cours' : 
                 tabId === 'en-attente' ? 'En attente' : 
                 'Terminés'}
              </button>
            );
          })}
        </div>
        
        <ViewModeToggle 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange} 
        />
      </div>
      
      {children}
    </Tabs>
  );
};

export default DashboardTabs;