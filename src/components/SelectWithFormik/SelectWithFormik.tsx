import { FormControl, InputLabel, Select, MenuItem, FormHelperText, type SelectProps } from '@mui/material';
import { useFormikContext, type FormikProps, type FormikValues } from 'formik';
import type { SelectOptions } from '@/types';

interface SelectWithFormikProps<T extends FormikValues> extends Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
  name: keyof T & string;
  label: string;
  options: SelectOptions;
  formik?: FormikProps<T>;
}

export function SelectWithFormik<T extends FormikValues>({
  name,
  label,
  options,
  formik: formikProp,
  ...props
}: SelectWithFormikProps<T>) {
  const formikContext = useFormikContext<T>();
  const formik = formikProp || formikContext;
  
  if (!formik) {
    console.error('SelectWithFormik must be used within a Formik context or receive formik prop');
    return null;
  }

  const { values, handleChange, handleBlur, touched, errors } = formik;
  const value = values[name];
  const error = touched[name] ? (errors[name] as string | undefined) : undefined;
  const labelId = `${name}-label`;

  return (
    <FormControl 
      fullWidth 
      margin="normal" 
      error={!!error}
      variant={props.variant || 'outlined'}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        name={name}
        value={value || ''}
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {<FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
