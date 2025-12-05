import { useCharacterList } from '@/hooks/useCharacterList.ts';
import { useMemo } from 'react';
import { useLocalCharacter } from '@/hooks/useLocalCharacter.ts';

export const useMergedCharacterList = (searchQuery: string) => {
  const { maxPage, characterList, handlePageChange } = useCharacterList(searchQuery);
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