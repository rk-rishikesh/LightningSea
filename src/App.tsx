import React, { ReactNode } from 'react';
import { Alert, Badge, Container, Dropdown, Nav, Navbar, NavLink } from 'react-bootstrap';
import Confetti from 'react-confetti';
import { observer } from 'mobx-react-lite';
import Connect from './pages/Connect';
import Upload from './pages/Upload';
import PostList from './pages/PostList';
import { useStore } from './store/Provider';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Marketplace from './pages/MarketPlace';
import Wall from './pages/Wall';


function App() {
  const store = useStore();

  const pages: Record<string, ReactNode> = {
    posts: <PostList />,
    create: <Upload />,
    connect: <Connect />,
    home: <Home />,
    browse: <Browse />,
    marketplace: <Marketplace />,
    wall: <Wall />
  };

  // Assumptions
  //  1. BOB : Photographer

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" >
        <Navbar.Brand onClick={store.gotoHome}>
          Lightning Sea
        </Navbar.Brand>

          <Nav className="me-auto">
          <Nav.Link onClick={store.gotoWall}>My Wall</Nav.Link>
            <Nav.Link onClick={store.gotoCreate}>Create</Nav.Link>
            <Nav.Link onClick={store.gotoMarketPlace}>Marketplace</Nav.Link>

          </Nav>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!store.connected ? (
              <Nav.Item>
                <NavLink onClick={store.gotoConnect}>Connect to LND</NavLink>
              </Nav.Item>
            ) : (
              <>
                <Navbar.Text>
                  <Badge variant="info" pill className="mr-3">
                    {store.balance.toLocaleString()} sats
                  </Badge>
                </Navbar.Text>
                <Dropdown id="basic-nav-dropdown" alignRight>
                  <Dropdown.Toggle as={NavLink} style={{color:"white"}}>Hello, {store.alias.toUpperCase()} !!</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={store.disconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="my-3">
        <div>
          {store.error && (
            <Alert variant="danger" dismissible onClose={store.clearError}>
              {store.error}
            </Alert>
          )}
          {!store.connected ? (
            <h1>
              {pages[store.page]}
            </h1>
          ) : (
            <>
              {pages[store.page]}
            </>

          )
          }
          {/* {pages[store.page]} */}
        </div>
      </Container>
      <Confetti numberOfPieces={store.makeItRain ? 1000 : 0} />
    </>
  );
}

export default observer(App);
