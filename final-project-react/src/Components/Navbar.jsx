import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.css';


const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="light" sticky="top" className="w-100">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/images/logo_jal2.png"
            alt="Logotipo de la comisión estatal del agua Jalisco"
            className="logo"
            style={{ height: '50px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-auto">
            <NavDropdown title="Lago de Chapala" id="navbarDropdownMenuLink" menuVariant="light">
              <NavDropdown.Item href="/#historicos">Histórico</NavDropdown.Item>
              <NavDropdown.Item href="/#ubi-dim">Ubicación y dimensiones</NavDropdown.Item>
              <NavDropdown.Item href="/#batime">Batimetría</NavDropdown.Item>
              <NavDropdown.Item href="/#gale">Galería</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link href="/graficas" className="bold">Gráficas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/datos">Datos</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;