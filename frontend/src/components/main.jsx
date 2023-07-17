import { Link, Outlet } from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
const Main = () => {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
          <Button as={Link} to='/login'>Login</Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Main;