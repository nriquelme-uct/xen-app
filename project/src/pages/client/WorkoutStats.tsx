import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale, 
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip,
  Legend 
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import ClientLayout from '../../components/layouts/ClientLayout';
import { useWorkout } from '../../hooks/useWorkout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutStats: React.FC = () => {
  const { workouts } = useWorkout();
  const [chartTimeframe, setChartTimeframe] = useState('week');
  
  // Process data for workout type distribution
  const workoutTypes = workouts.reduce<Record<string, number>>((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {});
  
  const typeLabels = Object.keys(workoutTypes);
  const typeData = Object.values(workoutTypes);
  
  // Colors for workout types
  const typeColors = [
    'rgba(54, 162, 235, 0.7)',  // Blue
    'rgba(255, 99, 132, 0.7)',  // Red
    'rgba(255, 206, 86, 0.7)',  // Yellow
    'rgba(75, 192, 192, 0.7)',  // Green
    'rgba(153, 102, 255, 0.7)', // Purple
    'rgba(255, 159, 64, 0.7)',  // Orange
  ];
  
  const typeBorderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
  
  // Get weekly or monthly data for workouts duration chart
  const getDurationData = () => {
    const now = new Date();
    let labels: string[] = [];
    let durationData: number[] = [];
    
    if (chartTimeframe === 'week') {
      // Weekly data (past 7 days)
      labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      });
      
      durationData = labels.map((_, index) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - index));
        d.setHours(0, 0, 0, 0);
        
        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        
        const dayWorkouts = workouts.filter(w => {
          const workoutDate = new Date(w.date);
          return workoutDate >= d && workoutDate < nextDay;
        });
        
        return dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
      });
    } else {
      // Monthly data (past 30 days in weekly chunks)
      labels = Array.from({ length: 4 }, (_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (21 - (i * 7)));
        return `Week ${i + 1}`;
      });
      
      durationData = labels.map((_, index) => {
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - (28 - index * 7));
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        
        const weekWorkouts = workouts.filter(w => {
          const workoutDate = new Date(w.date);
          return workoutDate >= startDate && workoutDate < endDate;
        });
        
        return weekWorkouts.reduce((sum, w) => sum + w.duration, 0);
      });
    }
    
    return { labels, durationData };
  };
  
  // Get data for calories chart
  const getCaloriesData = () => {
    const { labels } = getDurationData();
    
    const caloriesData = labels.map((_, index) => {
      const d = new Date(now);
      
      if (chartTimeframe === 'week') {
        d.setDate(d.getDate() - (6 - index));
        d.setHours(0, 0, 0, 0);
        
        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        
        const dayWorkouts = workouts.filter(w => {
          const workoutDate = new Date(w.date);
          return workoutDate >= d && workoutDate < nextDay;
        });
        
        return dayWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
      } else {
        d.setDate(d.getDate() - (28 - index * 7));
        d.setHours(0, 0, 0, 0);
        
        const endDate = new Date(d);
        endDate.setDate(d.getDate() + 7);
        
        const weekWorkouts = workouts.filter(w => {
          const workoutDate = new Date(w.date);
          return workoutDate >= d && workoutDate < endDate;
        });
        
        return weekWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
      }
    });
    
    return { labels, caloriesData };
  };
  
  const now = new Date();
  
  // Duration chart data and options
  const { labels: durationLabels, durationData } = getDurationData();
  
  const durationChartData = {
    labels: durationLabels,
    datasets: [
      {
        label: 'Training Duration (minutes)',
        data: durationData,
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
  
  const durationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y} minutes`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes',
        },
      },
    },
  };
  
  // Calories chart data and options
  const { labels: caloriesLabels, caloriesData } = getCaloriesData();
  
  const caloriesChartData = {
    labels: caloriesLabels,
    datasets: [
      {
        label: 'Calories Burned',
        data: caloriesData,
        borderColor: 'rgba(220, 53, 69, 1)',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const caloriesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y} calories`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories',
        },
      },
    },
  };
  
  // Workout type chart data and options
  const typeChartData = {
    labels: typeLabels,
    datasets: [
      {
        data: typeData,
        backgroundColor: typeColors.slice(0, typeLabels.length),
        borderColor: typeBorderColors.slice(0, typeLabels.length),
        borderWidth: 1,
      },
    ],
  };
  
  const typeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label;
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };
  
  // Prepare exercise summary data (most common exercises)
  const exerciseSummary = workouts.reduce<Record<string, { count: number, totalWeight: number, totalReps: number }>>((acc, workout) => {
    workout.exercises.forEach(exercise => {
      if (!exercise.name) return;
      
      if (!acc[exercise.name]) {
        acc[exercise.name] = { count: 0, totalWeight: 0, totalReps: 0 };
      }
      
      acc[exercise.name].count += 1;
      acc[exercise.name].totalWeight += exercise.weight * exercise.sets * exercise.reps;
      acc[exercise.name].totalReps += exercise.sets * exercise.reps;
    });
    
    return acc;
  }, {});
  
  // Sort exercises by frequency
  const topExercises = Object.entries(exerciseSummary)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);
  
  return (
    <ClientLayout title="Workout Statistics">
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Total Workouts</h5>
              <h1 className="display-4 fw-bold text-primary mb-0">{workouts.length}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Total Minutes</h5>
              <h1 className="display-4 fw-bold text-success mb-0">
                {workouts.reduce((sum, w) => sum + w.duration, 0)}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Calories Burned</h5>
              <h1 className="display-4 fw-bold text-danger mb-0">
                {workouts.reduce((sum, w) => sum + w.caloriesBurned, 0)}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Avg. Session</h5>
              <h1 className="display-4 fw-bold text-info mb-0">
                {workouts.length > 0 
                  ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length)
                  : 0}
                <span className="fs-6"> min</span>
              </h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Training Duration</h5>
              <Form.Select 
                size="sm"
                style={{ width: 'auto' }}
                value={chartTimeframe}
                onChange={(e) => setChartTimeframe(e.target.value)}
              >
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </Form.Select>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Bar data={durationChartData} options={durationChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header className="bg-transparent">
              <h5 className="mb-0">Workout Types</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={typeChartData} options={typeChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Header className="bg-transparent">
              <h5 className="mb-0">Calories Burned</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Line data={caloriesChartData} options={caloriesChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header className="bg-transparent">
              <h5 className="mb-0">Top Exercises</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {topExercises.length > 0 ? (
                <div className="list-group list-group-flush">
                  {topExercises.map(([name, data]) => (
                    <div key={name} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{name}</h6>
                        <span className="badge bg-primary rounded-pill">{data.count}x</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Total: {data.totalWeight}kg</small>
                        <small className="text-muted">{data.totalReps} reps</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted mb-0">No exercise data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ClientLayout>
  );
};

export default WorkoutStats;