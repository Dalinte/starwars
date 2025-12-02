import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import { useCallback, useMemo } from 'react';

export const useCharacterList = () => {
  const { currentPage, handlePageChange, itemsPerPage } = usePagination();

  const getCharacterListWithPage = useCallback((page: number) => {
    return getCharacterList({
      query: {
        page,
      },
    });
  }, []);

  const { data, isPending, isError, error } = useQuery({
    queryFn: () => getCharacterListWithPage(currentPage),
    queryKey: [getCharacterListQueryKey(), currentPage],
    placeholderData: keepPreviousData,
  });

  const maxPage = useMemo(() => {
    return data?.data?.count ? Math.ceil(Number(data.data.count) / itemsPerPage) : 1
  }, [data?.data?.count, itemsPerPage])

  return {
    currentPage,
    maxPage: maxPage,
    characterList: data?.data?.results || [],
    handlePageChange,
    isLoading: isPending,
    isError,
    error,
  };
};
