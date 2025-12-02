import { Link } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCharacterList, getCharacterListQueryKey } from '@/api/swapi';
import { Box, Pagination } from '@mui/material';
import { type ChangeEvent, useState } from 'react';

export const CharactersPage = () => {
  const [page, setPage] = useState(1);

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
              <p key={project.name}>{project.name}</p>
            ))}
          </div>
        )}
      </Box>
      <Pagination count={maxPage} onChange={handlePageChange} />
    </div>
  );
};
