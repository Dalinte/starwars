import Grid from '@mui/material/Grid';
import { CharacterCard } from '@/components/character/CharacterCard';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import type { CharacterListWithId } from '@/types';

interface CharacterCardListProps {
  characterList: CharacterListWithId;
}

export const CharacterCardList: FC<CharacterCardListProps> = ({ characterList }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} columns={12}>
      {characterList.map(character => (
        <Grid key={character.id} size={{ xs: 12, md: 4 }}>
          <CharacterCard
            character={character}
            onClick={() => navigate(`/characters/${character.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
