import { Skeleton, Box, Card, CardContent, CardMedia } from '@mui/material';

export const CharacterCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
      <CardMedia>
        <Skeleton variant="rectangular" height={300} animation="wave" />
      </CardMedia>
      <CardContent>
        <Skeleton variant="text" width="60%" height={40} animation="wave" />
        <Skeleton variant="text" width="40%" animation="wave" />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" width="80%" animation="wave" />
          <Skeleton variant="text" width="90%" animation="wave" />
          <Skeleton variant="text" width="70%" animation="wave" />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Skeleton variant="text" width="50%" height={30} animation="wave" />
          <Skeleton variant="text" width="100%" animation="wave" />
          <Skeleton variant="text" width="100%" animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};
