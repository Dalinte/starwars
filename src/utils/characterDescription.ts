import type { Character } from '@/api/swapi';

export const generateCharacterDescription = (character: Character): string => {
  const { 
    name, 
    gender, 
    height, 
    mass, 
    hair_color, 
    skin_color, 
    eye_color, 
    birth_year 
  } = character;

  const heightText = height !== 'unknown' ? `${height} cm` : 'unknown height';
  const massText = mass !== 'unknown' ? `${mass} kg` : 'unknown weight';
  const hairText = hair_color !== 'n/a' && hair_color !== 'none' ? hair_color : 'no';
  const skinText = skin_color !== 'n/a' ? skin_color : 'unknown';
  const eyeText = eye_color !== 'n/a' ? eye_color : 'unknown';
  const genderText = gender !== 'n/a' ? `${gender}` : 'unknown gender';

  return `${name} is a ${genderText.toLowerCase()} being with ${hairText} hair and ${skinText} skin. ` +
         `Standing at ${heightText} tall and weighing ${massText}, ${getGenderPronoun(gender)} has striking ${eyeText} eyes. ` +
         `Born in the year ${birth_year}, ${getGenderPronoun(gender, true)} is a ${getAgeDescription(birth_year)}.`;
};


const getGenderPronoun = (gender: string, possessive = false): string => {
  const lowerGender = gender.toLowerCase();
  if (possessive) {
    return lowerGender === 'male' ? 'he' : lowerGender === 'female' ? 'she' : 'they';
  }
  return lowerGender === 'male' ? 'he' : lowerGender === 'female' ? 'she' : 'they';
};

const getAgeDescription = (birthYear: string): string => {
  if (birthYear === 'unknown') return 'mysterious age';
  
  // Handle cases like "19BBY" (Before Battle of Yavin)
  const yearMatch = birthYear.match(/(\d+)/);
  if (!yearMatch) return 'mysterious age';
  
  if (birthYear.includes('BBY')) {
    return `veteran of the Clone Wars era`;
  } else if (birthYear.includes('ABY')) {
    return 'survivor of the Galactic Civil War';
  }
  
  return 'mysterious being';
};
