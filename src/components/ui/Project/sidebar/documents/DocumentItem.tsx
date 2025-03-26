// components/project/documents/DocumentItem.tsx
import React from 'react';
import { FileText, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
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
    <div className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--foreground)]/5 cursor-pointer transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-[var(--foreground)]/10 p-2 rounded-lg mr-3">
            <FileText className="text-[var(--foreground-muted)]" size={20} />
          </div>
          <div>
            <h4 className="font-medium">{document.name}</h4>
            <p className="text-xs text-[var(--foreground-muted)]">
              {document.type} • {formatDate(document.date)} • {document.size}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;