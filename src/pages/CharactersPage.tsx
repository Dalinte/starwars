import { Box, Typography } from '@mui/material';
import { CharactersPageHeader } from '@/components/characters/CharactersPageHeader.tsx';
import { CharactersPageContent } from '@/components/characters/CharactersPageContent.tsx';
import { CharactersPageBottom } from '@/components/characters/CharactersPageBottom.tsx';
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
