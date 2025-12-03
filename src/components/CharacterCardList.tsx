import Grid from '@mui/material/Grid';
import { CharacterCard } from '@/components/CharacterCard';
import type { Character } from '@/api/swapi';
import { useNavigate } from 'react-router-dom';

interface CharacterCardListProps {
  characterList: Character[];
}

export const CharacterCardList = ({ characterList }: CharacterCardListProps) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} columns={12}>
      {characterList.map(character => (
        <Grid size={{ xs: 12, md: 4 }}>
          <CharacterCard
            character={character}
            onClick={() =>
              navigate(`/characters/${character.url.split('/').filter(Boolean).pop()}`)
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};
