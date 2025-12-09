import { useMemo } from 'react';
import { useCharacter, useLocalCharacter } from '@/hooks';

export const useMergedCharacter = (characterId: number) => {
  const { character } = useCharacter(Number(characterId));
  const { getMergedCharacter } = useLocalCharacter();

  const mergedCharacter = useMemo(() => {
    if (!character) return undefined

    return getMergedCharacter(character);
  }, [character, getMergedCharacter])

  return {
    character: mergedCharacter
  }
}