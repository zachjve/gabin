// components/dashboard/ProjectFilters.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '@/components/ui/Input';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearch
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value); // Application immédiate du filtre
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-grow">
        <Input
          placeholder="Rechercher un projet..."
          icon={<Search size={18} />}
          iconPosition="left"
          value={inputValue}
          onChange={handleChange}
          onSearch={() => onSearch(inputValue)}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;