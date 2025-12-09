import type { Character } from '@/api/swapi';

const getFilmTitle = (filmUrl: string): string => {
  const filmTitles: { [key: string]: string } = {
    '1': 'Episode IV: A New Hope',
    '2': 'Episode V: The Empire Strikes Back',
    '3': 'Episode VI: Return of the Jedi',
    '4': 'Episode I: The Phantom Menace',
    '5': 'Episode II: Attack of the Clones',
    '6': 'Episode III: Revenge of the Sith',
    '7': 'Episode VII: The Force Awakens',
    '8': 'Episode VIII: The Last Jedi',
    '9': 'Episode IX: The Rise of Skywalker'
  };
  
  const match = filmUrl.match(/\/(\d+)\/?$/);
  return match && filmTitles[match[1]] ? filmTitles[match[1]] : 'Star Wars Movie';
};

interface CharacterDescription {
  short: string;
  full: string;
}

export const generateCharacterDescription = (character: Character): CharacterDescription => {
  const { name, gender, height, mass, hair_color, skin_color, eye_color, birth_year, films } = character;

  const heightText = height !== 'n/a' ? `${height} cm` : 'unknown height';
  const massText = mass !== 'n/a' ? `${mass} kg` : 'unknown weight';
  const hairText = hair_color !== 'n/a' && hair_color !== 'none' ? hair_color : 'no';
  const skinText = skin_color !== 'n/a' ? skin_color : 'unknown';
  const eyeText = eye_color !== 'n/a' ? eye_color : 'unknown';
  const genderText = gender !== 'n/a' ? `${gender}` : 'unknown gender';

  const shortDescription = `${name} is a ${genderText.toLowerCase()} being with ${hairText} hair and ${skinText} skin.`;

  let fullDescription = `${shortDescription} ` +
    `Standing at ${heightText} tall and weighing ${massText}, ${getGenderPronoun(gender)} has striking ${eyeText} eyes. ` +
    `Born in the year ${birth_year}, ${getGenderPronoun(gender, true)} is a ${getAgeDescription(birth_year)}.`;

  if (films && films.length > 0) {
    fullDescription += '\n\nAppears in the following films:\n';
    const filmLinks = films.map(filmUrl => 
      `- <a href="${filmUrl}" target="_blank">${getFilmTitle(filmUrl)}</a>`
    ).join('\n');
    fullDescription += filmLinks;
  }

  return {
    short: shortDescription,
    full: fullDescription
  };
};

export const getGenderPronoun = (gender: string, possessive = false): string => {
  const lowerGender = gender.toLowerCase();
  if (possessive) {
    return lowerGender === 'male' ? 'he' : lowerGender === 'female' ? 'she' : 'they';
  }
  return lowerGender === 'male' ? 'he' : lowerGender === 'female' ? 'she' : 'they';
};

const getAgeDescription = (birthYear: string): string => {
  if (birthYear === 'n/a') return 'mysterious age';

  const yearMatch = birthYear.match(/(\d+)/);
  if (!yearMatch) return 'mysterious age';

  if (birthYear.includes('BBY')) {
    return `veteran of the Clone Wars era`;
  } else if (birthYear.includes('ABY')) {
    return 'survivor of the Galactic Civil War';
  }

  return 'mysterious being';
};
