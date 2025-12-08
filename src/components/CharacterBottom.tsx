import { Box, Pagination } from '@mui/material';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';

export const CharacterBottom = () => {
  const { maxPage, handlePageChange, haveCharacters } =
    useMergedCharacterList();

  return (
    <Box>
      {haveCharacters && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={maxPage} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  )
}