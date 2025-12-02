import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import { useCallback, useMemo } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export const useCharacterList = (searchQuery: string = '') => {
  const { currentPage, handlePageChange, itemsPerPage } = usePagination();
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500)

  const getCharacterListWithPage = useCallback((page: number, search: string = '') => {
    return getCharacterList({
      query: {
        page,
        ...(search && { search }),
      },
    });
  }, []);

  const { data, isPending, isError, error } = useQuery({
    queryFn: () => getCharacterListWithPage(currentPage, debouncedSearchQuery),
    queryKey: [getCharacterListQueryKey(), currentPage, debouncedSearchQuery],
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
