import React from 'react';
import { Card, Icon, Image, List } from 'semantic-ui-react';

type Props = {
  firstName: string;
  dob: string;
  email: string;
  city: string;
  twitter: string;
  imageSrc: string;
};

export const UserAvatar = ({
  city,
  dob,
  email,
  firstName,
  twitter,
  imageSrc,
}: Props): JSX.Element => (
  <Card>
    <Image src={imageSrc} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{firstName}</Card.Header>
      <Card.Meta>
        <span className="date">Born in {dob}</span>
      </Card.Meta>
      <Card.Meta>
        <span className="date">{email}</span>
      </Card.Meta>
      <Card.Description>
        {firstName} lives in {city}.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href="#">
        <Icon name="user" />
        {twitter}
      </a>
    </Card.Content>
  </Card>
);
