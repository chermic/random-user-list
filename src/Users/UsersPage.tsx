import { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Card, Dimmer, Loader } from 'semantic-ui-react';

import { User } from '../types';
import { Gender, GenderFilter } from './GenderFilter';
import { UserAvatar } from './UserAvatar';
import { UsersListPagination } from './UsersListPagination';
import styled from 'styled-components';
import { useColumns } from './hooks/useColumns';

type RandomUserResponse = {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: User[];
};

const UsersGridWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const requestUsers = async (
  page: number,
  gender: Gender | null
): Promise<RandomUserResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('page', String(page));
  urlSearchParams.append('results', '10');

  if (gender !== null) {
    urlSearchParams.append('gender', gender);
  }

  return fetch(`https://randomuser.me/api/?${urlSearchParams.toString()}`).then(
    (res) => res.json()
  );
};

const formatDate = (sourceDate: string) => {
  const date = new Date(sourceDate);
  const day = String(date.getDate()).padStart(2);
  const month = String(date.getMonth() + 1).padStart(2);
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

const DEFAULT_PAGE_NUMBER = 1;

export const UsersPage = (): JSX.Element => {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [gender, setGender] = useState<Gender | null>(null);
  const columnsCount = useColumns();

  const usersListRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setPage(page);
    usersListRef.current?.scrollIntoView();
  };

  const handleGenderChange = useCallback((gender: Gender | null) => {
    setGender(gender);
    setPage(DEFAULT_PAGE_NUMBER);
  }, []);

  const { data, error, isError, isFetching } = useQuery({
    queryKey: ['users', page, gender],
    queryFn: () => requestUsers(page, gender),
    keepPreviousData: true,
    onSuccess: (data) => {
      handlePageChange(data.info.page);
    },
  });

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
    if (typeof error === 'string') {
      return <div>{error}</div>;
    }

    return <div>Unknown error occured: {JSON.stringify(error)}</div>;
  }

  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader size="massive" inverted>
          Loading...
        </Loader>
      </Dimmer>
    );
  }

  return (
    <>
      <GenderFilter selectedOption={gender} onChange={handleGenderChange} />
      <UsersGridWrapper ref={usersListRef}>
        <Card.Group stackable centered itemsPerRow={columnsCount}>
          {data?.results.map((user) => (
            <UserAvatar
              key={user.name.last + user.name.last}
              city={user.location.city}
              dob={formatDate(user.dob.date)}
              email={user.email}
              firstName={user.name.first}
              imageSrc={user.picture.large}
              twitter={user.name.last + user.registered.age}
            />
          ))}
        </Card.Group>
      </UsersGridWrapper>

      <UsersListPagination
        currentPage={page}
        onPageClick={handlePageChange}
        totalPages={100}
      />
    </>
  );
};
