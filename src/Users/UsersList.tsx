import { useQuery } from 'react-query';
import { Card, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { Gender, User } from '../types';
import { UserAvatar } from './UserAvatar';

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
  // urlSearchParams.append('seed', `${gender}_${page}`);

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
  const year = String(date.getFullYear()).padStart(2);

  return `${day}/${month}/${year}`;
};

type Props = {
  gender: Gender | null;
  page: number;
};

export const UsersList = ({ page, gender }: Props): JSX.Element => {
  const { data, error, isError, isFetching } = useQuery({
    queryKey: ['users', page, gender],
    queryFn: () => requestUsers(page, gender),
    keepPreviousData: true,
  });

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }

    return <div>Unknown error occured: {JSON.stringify(error)}</div>;
  }

  if (isFetching) {
    return (
      <Dimmer active inverted>
        <Loader size="massive" inverted>
          Loading
        </Loader>
      </Dimmer>
    );
  }

  return (
    <UsersGridWrapper>
      <Card.Group stackable centered>
        {data?.results.map((user) => (
          <UserAvatar
            key={user.name.last}
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
  );
};
