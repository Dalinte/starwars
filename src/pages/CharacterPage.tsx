import { Link, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { CharacterEditForm } from '@/components/CharacterEditForm';
import { CharacterCard } from '@/components/CharacterCard';
import { useSideDrawer } from '@/hooks/useSideDrawer';
import { getCharacterByIdOptions } from '@/api/swapi';
import { useQuery } from '@tanstack/react-query';

export const CharacterPage = () => {
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
    <Box sx={{ p: 3 }}>
      {data && (
        <Box>
          <CharacterCard character={data} onClick={handleEditClick} />
          <Button variant="contained" onClick={handleEditClick} sx={{ mt: 2 }}>
            Edit Character
          </Button>
        </Box>
      )}
      <Link to="/">Back to Home</Link>
    </Box>
  );
};
