import { useCallback, useState } from 'react';
import { Gender, GenderFilter } from './GenderFilter';
import { UsersListPagination } from './UsersListPagination';
import { UsersList } from './UsersList';

const DEFAULT_PAGE_NUMBER = 1;

export const UsersPage = (): JSX.Element => {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [gender, setGender] = useState<Gender | null>(null);

  const handleGenderChange = useCallback((gender: Gender | null) => {
    setGender(gender);
    setPage(DEFAULT_PAGE_NUMBER);
  }, []);

  return (
    <>
      <GenderFilter selectedOption={gender} onChange={handleGenderChange} />
      <UsersList gender={gender} page={page} />
      <UsersListPagination
        currentPage={page}
        onPageClick={setPage}
        totalPages={100}
      />
    </>
  );
};
