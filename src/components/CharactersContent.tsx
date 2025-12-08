import { Box } from '@mui/material';
import { CharacterCardList } from '@/components/CharacterCardList.tsx';
import { CharactersListSkeleton } from '@/components/CharactersListSkeleton.tsx';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';

export const CharactersContent = () => {
  const { characterList, isLoading } = useMergedCharacterList();

  return (
    <Box>
      {isLoading ? <CharactersListSkeleton /> : <CharacterCardList characterList={characterList} />}
    </Box>
  );
};
