import { useCharacterList } from '@/hooks/useCharacterList.ts';
import { useMemo } from 'react';
import { useLocalCharacter } from '@/hooks/useLocalCharacter.ts';

export const useMergedCharacterList = () => {
  const hookData = useCharacterList();
  const { getMergedCharacters } = useLocalCharacter();

  const mergedCharacterList = useMemo(() => {
    return getMergedCharacters(hookData.characterList);
  }, [hookData.characterList, getMergedCharacters]);

  return {
    ...hookData,
    mergedCharacterList,
  };
};
