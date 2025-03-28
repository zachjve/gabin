// components/project/documents/DocumentItem.tsx
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Document } from '@/components/ui/Project/types/project-detail';
import { formatDate } from '@/components/ui/Project/utils/projectUtils';

interface DocumentItemProps {
  document: Document;
  onDownload?: (document: Document) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  document,
  onDownload
}) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(document);
    }
  };

  return (
    <div className="p-3 rounded-lg border border-white/20 hover:bg-white/10 cursor-pointer transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <FileText className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-medium">{document.name}</h4>
            <p className="text-xs text-white/70">
              {document.type} • {formatDate(document.date)} • {document.size}
            </p>
          </div>
        </div>
        <button 
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={handleDownload}
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
};

export default DocumentItem;