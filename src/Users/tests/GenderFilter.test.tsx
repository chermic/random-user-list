import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import capitalize from 'lodash/capitalize';
import { Gender, GenderFilter } from '../GenderFilter';

const renderGenderFilter = (
  props?: Partial<React.ComponentProps<typeof GenderFilter>>
) => {
  const defaultProps: React.ComponentProps<typeof GenderFilter> = {
    onChange: jest.fn(),
    selectedOption: Gender.female,
  };

  render(<GenderFilter {...{ ...defaultProps, ...props }} />);
};

describe('GenderFilter spec', () => {
  test('should render capitalized gender as button text', () => {
    renderGenderFilter({ selectedOption: Gender.female });

    const defaultButton = screen.getByText(capitalize(Gender.female));

    expect(defaultButton).toBeInTheDocument();
  });

  test('should hanve default button to discard filters', () => {
    renderGenderFilter();

    const defaultButton = screen.getByText('All');

    expect(defaultButton).toBeInTheDocument();
  });

  test('should select default button if passed "null" as selected option', () => {
    renderGenderFilter({ selectedOption: null });

    const defaultButton = screen.getByText('All');

    expect(defaultButton).toBeInTheDocument();
    expect(defaultButton.classList.contains('active')).toBeTruthy();
  });

  test.each(Object.values(Gender))(
    'should select "%s" if passed related selected option',
    (gender) => {
      renderGenderFilter({ selectedOption: gender });

      const filterButton = screen.getByText(new RegExp(`^${gender}$`, 'i'));

      expect(filterButton).toBeInTheDocument();
      expect(filterButton.classList.contains('active')).toBeTruthy();
    }
  );

  test('should invoke passed onChange handler with "null" value if clicked by default button', async () => {
    const onChange = jest.fn();
    renderGenderFilter({ onChange });

    const defaultButton = screen.getByText('All');
    const filterButton = screen.getByText(new RegExp(`${Gender.female}`, 'i'));

    expect(filterButton).toBeInTheDocument();
    expect(filterButton.classList.contains('active')).toBeTruthy();
    expect(defaultButton).toBeInTheDocument();
    expect(defaultButton.classList.contains('active')).toBeFalsy();

    fireEvent.click(defaultButton);

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(null);
  });

  test.each(Object.values(Gender))(
    'should invoke passed onChange handler with "%s" value if clicked by appropriate button',
    async (gender) => {
      const onChange = jest.fn();
      renderGenderFilter({ onChange, selectedOption: null });

      const defaultButton = screen.getByText('All');
      const filterButton = screen.getByText(new RegExp(`^${gender}$`, 'i'));

      expect(defaultButton).toBeInTheDocument();
      expect(defaultButton.classList.contains('active')).toBeTruthy();
      expect(filterButton).toBeInTheDocument();
      expect(filterButton.classList.contains('active')).toBeFalsy();

      fireEvent.click(filterButton);

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(gender);
    }
  );
});
