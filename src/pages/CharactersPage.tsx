import { Box, FormControl, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { Search } from '@/components/Search.tsx';
import { CharacterCardList } from '@/components/CharacterCardList.tsx';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';

export const CharactersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { maxPage, characterList, handlePageChange } = useMergedCharacterList(searchQuery);

  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>
            <Typography variant="h1" gutterBottom>
              Characters of Starwars
            </Typography>
          </div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: { xs: 'start', md: 'center' },
              overflow: 'auto',
            }}
          >
            <FormControl
              variant="outlined"
              sx={{
                width: { xs: '100%', md: '250px', overflow: 'hidden' },
              }}
            >
              <Search value={searchQuery} onChange={setSearchQuery} />
            </FormControl>
          </Box>
          <CharacterCardList characterList={characterList} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={maxPage} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};
