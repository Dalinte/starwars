import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { Box, Pagination, Typography } from '@mui/material';
import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const getCharacterListWithPage = (page: number) => {
    return getCharacterList({
      query: {
        page: page,
      },
    });
  };

  const { data, isPending, isError, error } = useQuery({
    queryFn: () => getCharacterListWithPage(page),
    queryKey: [getCharacterListQueryKey(), page],
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const maxPage = Math.ceil(Number(data?.data?.count) / 10);

  console.log(data, isError, error);

  return (
    <div>
      <h1>Characters</h1>
      <Box>
        {isPending ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data?.data?.results?.map(project => (
              <Typography 
                key={project.name} 
                onClick={() => navigate(`/characters/${project.url.split('/').filter(Boolean).pop()}`)}
                sx={{ 
                  cursor: 'pointer', 
                  '&:hover': { 
                    textDecoration: 'underline',
                    color: 'primary.main'
                  } 
                }}
              >
                {project.name}
              </Typography>
            ))}
          </div>
        )}
      </Box>
      <Pagination count={maxPage} onChange={handlePageChange} />
    </div>
  );
};
