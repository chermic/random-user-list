import { render, screen } from '@testing-library/react';
import React from 'react';
import { UserAvatar } from '../UserAvatar';

const defaultProps: React.ComponentProps<typeof UserAvatar> = {
  city: 'city',
  dob: 'dob',
  email: 'email',
  firstName: 'firstName',
  imageSrc: 'imageSrc',
  twitter: 'twitter',
};
const renderUserAvatar = (
  props?: Partial<React.ComponentProps<typeof UserAvatar>>
) => {
  render(<UserAvatar {...{ ...defaultProps, ...props }} />);
};

describe('UserAvatar spec', () => {
  test('should render firstName', () => {
    renderUserAvatar();

    const firstName = screen.getByText(defaultProps.firstName);

    expect(firstName).toBeInTheDocument();
  });

  test('should render span with date of birth', () => {
    renderUserAvatar();

    const dob = screen.getByText(`Born in ${defaultProps.dob}`);

    expect(dob).toBeInTheDocument();
  });

  test('should render span with email', () => {
    renderUserAvatar();

    const email = screen.getByText(defaultProps.email);

    expect(email).toBeInTheDocument();
  });

  test('should render description with firstName and city', () => {
    renderUserAvatar();

    const description = screen.getByText(
      `${defaultProps.firstName} lives in ${defaultProps.city}.`
    );

    expect(description).toBeInTheDocument();
  });

  test('should render link with twitter url', () => {
    renderUserAvatar();

    const twitterUrl = screen.getByText(defaultProps.twitter);

    expect(twitterUrl).toBeInTheDocument();
  });
});
