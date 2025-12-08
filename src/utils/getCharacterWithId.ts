import type { Character } from '@/api/swapi';
import type { CharacterWithId } from '@/types';

export const getCharacterWithId = (character: Character): CharacterWithId => {
  return {
    ...character,
    id: Number(character?.url?.split('/')?.filter(Boolean)?.pop()),
  };
}