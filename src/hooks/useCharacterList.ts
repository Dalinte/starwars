import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import { useCallback, useMemo } from 'react';
import { useDebounceValue, useLocalStorage } from 'usehooks-ts';
import { EDITED_CHARACTERS } from '@/consts';
import { getCharacterWithId } from '@/utils';

export const useCharacterList = (searchQuery: string = '') => {
  const { currentPage, handlePageChange, itemsPerPage } = usePagination();
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);
  const [value, setValue, removeValue] = useLocalStorage(EDITED_CHARACTERS, []);
  console.log(value);
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
    return data?.data?.count ? Math.ceil(Number(data.data.count) / itemsPerPage) : 1;
  }, [data?.data?.count, itemsPerPage]);

  const characterListWithIds = useMemo(() => {
    if (!data?.data?.results) return []

    return data?.data?.results?.map((character) => getCharacterWithId(character))
  }, [data?.data?.results])

  return {
    currentPage,
    maxPage: maxPage,
    characterList: characterListWithIds,
    handlePageChange,
    isLoading: isPending,
    isError,
    error,
  };
};
