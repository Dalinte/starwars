import { Box, Typography } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

export const NoResultsFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        color: 'text.secondary',
      }}
    >
      <SearchOffRoundedIcon sx={{ fontSize: 64, mb: 2 }} />
      <Typography variant="h6" component="div">
        No characters found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Try adjusting your search or filter to find what you're looking for.
      </Typography>
    </Box>
  );
};
