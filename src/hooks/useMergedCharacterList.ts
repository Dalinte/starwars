import { useCharacterList, useLocalCharacter } from '@/hooks';
import { useMemo } from 'react';

export const useMergedCharacterList = () => {
  const hookData = useCharacterList();
  const { getMergedCharacters } = useLocalCharacter();

  const mergedCharacterList = useMemo(() => {
    return getMergedCharacters(hookData.characterList);
  }, [hookData.characterList, getMergedCharacters]);

  return {
    ...hookData,
    characterList: mergedCharacterList,
  };
};
