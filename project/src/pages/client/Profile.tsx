import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Save, User } from 'lucide-react';
import ClientLayout from '../../components/layouts/ClientLayout';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    weight: 70,
    height: 175,
    goal: 'build-muscle',
    activityLevel: 'moderate'
  });
  
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the profile data to the server
    // For now, just show a success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  
  return (
    <ClientLayout title="My Profile">
      <Row>
        <Col lg={4} className="mb-4 mb-lg-0">
          <Card className="text-center">
            <Card.Body>
              <div className="py-3">
                <div className="d-flex justify-content-center mb-4">
                  <div className="rounded-circle bg-light p-4 d-inline-flex">
                    <User size={64} className="text-primary" />
                  </div>
                </div>
                <h4>{user?.name}</h4>
                <p className="text-muted">{user?.email}</p>
                <hr />
                <div className="text-start">
                  <p className="mb-1">
                    <strong>Account Type:</strong> {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </p>
                  <p className="mb-1">
                    <strong>Member Since:</strong> August 2025
                  </p>
                  <p className="mb-0">
                    <strong>Last Login:</strong> Today
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Profile Information</h5>
              
              {success && (
                <Alert variant="success" className="mb-4">
                  Profile updated successfully!
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                      />
                      <Form.Text className="text-muted">
                        Email cannot be changed
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="weight">
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        min="30"
                        max="300"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="height">
                      <Form.Label>Height (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        min="100"
                        max="250"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="goal">
                      <Form.Label>Fitness Goal</Form.Label>
                      <Form.Select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                      >
                        <option value="lose-weight">Lose Weight</option>
                        <option value="build-muscle">Build Muscle</option>
                        <option value="maintain">Maintain Fitness</option>
                        <option value="improve-endurance">Improve Endurance</option>
                        <option value="general-fitness">General Fitness</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="activityLevel">
                      <Form.Label>Activity Level</Form.Label>
                      <Form.Select
                        name="activityLevel"
                        value={formData.activityLevel}
                        onChange={handleChange}
                      >
                        <option value="sedentary">Sedentary (little or no exercise)</option>
                        <option value="light">Light (1-3 days/week)</option>
                        <option value="moderate">Moderate (3-5 days/week)</option>
                        <option value="active">Active (6-7 days/week)</option>
                        <option value="very-active">Very Active (professional athlete)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="mt-4 d-flex justify-content-end">
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="d-flex align-items-center"
                  >
                    <Save size={18} className="me-2" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ClientLayout>
  );
};

export default Profile;