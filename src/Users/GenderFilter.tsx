import { Button } from 'semantic-ui-react';

export enum Gender {
  male = 'male',
  female = 'female',
}

type Props = {
  selectedOption: Gender | null;
  onChange(gender: Gender | null): void;
};

const capitalize = (data: string) => data[0].toUpperCase() + data.slice(1);

export const GenderFilter = ({
  selectedOption,
  onChange,
}: Props): JSX.Element => (
  <Button.Group>
    <Button active={selectedOption === null} onClick={() => onChange(null)}>
      All
    </Button>
    {Object.values(Gender).map((gender) => (
      <Button
        key={gender}
        active={gender === selectedOption}
        onClick={() => onChange(gender)}
      >
        {capitalize(gender)}
      </Button>
    ))}
  </Button.Group>
);
