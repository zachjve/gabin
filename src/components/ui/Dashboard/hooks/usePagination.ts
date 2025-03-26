// hooks/usePagination.ts
import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  initialItemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  currentItems: T[];
  paginate: (pageNumber: number) => void;
  setItemsPerPage: (count: number) => void;
}

export const usePagination = <T>({
  items,
  initialItemsPerPage = 9,
  initialPage = 1
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  // Calculer le nombre total de pages
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Ajuster la page courante si elle dépasse le nombre total de pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [items, itemsPerPage, totalPages, currentPage]);

  // Calculer les éléments à afficher sur la page courante
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  // Fonction pour changer de page
  const paginate = (pageNumber: number): void => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    currentItems,
    paginate,
    setItemsPerPage
  };
};