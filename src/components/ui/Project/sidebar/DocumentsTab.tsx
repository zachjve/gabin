// components/project/sidebar/DocumentsTab.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ProjectDetails, Document } from '@/components/ui/Project/types/project-detail';
import DocumentItem from '@/components/ui/Project/sidebar/documents/DocumentItem';

interface DocumentsTabProps {
  project: ProjectDetails;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ project }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = project.documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadDocument = (document: Document) => {
    console.log(`Téléchargement du document: ${document.name}`);
    // Logique de téléchargement à implémenter
  };

  return (
    <div>
      <div className="mb-4 relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--foreground-muted)]" />
        <input 
          type="text" 
          placeholder="Rechercher un document..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="space-y-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <DocumentItem 
              key={doc.id} 
              document={doc} 
              onDownload={handleDownloadDocument}
            />
          ))
        ) : (
          <div className="text-center py-4 text-[var(--foreground-muted)]">
            Aucun document ne correspond à votre recherche
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsTab;