import { Box, FormControl } from '@mui/material';
import { Search } from '@/components/Search.tsx';
import { useSearchStore } from '@/store/searchStore.ts';

export const CharactersHeader = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
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
  );
};
