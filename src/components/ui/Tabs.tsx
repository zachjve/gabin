import React from 'react';

type Tab = {
  id: string;
  label: string;
  color?: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
};

export default function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  // Définir les couleurs réelles au lieu des variables CSS
  const defaultColors: Record<string, string> = {
    'var(--terracotta)': '#CA7A5C',
    'var(--ocre)': '#DCB15B',
    'var(--vert-olive)': '#7E8E59',
    'var(--bleu-ardoise)': '#5E7B91',
    'var(--brun-terracotta)': '#966E51',
    'var(--mauve-terracotta)': '#9D7B8E',
    'var(--gris-architecte)': '#6F7278'
  };
  
  const colorKeys = Object.keys(defaultColors);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab, index) => {
        const colorKey = tab.color || colorKeys[index % colorKeys.length];
        const actualColor = defaultColors[colorKey] || colorKey;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="px-4 py-2 rounded-md font-medium transition-all duration-200"
            style={{
              backgroundColor: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = `${actualColor}80`;
                console.log("Hover activé avec couleur:", actualColor);
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
                console.log("Hover désactivé");
              }
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
} 