import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCharacterList } from '@/hooks/useCharacterList.ts';
import { useState } from 'react';

export const CharactersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { maxPage, characterList, isLoading, isError, error, handlePageChange } =
    useCharacterList(searchQuery);

  return (
    <div>
      <h1>Characters</h1>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search characters"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter character name"
          sx={{ maxWidth: 400 }}
        />
      </Box>
      <Box>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error?.message}</div>
        ) : (
          <div>
            {characterList.map(character => (
              <Typography
                key={character.name}
                onClick={() =>
                  navigate(`/characters/${character.url.split('/').filter(Boolean).pop()}`)
                }
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main',
                  },
                }}
              >
                {character.name}
              </Typography>
            ))}
          </div>
        )}
      </Box>
      <Pagination count={maxPage} onChange={handlePageChange} />
    </div>
  );
};
