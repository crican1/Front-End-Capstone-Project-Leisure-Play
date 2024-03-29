/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Leisure Play</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {/* <Link passHref href="/collection">
              <Nav.Link>Show Collections</Nav.Link>
            </Link>
            <Link passHref href="/collection/new">
              <Nav.Link>Create Collection</Nav.Link>
            </Link> */}
            <Link passHref href="/game">
              <Nav.Link>Show Games</Nav.Link>
            </Link>
            <Link passHref href="/game/new">
              <Nav.Link>Create Game</Nav.Link>
            </Link>
            {/* <Link passHref href="/gameApi">
              <Nav.Link>Game Api</Nav.Link>
            </Link> */}
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
