import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCharacterByIdOptions } from '@/api/swapi';
import { Box } from '@mui/material';

export const CharacterPage = () => {
  const { id: characterId } = useParams<{ id: string }>();

  const { data } = useQuery({
    ...getCharacterByIdOptions({
      path: {
        id: String(characterId),
      },
    }),
  });

  return (
    <div>
      <h1>Character</h1>
      <Box>{data?.name}</Box>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
