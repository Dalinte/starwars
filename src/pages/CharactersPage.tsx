import { Box, Typography } from '@mui/material';
import { CharactersHeader } from '@/components/CharactersHeader.tsx';
import { CharactersContent } from '@/components/CharactersContent.tsx';
import { CharacterBottom } from '@/components/CharacterBottom.tsx';
import { useCharactersPaginationStore } from '@/store/useCharactersPaginationStore';
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
        <Typography variant="h1" gutterBottom>
          Characters of Starwars
        </Typography>
        <CharactersHeader />
        <CharactersContent />
        <CharacterBottom />
      </Box>
    </Box>
  );
};
