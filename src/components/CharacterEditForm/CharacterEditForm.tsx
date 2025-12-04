import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { type Character } from '@/api/swapi';

interface CharacterEditFormProps {
  character: Character;
  onSave: (updatedCharacter: Character) => void;
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

  return (
    <Box sx={{ mt: 2, maxWidth: 600, mx: 'auto', p: 3, boxShadow: 1, borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom component="h2" sx={{ mb: 3 }}>
        Edit Character
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {renderTextField('name', 'Name')}
          {renderTextField('height', 'Height (cm)')}
          {renderTextField('mass', 'Mass (kg)')}
          {renderTextField('hair_color', 'Hair Color')}
          {renderTextField('skin_color', 'Skin Color')}
          {renderTextField('eye_color', 'Eye Color')}
          {renderTextField('birth_year', 'Birth Year')}
          {renderTextField('gender', 'Gender')}
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
