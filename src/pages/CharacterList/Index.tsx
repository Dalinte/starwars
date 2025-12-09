import { Box, Typography } from '@mui/material';
import { CharactersPageHeader } from './entities/CharactersPageHeader';
import { CharactersPageContent } from './entities/CharactersPageContent';
import { CharactersPageBottom } from './entities/CharactersPageBottom';
import { useCharactersPaginationStore } from '@/store';
import { useEffect } from 'react';
import { scrollToTop } from '@/utils/scrollToTop.ts';

export const CharactersPage = () => {
  const { currentPage } = useCharactersPaginationStore();

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant='h2' gutterBottom>
          Characters of Starwars
        </Typography>
        <CharactersPageHeader />
        <CharactersPageContent />
        <CharactersPageBottom />
      </Box>
    </Box>
  );
};
