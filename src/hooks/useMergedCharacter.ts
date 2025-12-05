import { useMemo } from 'react';
import { useCharacter } from '@/hooks/useCharacter.ts';
import { useLocalCharacter } from '@/hooks/useLocalCharacter.ts';

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