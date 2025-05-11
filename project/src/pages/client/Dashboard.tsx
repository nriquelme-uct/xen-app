import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Calendar, Dumbbell, Flame, Trophy } from 'lucide-react';
import ClientLayout from '../../components/layouts/ClientLayout';
import { useWorkout } from '../../hooks/useWorkout';
import { useAuth } from '../../hooks/useAuth';
import WorkoutActivityChart from '../../components/charts/WorkoutActivityChart';

const ClientDashboard: React.FC = () => {
  const { workouts } = useWorkout();
  const { user } = useAuth();
  
  // Calculate dashboard statistics
  const totalWorkouts = workouts.length;
  const totalCaloriesBurned = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
  const averageWorkoutDuration = workouts.length > 0 
    ? Math.round(workouts.reduce((sum, workout) => sum + workout.duration, 0) / workouts.length) 
    : 0;
  
  // Get recent workouts (up to 3)
  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
    
  return (
    <ClientLayout title={`Welcome, ${user?.name?.split(' ')[0] || 'User'}`}>
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="stat-card stat-workouts h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Dumbbell size={36} className="text-primary" />
                </div>
                <div>
                  <h2 className="mb-0">{totalWorkouts}</h2>
                  <p className="text-muted mb-0">Total Workouts</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="stat-card stat-calories h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Flame size={36} className="text-success" />
                </div>
                <div>
                  <h2 className="mb-0">{totalCaloriesBurned}</h2>
                  <p className="text-muted mb-0">Calories Burned</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="stat-card stat-progress h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Calendar size={36} className="text-info" />
                </div>
                <div>
                  <h2 className="mb-0">{averageWorkoutDuration}</h2>
                  <p className="text-muted mb-0">Avg. Minutes</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6}>
          <Card className="stat-card stat-achievements h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Trophy size={36} className="text-warning" />
                </div>
                <div>
                  <h2 className="mb-0">3</h2>
                  <p className="text-muted mb-0">Achievements</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-transparent">
              <h5 className="mb-0">Weekly Activity</h5>
            </Card.Header>
            <Card.Body>
              <WorkoutActivityChart />
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header className="bg-transparent">
              <h5 className="mb-0">Recent Workouts</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {recentWorkouts.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentWorkouts.map(workout => (
                    <div key={workout.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{workout.type} Workout</h6>
                        <small>{new Date(workout.date).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1">{workout.exercises.length} exercises · {workout.duration} min</p>
                      <small className="text-muted">{workout.caloriesBurned} calories burned</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted mb-0">No recent workouts. Add one now!</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ClientLayout>
  );
};

export default ClientDashboard;