import type { SelectOptions } from '@/types';

export const defaultColorOptions: SelectOptions = [
  { value: 'blue', label: 'Blue' },
  { value: 'brown', label: 'Brown' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'hazel', label: 'Hazel' },
  { value: 'pink', label: 'Pink' },
  { value: 'gold', label: 'Gold' },
  { value: 'white', label: 'White' },
  { value: 'unknown', label: 'Unknown' },
];

export const eyeColorOptions = defaultColorOptions;
export const hairColorOptions = defaultColorOptions;
export const skinColorOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'unknown', label: 'Unknown' },
];

export const genderOptions: SelectOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'n/a', label: 'N/A' },
];
