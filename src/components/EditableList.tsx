import { useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  itemLabel?: string;
  addButtonText?: string;
  validation?: (value: string) => string | undefined;
}

export const EditableList = ({
  items,
  onChange,
  label,
  itemLabel = 'Item',
  validation,
}: EditableListProps) => {
  const [newItem, setNewItem] = useState('');
  const [errors, setErrors] = useState<Record<number, string>>({});

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    const error = validation?.(newItem);
    if (error) {
      setErrors(prev => ({ ...prev, [items.length]: error }));
      return;
    }

    onChange([...items, newItem.trim()]);
    setNewItem('');
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[items.length];
      return newErrors;
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    // Shift errors up when removing an item
    setErrors(prev => {
      const newErrors: Record<number, string> = {};
      Object.entries(prev).forEach(([i, error]) => {
        const idx = Number(i);
        if (idx < index) newErrors[idx] = error;
        if (idx > index) newErrors[idx - 1] = error;
      });
      return newErrors;
    });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);

    if (validation) {
      const error = validation(value);
      setErrors(prev => ({
        ...prev,
        [index]: error,
      }));
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <List dense>
          {items.map((item, index) => (
            <div key={index}>
              <ListItem>
                <TextField
                  fullWidth
                  size="small"
                  value={item}
                  onChange={e => handleItemChange(index, e.target.value)}
                  placeholder={`${itemLabel} ${index + 1}`}
                  variant="standard"
                  error={Boolean(errors[index])}
                  helperText={errors[index]}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < items.length - 1 && <Divider component="li" />}
            </div>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder={`New ${itemLabel.toLowerCase()}`}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
            error={Boolean(errors[items.length])}
            helperText={errors[items.length]}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleAddItem} disabled={!newItem.trim()}>
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
  );
};
