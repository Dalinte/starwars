import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { type CharacterListWithId, type CharacterWithId } from '@/types/character';
import { EDITED_CHARACTERS } from '@/consts';

export const useLocalCharacter = () => {
  const [localCharacters, setLocalCharacters] = useLocalStorage<CharacterListWithId>(
    EDITED_CHARACTERS,
    []
  );

  const saveCharacter = useCallback(
    (character: CharacterWithId) => {
      setLocalCharacters(prevCharacters => {
        const existingIndex = prevCharacters.findIndex(item => item.id === character.id);

        if (existingIndex >= 0) {
          const updated = [...prevCharacters];
          updated[existingIndex] = character;
          return updated;
        } else {
          return [...prevCharacters, character];
        }
      });
    },
    [setLocalCharacters]
  );

  const deleteCharacter = useCallback(
    (id: number) => {
      setLocalCharacters(prevCharacters => prevCharacters.filter(character => character.id !== id));
    },
    [setLocalCharacters]
  );

  const getMergedCharacters = useCallback(
    (characters: CharacterListWithId): CharacterWithId[] => {
      if (!localCharacters.length) return characters;

      const localCharactersMap = new Map<number, CharacterWithId>();

      characters.forEach(character => {
        localCharactersMap.set(character.id, character);
      });

      localCharacters.forEach(localChar => {
        localCharactersMap.set(localChar.id, localChar);
      });

      return Array.from(localCharactersMap.values());
    },
    [localCharacters]
  );

  const getMergedCharacter = useCallback(
    (character: CharacterWithId): CharacterWithId => {
      if (!localCharacters.length) return character;

      const localCharacter = localCharacters.find(c => c.id === character.id);
      return localCharacter || character;
    },
    [localCharacters]
  );

  return {
    saveCharacter,
    deleteCharacter,
    localCharacters,
    getMergedCharacters,
    getMergedCharacter,
  };
};
