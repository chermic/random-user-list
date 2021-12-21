import { Container } from 'semantic-ui-react';
import { Footer } from './Footer';
import { UsersPage } from './Users/UsersPage';

export const App = (): JSX.Element => {
  return (
    <>
      <Container style={{ margin: 20 }}>
        <UsersPage />
      </Container>
      <Footer />
    </>
  );
};
