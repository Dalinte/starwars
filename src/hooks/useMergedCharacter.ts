import { useMemo } from 'react';
import { useCharacter, useLocalCharacter } from '@/hooks';

export const useMergedCharacter = (characterId: number) => {
  const hookData = useCharacter(Number(characterId));
  const { getMergedCharacter } = useLocalCharacter();

  const mergedCharacter = useMemo(() => {
    if (!hookData.character) return undefined

    return getMergedCharacter(hookData.character);
  }, [hookData.character, getMergedCharacter])

  return {
    ...hookData,
    character: mergedCharacter
  }
}