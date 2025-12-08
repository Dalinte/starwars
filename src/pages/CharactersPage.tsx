import { Box, Pagination, Typography } from '@mui/material';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';
import { CharactersHeader } from '@/components/CharactersHeader.tsx';
import { useCharacterList } from '@/hooks/useCharacterList.ts';
import { CharactersContent } from '@/components/CharactersContent.tsx';

export const CharactersPage = () => {
  const { maxPage, characterList, handlePageChange } = useMergedCharacterList();
  const { isLoading } = useCharacterList();

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h1" gutterBottom>
          Characters of Starwars
        </Typography>
        <CharactersHeader />
        <CharactersContent characterList={characterList} isLoading={isLoading}/>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={maxPage} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};
