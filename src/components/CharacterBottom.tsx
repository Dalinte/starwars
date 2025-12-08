import { Box, Pagination } from '@mui/material';
import { useMergedCharacterList } from '@/hooks/useMergedCharacterList.ts';
import { useMemo } from 'react';

export const CharacterBottom = () => {
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