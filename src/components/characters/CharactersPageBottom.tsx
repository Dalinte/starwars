import { Box, Pagination } from '@mui/material';
import { useMergedCharacterList } from '@/hooks';
import { useMemo } from 'react';

export const CharactersPageBottom = () => {
  const { maxPage, handlePageChange } =
    useMergedCharacterList();

    const showPagination = useMemo(() => {
      return maxPage > 1;
    }, [maxPage])

  return (
    <Box>
      {showPagination && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={maxPage} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  )
}