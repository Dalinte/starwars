import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

export const AppLayout = () => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <Outlet />
    </Container>
  );
};
