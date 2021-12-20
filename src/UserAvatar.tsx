import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const UserAvatar = (): JSX.Element => (
  <Card>
    <Image
      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Born in 11/5/1985</span>
      </Card.Meta>
      <Card.Meta>
        <span className="date">mathew@promail.com</span>
      </Card.Meta>
      <Card.Description>Matthew lives in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        silverswan311
      </a>
    </Card.Content>
  </Card>
);

export default UserAvatar;
