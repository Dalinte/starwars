import { useFormik } from 'formik';
import { Box, Button, Typography, Stack } from '@mui/material';
import type { CharacterWithId } from '@/types';
import {
  eyeColorOptions,
  genderOptions,
  hairColorOptions,
  skinColorOptions,
} from '@/consts/selectOptions.ts';
import { TextFieldWithFormik } from '../TextFieldWithFormik/TextFieldWithFormik';
import type { Character } from '@/api/swapi';
import { SelectWithFormik } from '@/components/SelectWithFormik/SelectWithFormik.tsx';
import { EditableListWithFormik } from '@/components/EditableListWithFormik/EditableListWithFormik';
import { validationSchema } from './validationSchema.ts';

interface CharacterEditFormProps {
  character: CharacterWithId;
  onSave: (updatedCharacter: CharacterWithId) => void;
  onCancel: () => void;
}

export const CharacterEditForm = ({ character, onSave, onCancel }: CharacterEditFormProps) => {
  const formik = useFormik<Character>({
    initialValues: {
      name: character.name || '',
      height: character.height || '',
      mass: character.mass || '',
      hair_color: character.hair_color || '',
      skin_color: character.skin_color || '',
      eye_color: character.eye_color || '',
      birth_year: character.birth_year || '',
      gender: character.gender || '',
      homeworld: character.homeworld || '',
      films: character.films || [],
      created: character.created || '',
      edited: character.edited || '',
      species: character.species || [],
      starships: character.starships || [],
      url: character.url || '',
      vehicles: character.vehicles || [],
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onSave({
        ...character,
        ...values,
      });
    },
  });

  return (
    <Box sx={{ mt: 2, maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom component="h2" sx={{ mb: 3 }}>
        Edit Character
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <TextFieldWithFormik<Character> name="name" label="Name" formik={formik} />
          <TextFieldWithFormik<Character> name="height" label="Height (cm)" formik={formik} />
          <TextFieldWithFormik<Character> name="mass" label="Mass (kg)" formik={formik} />
          <SelectWithFormik<Character>
            name="hair_color"
            label="Hair Color"
            options={hairColorOptions}
            formik={formik}
          />
          <SelectWithFormik<Character>
            name="skin_color"
            label="Skin Color"
            options={skinColorOptions}
            formik={formik}
          />
          <SelectWithFormik<Character>
            name="eye_color"
            label="Eye Color"
            options={eyeColorOptions}
            formik={formik}
          />
          <SelectWithFormik<Character>
            name="gender"
            label="Gender"
            options={genderOptions}
            formik={formik}
          />
          <TextFieldWithFormik<Character> name="birth_year" label="Birth Year" formik={formik} />
          <TextFieldWithFormik<Character> name="homeworld" label="Homeworld URL" formik={formik} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <EditableListWithFormik<Character>
            name="films"
            label="Films"
            itemLabel="Film URL"
            formik={formik}
            validation={value => {
              if (!value.trim()) return 'URL is required';
              if (!value.startsWith('http')) return 'URL must start with http';
              return undefined;
            }}
          />
          <EditableListWithFormik<Character>
            name="species"
            label="Species"
            itemLabel="Species URL"
            formik={formik}
            validation={value => {
              if (!value.trim()) return 'URL is required';
              if (!value.startsWith('http')) return 'URL must start with http';
              return undefined;
            }}
          />
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ minWidth: 100 }}>
            Cancel
          </Button>
          <Button
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
