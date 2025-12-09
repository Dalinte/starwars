import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import { useCallback, useMemo } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { getCharacterWithId } from '@/utils';
import { useSearchStore, useCharactersPaginationStore } from '@/store';

export const useCharacterList = () => {
  const { searchQuery } = useSearchStore();
  const { currentPage, setCurrentPage } = useCharactersPaginationStore();
  const { handlePageChange, itemsPerPage } = usePagination({ currentPage, setCurrentPage });
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);

  const getCharacterListWithPage = useCallback((page: number, search: string = '') => {
    return getCharacterList({
      query: {
        page,
        ...(search && { search }),
      },
    });
  }, []);

  const { data, isError, error, isFetching } = useQuery({
    queryFn: () => getCharacterListWithPage(currentPage, debouncedSearchQuery),
    queryKey: [getCharacterListQueryKey(), currentPage, debouncedSearchQuery],
    placeholderData: keepPreviousData,
  });

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
    isLoading: isFetching,
    isError,
    error,
  };
};
