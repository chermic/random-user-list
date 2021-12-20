import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from 'semantic-ui-react';
import { User } from './types';
import { UserAvatar } from './UserAvatar';

type Props = {
  children: React.ReactChild[];
};

type RandomUserResponse = {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: User[];
};

const requestUsers = async (page: number): Promise<RandomUserResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('page', String(page));

  return fetch(`https://randomuser.me/api/?${urlSearchParams.toString()}`).then(
    (res) => res.json()
  );
};

const formatDate = (sourceDate: string) => {
  const date = new Date(sourceDate);
  const day = String(date.getDate()).padStart(2);
  const month = String(date.getMonth() + 1).padStart(2);
  const year = String(date.getFullYear()).padStart(2);

  return `${day}/${month}/${year}`;
};

export const App = (): JSX.Element => {
  const [page, setPage] = useState(0);

  const { data, error, isError, isFetching, isLoading } = useQuery({
    queryFn: () => requestUsers(page),
    getNextPageParam: (lastPage, allPages) => {},
    getPreviousPageParam: (firstPage, allPages) => {},
  });

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }

    return <div>Unknown error occured: {JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <Container style={{ margin: 20 }}>
      {data?.results.map((user) => (
        <UserAvatar
          key={user.id.value}
          city={user.location.city}
          dob={formatDate(user.dob.date)}
          email={user.email}
          firstName={user.name.first}
          imageSrc={user.picture.medium}
          twitter={user.name.last + user.registered.age}
        />
      ))}
    </Container>
  );
};
