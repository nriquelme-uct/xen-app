import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Users, Dumbbell, ArrowUpRight, Calendar } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';

const AdminDashboard: React.FC = () => {
  // Mock data for admin dashboard
  const userStats = {
    total: 48,
    active: 32,
    new: 5
  };
  
  const workoutStats = {
    total: 156,
    thisWeek: 42,
    mostPopular: 'Strength'
  };
  
  const recentUsers = [
    { id: '103', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', joined: '2025-08-01' },
    { id: '104', name: 'Mike Peterson', email: 'mike@example.com', status: 'active', joined: '2025-07-29' },
    { id: '105', name: 'Emma Wilson', email: 'emma@example.com', status: 'inactive', joined: '2025-07-25' }
  ];
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <AdminLayout title="Admin Dashboard">
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Users</h6>
                  <h3 className="fw-bold mb-0">{userStats.total}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <Users size={24} className="text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <small className="text-success d-flex align-items-center">
                  <ArrowUpRight size={16} className="me-1" />
                  <span>+{userStats.new} new this week</span>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Active Users</h6>
                  <h3 className="fw-bold mb-0">{userStats.active}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <Users size={24} className="text-success" />
                </div>
              </div>
              <div className="mt-3">
                <small className="text-muted">
                  {Math.round((userStats.active / userStats.total) * 100)}% of total users
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Workouts</h6>
                  <h3 className="fw-bold mb-0">{workoutStats.total}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <Dumbbell size={24} className="text-info" />
                </div>
              </div>
              <div className="mt-3">
                <small className="text-success d-flex align-items-center">
                  <ArrowUpRight size={16} className="me-1" />
                  <span>{workoutStats.thisWeek} this week</span>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Popular Type</h6>
                  <h3 className="fw-bold mb-0">{workoutStats.mostPopular}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <Dumbbell size={24} className="text-warning" />
                </div>
              </div>
              <div className="mt-3">
                <small className="text-muted">Most popular workout type</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Recent User Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="d-flex p-3 border-bottom align-items-center">
                <div className="bg-light rounded-circle p-3 me-3">
                  <Dumbbell size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">New workout added</h6>
                  <p className="text-muted small mb-0">User: John Client · Type: Strength · 45 minutes</p>
                </div>
                <div className="ms-auto">
                  <small className="text-muted">Today, 14:30</small>
                </div>
              </div>
              
              <div className="d-flex p-3 border-bottom align-items-center">
                <div className="bg-light rounded-circle p-3 me-3">
                  <Users size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="mb-0">New user registered</h6>
                  <p className="text-muted small mb-0">User: Sarah Johnson · sarah@example.com</p>
                </div>
                <div className="ms-auto">
                  <small className="text-muted">Today, 10:15</small>
                </div>
              </div>
              
              <div className="d-flex p-3 border-bottom align-items-center">
                <div className="bg-light rounded-circle p-3 me-3">
                  <Calendar size={24} className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">User updated profile</h6>
                  <p className="text-muted small mb-0">User: Mike Peterson · Updated training goals</p>
                </div>
                <div className="ms-auto">
                  <small className="text-muted">Yesterday, 16:45</small>
                </div>
              </div>
              
              <div className="d-flex p-3 align-items-center">
                <div className="bg-light rounded-circle p-3 me-3">
                  <Dumbbell size={24} className="text-warning" />
                </div>
                <div>
                  <h6 className="mb-0">Workout template created</h6>
                  <p className="text-muted small mb-0">Admin created "Full Body Strength" template</p>
                </div>
                <div className="ms-auto">
                  <small className="text-muted">Yesterday, 09:30</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Recent Users</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div>
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${user.status === 'active' ? 'success' : 'secondary'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{formatDate(user.joined)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;