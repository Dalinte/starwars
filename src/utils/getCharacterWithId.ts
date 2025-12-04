import type { Character } from '@/api/swapi';

export const getCharacterWithId = (character: Character) => {
  return {
    ...character,
    id: Number(character?.url?.split('/')?.filter(Boolean)?.pop()),
  };
}