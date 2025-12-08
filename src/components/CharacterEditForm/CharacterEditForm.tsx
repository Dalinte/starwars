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
} from '@mui/material';
import type { CharacterWithId, SelectOptions } from '@/types';
import {
  eyeColorOptions,
  genderOptions,
  hairColorOptions,
  skinColorOptions,
} from '@/consts/selectOptions.ts';

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
});

export const CharacterEditForm = ({ character, onSave, onCancel }: CharacterEditFormProps) => {
  const formik = useFormik({
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
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onSave({
        ...character,
        ...values,
      });
    },
  });

  const renderTextField = (name: keyof typeof formik.values, label: string, type = 'text') => (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      margin="normal"
    />
  );

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

  return (
    <Box sx={{ mt: 2, maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom component="h2" sx={{ mb: 3 }}>
        Edit Character
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {renderTextField('name', 'Name')}
          {renderTextField('height', 'Height (cm)')}
          {renderTextField('mass', 'Mass (kg)')}
          {renderSelectField('hair_color', 'Hair Color', hairColorOptions)}
          {renderSelectField('skin_color', 'Skin Color', skinColorOptions)}
          {renderSelectField('eye_color', 'Eye Color', eyeColorOptions)}
          {renderTextField('birth_year', 'Birth Year')}
          {renderSelectField('gender', 'Gender', genderOptions)}
          {renderTextField('homeworld', 'Homeworld URL')}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
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
