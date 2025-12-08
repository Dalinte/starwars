import { useCharacterList } from '@/hooks/useCharacterList.ts';
import { useMemo } from 'react';
import { useLocalCharacter } from '@/hooks/useLocalCharacter.ts';

export const useMergedCharacterList = () => {
  const { maxPage, characterList, handlePageChange } = useCharacterList();
  const { getMergedCharacters } = useLocalCharacter();

  const mergedCharacterList = useMemo(() => {
    return getMergedCharacters(characterList);
  }, [characterList, getMergedCharacters])

  return {
    maxPage,
    characterList: mergedCharacterList,
    handlePageChange
  }
}