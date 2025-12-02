import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCharacterByIdOptions } from '@/api/swapi';

export const CharactersPage = () => {
  const { data } = useQuery({
    ...getCharacterByIdOptions({
      path: {
        id: '1',
      },
    }),
  });

  console.log(data);

  return (
    <div>
      <h1>Character</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
