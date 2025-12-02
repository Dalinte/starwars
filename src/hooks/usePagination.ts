import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

export const usePagination = ({
  initialPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = useCallback((_: unknown, page: number) => {
    setCurrentPage(page);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const getPaginationProps = () => ({
    count: totalPages,
    page: currentPage,
    onChange: handlePageChange,
  });

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    handlePageChange,
    resetPagination,
    getPaginationProps,
  };
};
