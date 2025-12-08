import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CharacterEditForm } from '@/components/CharacterEditForm';
import { CharacterCard } from '@/components/CharacterCard';
import { useSideDrawer } from '@/hooks';
import { useLocalCharacter } from '@/hooks/useLocalCharacter.ts';
import { useMergedCharacter } from '@/hooks/useMergedCharacter.ts';
import { CharacterPageTop } from '@/components/CharacterPageTop.tsx';

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
            <CharacterCard character={character} onClick={handleEditClick} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
