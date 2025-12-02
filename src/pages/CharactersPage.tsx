import { Box, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCharacterList } from '@/hooks/useCharacterList.ts';

export const CharactersPage = () => {
  const navigate = useNavigate();

  const { maxPage, characterList, isLoading, isError, error, handlePageChange } =
    useCharacterList();

  return (
    <div>
      <h1>Characters</h1>
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
