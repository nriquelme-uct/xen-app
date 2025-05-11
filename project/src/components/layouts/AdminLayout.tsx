import React from 'react';
import { Container } from 'react-bootstrap';
import AdminNavbar from '../navigation/AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />
      <main className="flex-grow-1 py-4">
        <Container>
          {title && (
            <div className="mb-4">
              <h1 className="fw-bold">{title}</h1>
              <hr className="my-3" />
            </div>
          )}
          {children}
        </Container>
      </main>
      <footer className="bg-light py-3 mt-auto">
        <Container>
          <p className="text-center text-muted mb-0">
            &copy; {new Date().getFullYear()} GymTracker App - Admin Panel
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default AdminLayout;