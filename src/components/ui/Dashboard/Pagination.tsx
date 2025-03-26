// components/dashboard/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Génère un tableau de numéros de page à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Nombre max de pages à afficher

    // Si peu de pages, on les affiche toutes
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sinon, on affiche un sous-ensemble avec des ellipses si nécessaire
      if (currentPage <= 3) {
        // Début de la pagination
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Fin de la pagination
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu de la pagination
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Page précédente"
        >
          <ChevronLeft size={16} />
        </Button>
        
        {getPageNumbers().map(pageNumber => (
          <Button 
            key={`page-${pageNumber}`}
            variant={pageNumber === currentPage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;