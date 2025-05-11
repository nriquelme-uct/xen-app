import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, Users, FileText, Apple, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin/dashboard" className="d-flex align-items-center">
          <Dumbbell size={24} className="me-2" />
          <span>GymTracker Admin</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/users">Users</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/workout-templates">Workouts</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/nutrition-templates">Nutrition</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="me-3">
              Admin: {user?.name}
            </Navbar.Text>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleLogout} 
              className="d-flex align-items-center"
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

export default AdminNavbar;