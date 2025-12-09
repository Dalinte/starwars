import { TextField, type TextFieldProps } from '@mui/material';
import { useFormikContext, type FormikProps, type FormikValues } from 'formik';

interface TextFieldWithFormikProps<T extends FormikValues> extends Omit<TextFieldProps, 'name'> {
  name: keyof T & string;
  label: string;
  type?: string;
  formik?: FormikProps<T>;
}

export function TextFieldWithFormik<T extends FormikValues>({
  name,
  label,
  type = 'text',
  formik: formikProp,
  ...props
}: TextFieldWithFormikProps<T>) {
  const formikContext = useFormikContext<T>();
  const formik = formikProp || formikContext;
  
  if (!formik) {
    console.error('TextFieldWithFormik must be used within a Formik context or receive formik prop');
    return null;
  }

  const { values, handleChange, handleBlur, touched, errors } = formik;
  const value = values[name];
  const error = touched[name] && (errors[name] as string | undefined);

  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!error}
      helperText={error || ' '}
      margin="normal"
      slotProps={{
        formHelperText: {
          sx: {
            minHeight: '12px',
            display: 'flex',
            alignItems: 'center',
            m: 0,
            mt: 0.5,
            lineHeight: 1.2,
          }
        }
      }}
      sx={{
        '& .MuiFormHelperText-root': {
          opacity: error ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }
      }}
      {...props}
    />
  );
}
