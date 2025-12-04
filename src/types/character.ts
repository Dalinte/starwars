import type { Character } from '@/api/swapi';

export type CharacterWithId = Character & {
  id: number;
};

export type CharacterListWithId = CharacterWithId[];
