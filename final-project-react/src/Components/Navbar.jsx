import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToSection = (hash) => {
    if (location.pathname !== '/') {
      // Redirige al root si no estás en `/`
      navigate('/');
      setTimeout(() => {
        window.location.hash = hash; // Asigna el hash después de la redirección
      }, 100); // Pequeño retraso para asegurar que el componente se haya cargado
    } else {
      // Si ya estás en `/`, usa el hash directamente
      window.location.hash = hash;
    }
  };

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
              <NavDropdown.Item onClick={() => handleNavigateToSection('#historicos')}>
                Histórico
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigateToSection('#ubi-dim')}>
                Ubicación y dimensiones
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigateToSection('#batime')}>
                Batimetría
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigateToSection('#gale')}>
                Galería
              </NavDropdown.Item>
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

