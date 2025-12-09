import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CharacterEditForm } from '@/components/character/CharacterEditForm';
import { CharacterCard } from '@/components/character/CharacterCard';
import { CharacterCardSkeleton } from '@/components/character/CharacterCardSkeleton';
import { useSideDrawer, useLocalCharacter, useMergedCharacter } from '@/hooks';
import { CharacterPageTop } from '@/components/character/CharacterPageTop';
import { NoResultsFound } from '@/components/ui/NoResultsFound';

export const CharacterPage = () => {
  const { id: characterId } = useParams<{ id: string }>();
  const { openDrawerWithContent, closeDrawer } = useSideDrawer();
  const { saveCharacter } = useLocalCharacter();
  const { character, isLoading } = useMergedCharacter(Number(characterId));

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
      <CharacterPageTop disabledEditButton={!character} handleEditClick={handleEditClick} />
      <Container maxWidth="sm">
        {isLoading ? (
          <CharacterCardSkeleton />
        ) : character ? (
          <CharacterCard
            character={character}
            onClick={handleEditClick}
            showFullDescription={true}
          />
        ) : (
          <NoResultsFound />
        )}
      </Container>
    </Box>
  );
};
