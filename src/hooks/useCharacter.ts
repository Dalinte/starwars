import { useQuery } from '@tanstack/react-query';
import { getCharacterByIdOptions } from '@/api/swapi';
import { useMemo } from 'react';
import { getCharacterWithId } from '@/utils';

export const useCharacter = (characterId: number) => {
  const { data, isFetching } = useQuery({
    ...getCharacterByIdOptions({
      path: {
        id: String(characterId),
      },
    }),
  });

  const characterWithId = useMemo(() => {
    if (!data) return undefined

    return getCharacterWithId(data);
  }, [data]);

  return {
    character: characterWithId,
    isLoading: isFetching
  };
};
