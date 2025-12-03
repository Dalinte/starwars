import {
  InputAdornment,
  OutlinedInput,
  type OutlinedInputProps,
  type SxProps,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { type ChangeEvent } from 'react';

interface SearchProps extends Omit<OutlinedInputProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: SxProps;
}

export const Search = ({ value, onChange, placeholder = 'Search…', ...props }: SearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <OutlinedInput
      size="small"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start" sx={{ color: 'text.primary' }}>
          <SearchRoundedIcon fontSize="small" />
        </InputAdornment>
      }
      inputProps={{
        'aria-label': 'search',
        ...props.inputProps,
      }}
      {...props}
    />
  );
};
