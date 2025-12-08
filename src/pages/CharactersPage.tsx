import { Box, Pagination, Typography } from '@mui/material';
import { CharacterCardList } from '@/components/CharacterCardList.tsx';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';
import { CharactersHeader } from '@/components/CharactersHeader.tsx';

export const CharactersPage = () => {
  const { maxPage, characterList, handlePageChange } = useMergedCharacterList();

  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>
            <Typography variant="h1" gutterBottom>
              Characters of Starwars
            </Typography>
          </div>
          <CharactersHeader />
          <CharacterCardList characterList={characterList} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={maxPage} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};
