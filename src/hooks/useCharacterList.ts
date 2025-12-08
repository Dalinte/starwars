import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import { useCallback, useMemo } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { getCharacterWithId } from '@/utils';
import { useSearchStore } from '@/store/searchStore.ts';

export const useCharacterList = () => {
  const { searchQuery } = useSearchStore();
  const { currentPage, handlePageChange, itemsPerPage } = usePagination();
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);

  const getCharacterListWithPage = useCallback((page: number, search: string = '') => {
    return getCharacterList({
      query: {
        page,
        ...(search && { search }),
      },
    });
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getCharacterListWithPage(currentPage, debouncedSearchQuery),
    queryKey: [getCharacterListQueryKey(), currentPage, debouncedSearchQuery],
    // placeholderData: keepPreviousData,
  });

  console.log('isLoading', isLoading);

  const maxPage = useMemo(() => {
    return data?.data?.count ? Math.ceil(Number(data.data.count) / itemsPerPage) : 1;
  }, [data?.data?.count, itemsPerPage]);

  const characterListWithIds = useMemo(() => {
    if (!data?.data?.results) return [];

    return data?.data?.results?.map(character => getCharacterWithId(character));
  }, [data?.data?.results]);

  return {
    currentPage,
    maxPage: maxPage,
    characterList: characterListWithIds,
    handlePageChange,
    isLoading: isLoading,
    isError,
    error,
  };
};
