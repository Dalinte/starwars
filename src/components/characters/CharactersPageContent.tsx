import { Box } from '@mui/material';
import { CharacterCardList } from '@/components/characters/CharacterCardList';
import { CharactersListSkeleton } from '@/components/characters/CharactersListSkeleton';
import { useMergedCharacterList } from '@/hooks';
import { NoResultsFound } from '@/components/ui/NoResultsFound';
import { useSearchStore } from '@/store';
import { useMemo } from 'react';

export const CharactersPageContent = () => {
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
