import { useCallback } from 'react';

interface UsePaginationProps {
  itemsPerPage?: number;
  totalItems?: number;
  currentPage: number;
  setCurrentPage(page: number): void;
}

export const usePagination = ({
  itemsPerPage = 10,
  totalItems = 0,
  currentPage = 1,
  setCurrentPage,
}: UsePaginationProps) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = useCallback((_: unknown, page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
    resetPagination,
  };
};
