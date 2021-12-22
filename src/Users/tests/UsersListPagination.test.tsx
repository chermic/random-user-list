import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { UsersListPagination } from '../UsersListPagination';

describe('UsersListPagination spec', () => {
  const renderUsersListPagination = (
    props?: Partial<React.ComponentProps<typeof UsersListPagination>>
  ) => {
    const defaultProps: React.ComponentProps<typeof UsersListPagination> = {
      currentPage: 1,
      onPageClick: jest.fn(),
      totalPages: 10,
    };

    render(<UsersListPagination {...{ ...defaultProps, ...props }} />);
  };

  test('should select page number passed as active page', () => {
    renderUsersListPagination();

    const activePage = screen.getByText(1);

    expect(activePage).toBeInTheDocument();
    expect(activePage.classList.contains('active')).toBeTruthy();
  });

  test('should invoke passed callback on item click with number of clicked page', () => {
    const onClick = jest.fn();

    renderUsersListPagination({ onPageClick: onClick });

    const firstPage = screen.getByText(1);
    const secondPage = screen.getByText(2);

    expect(firstPage).toBeInTheDocument();
    expect(firstPage.classList.contains('active')).toBeTruthy();
    expect(secondPage).toBeInTheDocument();
    expect(secondPage.classList.contains('active')).toBeFalsy();

    fireEvent.click(secondPage);

    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(2);
  });
});
