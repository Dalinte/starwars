import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  height: yup.string().required('Height is required').matches(/^[0-9]+$/, 'Height must be a number'),
  mass: yup.string().required('Mass is required').matches(/^[0-9]+$/, 'Mass must be a number'),
  hair_color: yup.string().required('Hair color is required'),
  skin_color: yup.string().required('Skin color is required'),
  eye_color: yup.string().required('Eye color is required'),
  birth_year: yup.string().required('Birth year is required'),
  gender: yup.string().required('Gender is required'),
  homeworld: yup.string().required('Homeworld is required'),
  films: yup.array().of(yup.string()).required('Films are required'),
});
