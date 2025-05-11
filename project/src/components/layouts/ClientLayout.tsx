import React from 'react';
import { Container } from 'react-bootstrap';
import ClientNavbar from '../navigation/ClientNavbar';

interface ClientLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, title }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ClientNavbar />
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
            &copy; {new Date().getFullYear()} GymTracker App
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default ClientLayout;