import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, LineChart, Apple, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ClientNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard" className="d-flex align-items-center">
          <Dumbbell size={24} className="me-2" />
          <span>GymTracker</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/workout-log">Workout Log</Nav.Link>
            <Nav.Link as={NavLink} to="/workout-stats">Stats</Nav.Link>
            <Nav.Link as={NavLink} to="/nutrition-plan">Nutrition</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/profile" className="d-flex align-items-center">
              <User size={18} className="me-1" />
              <span>{user?.name || 'Profile'}</span>
            </Nav.Link>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleLogout} 
              className="d-flex align-items-center ms-2"
            >
              <LogOut size={18} className="me-1" />
              <span>Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ClientNavbar;