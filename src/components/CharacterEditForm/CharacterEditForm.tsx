import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Paper,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import type { CharacterWithId, SelectOptions } from '@/types';
import {
  eyeColorOptions,
  genderOptions,
  hairColorOptions,
  skinColorOptions,
} from '@/consts/selectOptions.ts';
import { useState } from 'react';
import { TextFieldWithFormik } from '../TextFieldWithFormik/TextFieldWithFormik';
import type { Character } from '@/api/swapi';

interface CharacterEditFormProps {
  character: CharacterWithId;
  onSave: (updatedCharacter: CharacterWithId) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  height: yup.string().required('Height is required'),
  mass: yup.string().required('Mass is required'),
  hair_color: yup.string().required('Hair color is required'),
  skin_color: yup.string().required('Skin color is required'),
  eye_color: yup.string().required('Eye color is required'),
  birth_year: yup.string().required('Birth year is required'),
  gender: yup.string().required('Gender is required'),
  homeworld: yup.string().required('Homeworld is required'),
  films: yup.array().of(yup.string()).required('Films are required'),
});

export const CharacterEditForm = ({ character, onSave, onCancel }: CharacterEditFormProps) => {
  const [newFilmUrl, setNewFilmUrl] = useState('');

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


  const renderSelectField = (
    name: keyof typeof formik.values,
    label: string,
    options: SelectOptions
  ) => (
    <FormControl
      fullWidth
      margin="normal"
      error={formik.touched[name] && Boolean(formik.errors[name])}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={formik.values[name]}
        label={label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <FormHelperText>{formik.errors[name]}</FormHelperText>
      )}
    </FormControl>
  );

  const handleAddFilm = () => {
    if (newFilmUrl.trim()) {
      formik.setFieldValue('films', [...formik.values.films, newFilmUrl.trim()]);
      setNewFilmUrl('');
    }
  };

  const handleRemoveFilm = (index: number) => {
    const newFilms = [...formik.values.films];
    newFilms.splice(index, 1);
    formik.setFieldValue('films', newFilms);
  };

  const handleFilmChange = (index: number, value: string) => {
    const newFilms = [...formik.values.films];
    newFilms[index] = value;
    formik.setFieldValue('films', newFilms);
  };

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
          {renderSelectField('hair_color', 'Hair Color', hairColorOptions)}
          {renderSelectField('skin_color', 'Skin Color', skinColorOptions)}
          {renderSelectField('eye_color', 'Eye Color', eyeColorOptions)}
          <TextFieldWithFormik<Character> name="birth_year" label="Birth Year" formik={formik} />
          {renderSelectField('gender', 'Gender', genderOptions)}
          <TextFieldWithFormik<Character> name="homeworld" label="Homeworld URL" formik={formik} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Films
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <List dense>
              {formik.values.films.map((film, index) => (
                <div key={index}>
                  <ListItem>
                    <TextField
                      fullWidth
                      size="small"
                      value={film}
                      onChange={e => handleFilmChange(index, e.target.value)}
                      placeholder="Film URL"
                      variant="standard"
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFilm(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < formik.values.films.length - 1 && <Divider component="li" />}
                </div>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={newFilmUrl}
                onChange={e => setNewFilmUrl(e.target.value)}
                placeholder="New film URL"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFilm())}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleAddFilm}
                          disabled={!newFilmUrl.trim()}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ minWidth: 100 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100 }}>
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
