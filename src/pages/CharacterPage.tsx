import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CharacterEditForm } from '@/components/character/CharacterEditForm';
import { CharacterCard } from '@/components/character/CharacterCard';
import { useSideDrawer, useLocalCharacter, useMergedCharacter } from '@/hooks';
import { CharacterPageTop } from '@/components/character/CharacterPageTop';

export const CharacterPage = () => {
  const { id: characterId } = useParams<{ id: string }>();
  const { openDrawerWithContent, closeDrawer } = useSideDrawer();
  const { saveCharacter } = useLocalCharacter();
  const { character } = useMergedCharacter(Number(characterId));

  const handleEditClick = () => {
    if (character) {
      openDrawerWithContent(
        <CharacterEditForm
          character={character}
          onSave={data => {
            saveCharacter(data);
            closeDrawer();
          }}
          onCancel={closeDrawer}
        />
      );
    }
  };

  return (
    <Box>
      <CharacterPageTop disabledEditButton={!character} handleEditClick={handleEditClick}/>
      <Container maxWidth="sm">
        {character && (
          <Box>
            <CharacterCard character={character} onClick={handleEditClick} showFullDescription={true} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
