import { Box } from '@mui/material';
import { CharacterCardList } from '@/components/CharacterCardList.tsx';
import type { CharacterListWithId } from '@/types';
import { CharactersListSkeleton } from '@/components/CharactersListSkeleton.tsx';

interface ICharactersContentProps {
  characterList: CharacterListWithId;
  isLoading: boolean;
}

export const CharactersContent = ({ characterList, isLoading }: ICharactersContentProps) => {
  return (
    <Box>
      {isLoading ? (
        <CharactersListSkeleton />
      ) : (
        <CharacterCardList characterList={characterList} />
      )}
    </Box>
  );
};
