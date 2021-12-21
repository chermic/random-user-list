import { Pagination } from 'semantic-ui-react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageClick(page: number): void;
};

export const UsersListPagination = ({
  currentPage,
  onPageClick,
  totalPages,
}: Props): JSX.Element => (
  <Pagination
    activePage={currentPage}
    totalPages={totalPages}
    onPageChange={(event, data) =>
      onPageClick(Number(data.activePage) ?? currentPage)
    }
  />
);
