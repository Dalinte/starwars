import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { CharacterEditForm } from '@/components/CharacterEditForm';
import { CharacterCard } from '@/components/CharacterCard';
import { useSideDrawer } from '@/hooks/useSideDrawer';
import { getCharacterByIdOptions } from '@/api/swapi';
import { useQuery } from '@tanstack/react-query';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id: characterId } = useParams<{ id: string }>();

  const { data } = useQuery({
    ...getCharacterByIdOptions({
      path: {
        id: String(characterId),
      },
    }),
  });
  const { openDrawerWithContent, closeDrawer } = useSideDrawer();

  const handleEditClick = () => {
    if (data) {
      openDrawerWithContent(
        <CharacterEditForm
          character={data}
          onSave={() => {
            closeDrawer();
          }}
          onCancel={closeDrawer}
        />
      );
    }
  };

  return (
    <Box>
      <AppBar 
        position="static"
        color="transparent"
        elevation={0} 
        sx={{ 
          mb: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 0 }
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 48, sm: 64 } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate('/')}
              aria-label="back to home"
              sx={{ 
                mr: 2,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
              size="large"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                flexGrow: 1,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              Character Details
            </Typography>
            {data && (
              <Button
                variant="outlined"
                onClick={handleEditClick}
                startIcon={<EditIcon />}
                color="primary"
                size={window.innerWidth < 600 ? 'small' : 'medium'}
                sx={{
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 2 },
                  '& .MuiButton-startIcon': {
                    mr: { xs: 0.5, sm: 1 }
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Edit
                </Box>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      <Container maxWidth="sm">
        {data && (
          <Box>
            <CharacterCard character={data} onClick={handleEditClick} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
