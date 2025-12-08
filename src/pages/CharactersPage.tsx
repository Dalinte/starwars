import { Box, Typography } from '@mui/material';
import { CharactersHeader } from '@/components/CharactersHeader.tsx';
import { CharactersContent } from '@/components/CharactersContent.tsx';
import { CharacterBottom } from '@/components/CharacterBottom.tsx';

export const CharactersPage = () => {
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
