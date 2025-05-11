import React, { useState } from 'react';
import { Row, Col, Card, Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import { PlusCircle, Edit, Trash, Save, X } from 'lucide-react';
import ClientLayout from '../../components/layouts/ClientLayout';
import { useWorkout, WorkoutEntry, Exercise } from '../../hooks/useWorkout';

const WorkoutLog: React.FC = () => {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkout();
  const [showModal, setShowModal] = useState(false);
  const [editWorkoutId, setEditWorkoutId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Omit<WorkoutEntry, 'id'>>({
    userId: '1', // Hardcoded for demo, should come from authenticated user
    date: new Date().toISOString().split('T')[0],
    type: 'Strength',
    duration: 60,
    caloriesBurned: 300,
    exercises: [{ name: '', sets: 3, reps: 10, weight: 0 }],
    notes: ''
  });
  
  // Handle adding/updating a workout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.date || !formData.type || formData.duration <= 0) {
      setValidationError('Please fill in all required fields');
      return;
    }
    
    // Validate exercises
    if (!formData.exercises.length || formData.exercises.some(ex => !ex.name)) {
      setValidationError('Please add at least one exercise with a name');
      return;
    }
    
    if (editWorkoutId) {
      updateWorkout(editWorkoutId, formData);
    } else {
      addWorkout(formData);
    }
    
    handleCloseModal();
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' ? parseInt(value) : value
    }));
  };
  
  // Handle exercise changes
  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const updatedExercises = [...formData.exercises];
    
    if (field === 'name') {
      updatedExercises[index].name = value as string;
    } else {
      updatedExercises[index][field] = typeof value === 'string' ? parseInt(value) : value;
    }
    
    setFormData(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
  };
  
  // Add a new exercise to form
  const addExerciseField = () => {
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: 3, reps: 10, weight: 0 }]
    }));
  };
  
  // Remove an exercise from form
  const removeExerciseField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };
  
  // Open modal for adding new workout
  const handleAddWorkout = () => {
    setFormData({
      userId: '1',
      date: new Date().toISOString().split('T')[0],
      type: 'Strength',
      duration: 60,
      caloriesBurned: 300,
      exercises: [{ name: '', sets: 3, reps: 10, weight: 0 }],
      notes: ''
    });
    setEditWorkoutId(null);
    setValidationError(null);
    setShowModal(true);
  };
  
  // Open modal for editing existing workout
  const handleEditWorkout = (workout: WorkoutEntry) => {
    const { id, ...workoutData } = workout;
    setFormData(workoutData);
    setEditWorkoutId(id);
    setValidationError(null);
    setShowModal(true);
  };
  
  // Close modal and reset form state
  const handleCloseModal = () => {
    setShowModal(false);
    setEditWorkoutId(null);
    setValidationError(null);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <ClientLayout title="Workout Log">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="primary" 
            className="d-flex align-items-center" 
            onClick={handleAddWorkout}
          >
            <PlusCircle size={18} className="me-2" />
            <span>Add New Workout</span>
          </Button>
        </Col>
      </Row>
      
      {sortedWorkouts.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <div className="mb-3">
              <Dumbbell size={48} className="text-muted" />
            </div>
            <h5>No Workouts Yet</h5>
            <p className="text-muted">Start tracking your fitness journey by adding your first workout.</p>
            <Button variant="primary" onClick={handleAddWorkout}>Add Workout</Button>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Exercises</th>
                    <th>Calories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWorkouts.map(workout => (
                    <tr key={workout.id}>
                      <td>{formatDate(workout.date)}</td>
                      <td>{workout.type}</td>
                      <td>{workout.duration} min</td>
                      <td>{workout.exercises.length} exercises</td>
                      <td>{workout.caloriesBurned} kcal</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditWorkout(workout)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => deleteWorkout(workout.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
      
      {/* Add/Edit Workout Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editWorkoutId ? 'Edit Workout' : 'Add New Workout'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="workoutDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="workoutType">
                  <Form.Label>Workout Type</Form.Label>
                  <Form.Select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="workoutDuration">
                  <Form.Label>Duration (minutes)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="duration" 
                    value={formData.duration} 
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group controlId="workoutCalories" className="mb-3">
              <Form.Label>Calories Burned</Form.Label>
              <Form.Control 
                type="number" 
                name="caloriesBurned" 
                value={formData.caloriesBurned} 
                onChange={handleInputChange}
                min="0"
              />
            </Form.Group>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="mb-0">Exercises</Form.Label>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={addExerciseField}
                  className="d-flex align-items-center"
                >
                  <PlusCircle size={16} className="me-1" />
                  <span>Add Exercise</span>
                </Button>
              </div>
              
              {formData.exercises.map((exercise, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      <Col md={4}>
                        <Form.Group controlId={`exercise-name-${index}`}>
                          <Form.Label className="small">Exercise Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={exercise.name} 
                            onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                            placeholder="e.g., Bench Press"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId={`exercise-sets-${index}`}>
                          <Form.Label className="small">Sets</Form.Label>
                          <Form.Control 
                            type="number" 
                            value={exercise.sets} 
                            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                            min="1"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId={`exercise-reps-${index}`}>
                          <Form.Label className="small">Reps</Form.Label>
                          <Form.Control 
                            type="number" 
                            value={exercise.reps} 
                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                            min="1"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId={`exercise-weight-${index}`}>
                          <Form.Label className="small">Weight (kg)</Form.Label>
                          <Form.Control 
                            type="number" 
                            value={exercise.weight} 
                            onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                            min="0"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs="auto" className="ps-0">
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => removeExerciseField(index)}
                          disabled={formData.exercises.length <= 1}
                        >
                          <X size={16} />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
            
            <Form.Group controlId="workoutNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control 
                as="textarea" 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange}
                rows={3}
                placeholder="How did the workout feel? Any achievements or challenges?"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="d-flex align-items-center"
            >
              <Save size={16} className="me-1" />
              <span>{editWorkoutId ? 'Update' : 'Save'} Workout</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </ClientLayout>
  );
};

export default WorkoutLog;