// components/project/map/AddressSearch.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface AddressSearchProps {
  initialAddress: string;
  onSearch?: (address: string) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  initialAddress,
  onSearch
}) => {
  const [address, setAddress] = useState(initialAddress);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(address);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
      <form onSubmit={handleSearch} className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--foreground-muted)]" />
        <input 
          type="text" 
          placeholder="Rechercher une adresse..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-[var(--card-background)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AddressSearch;