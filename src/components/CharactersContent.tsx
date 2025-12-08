import { Box } from '@mui/material';
import { CharacterCardList } from '@/components/CharacterCardList.tsx';
import { CharactersListSkeleton } from '@/components/CharactersListSkeleton.tsx';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';
import { NoResultsFound } from '@/components/NoResultsFound';
import { useSearchStore } from '@/store/searchStore.ts';
import { useMemo } from 'react';

export const CharactersContent = () => {
  const { characterList, isLoading } = useMergedCharacterList();
  const { searchQuery } = useSearchStore();

  const showNoResults = useMemo(() => {
    return !isLoading && searchQuery && characterList.length === 0;
  }, [isLoading, searchQuery, characterList?.length])

  return (
    <Box>
      {isLoading ? (
        <CharactersListSkeleton />
      ) : showNoResults ? (
        <NoResultsFound />
      ) : (
        <CharacterCardList characterList={characterList} />
      )}
    </Box>
  );
};
