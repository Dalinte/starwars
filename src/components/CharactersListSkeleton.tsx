import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';

export const CharactersListSkeleton = () => {
  return (
    <Grid container spacing={2} rowSpacing={5} columns={12}>
      {[...Array(10)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 4 }} height={455}>
          <Skeleton
            variant="rectangular"
            height={210}
            animation="wave"
            sx={{
              height: { sm: 'auto', md: '50%' },
              aspectRatio: { sm: '', lg: '16 / 9' },
            }}
          />
          <Skeleton variant="text" width="30%" height={32} animation="wave" />
          <Skeleton variant="text" width="100%" height={150} animation="wave" />
          <Skeleton variant="text" width="100%" height={32} animation="wave" />
          <Skeleton variant="text" width="100%" height={32} animation="wave" />
        </Grid>
      ))}
    </Grid>
  );
};
