import { Box, Skeleton } from '@mui/material';

export const CharactersListSkeleton = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
      {[...Array(10)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
          <Skeleton variant="text" width="80%" height={32} animation="wave" />
          <Skeleton variant="text" width="60%" height={48} animation="wave" />
          <Skeleton variant="text" width="70%" height={24} animation="wave" />
        </Box>
      ))}
    </Box>
  );
};
