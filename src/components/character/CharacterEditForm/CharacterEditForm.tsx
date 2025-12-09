import { useFormik } from 'formik';
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  Height as HeightIcon,
  Scale as ScaleIcon,
  Palette as PaletteIcon,
  Visibility as EyeIcon,
  Wc as GenderIcon,
  Cake as CakeIcon,
  Language as WorldIcon,
  Movie as MovieIcon,
  Pets as SpeciesIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import type { CharacterWithId } from '@/types';
import {
  eyeColorOptions,
  genderOptions,
  hairColorOptions,
  skinColorOptions,
} from '@/consts/selectOptions';
import { TextFieldWithFormik } from '@/components/form/TextFieldWithFormik';
import type { Character } from '@/api/swapi';
import { SelectWithFormik } from '@/components/form/SelectWithFormik';
import { EditableListWithFormik } from '@/components/form/EditableListWithFormik';
import { validationSchema } from './validationSchema';

interface CharacterEditFormProps {
  character: CharacterWithId;
  onSave: (updatedCharacter: CharacterWithId) => void;
  onCancel: () => void;
}

export const CharacterEditForm = ({ character, onSave, onCancel }: CharacterEditFormProps) => {
  const formik = useFormik<Character>({
    initialValues: {
      ...character
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
    <Paper elevation={0} sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon fontSize="large" />
        Edit Character
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="primary" />
              Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container columnSpacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldWithFormik<Character>
                  name="name"
                  label="Name"
                  formik={formik}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
                <TextFieldWithFormik<Character>
                  name="birth_year"
                  label="Birth Year"
                  formik={formik}
                  InputProps={{
                    startAdornment: <CakeIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldWithFormik<Character>
                  name="height"
                  label="Height (cm)"
                  formik={formik}
                  InputProps={{
                    startAdornment: <HeightIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
                <SelectWithFormik<Character>
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  formik={formik}
                  inputProps={{
                    startAdornment: <GenderIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldWithFormik<Character>
                  name="mass"
                  label="Mass (kg)" 
                  formik={formik}
                  fullWidth
                  InputProps={{
                    startAdornment: <ScaleIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon color="primary" />
              Appearance
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid size={{ xs: 12, md: 6 }}>
              <SelectWithFormik<Character>
                name="hair_color"
                label="Hair Color"
                options={hairColorOptions}
                formik={formik}
                fullWidth
              />
              <SelectWithFormik<Character>
                name="skin_color"
                label="Skin Color"
                options={skinColorOptions}
                formik={formik}
                fullWidth
              />
              <SelectWithFormik<Character>
                name="eye_color"
                label="Eye Color"
                options={eyeColorOptions}
                formik={formik}
                fullWidth
                inputProps={{
                  startAdornment: <EyeIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorldIcon color="primary" />
              Homeworld
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <TextFieldWithFormik<Character>
                name="homeworld"
                label="Homeworld URL"
                formik={formik}
                fullWidth
                InputProps={{
                  startAdornment: <WorldIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MovieIcon color="primary" />
                Films
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add or remove film URLs associated with this character
              </Typography>
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
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SpeciesIcon color="primary" />
                Species
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add or remove species URLs associated with this character
              </Typography>
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
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={onCancel} 
            startIcon={<CancelIcon />}
            sx={{ minWidth: 140, py: 1 }}
          >
            Cancel
          </Button>
          <Button
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ minWidth: 140, py: 1 }}
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
