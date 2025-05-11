import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface WorkoutEntry {
  id: string;
  userId: string;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutContextType {
  workouts: WorkoutEntry[];
  addWorkout: (workout: Omit<WorkoutEntry, 'id'>) => void;
  updateWorkout: (id: string, workout: Partial<WorkoutEntry>) => void;
  deleteWorkout: (id: string) => void;
  getWeeklyWorkoutData: () => { day: string; value: number }[];
  loading: boolean;
}

// Create context
export const WorkoutContext = createContext<WorkoutContextType>({
  workouts: [],
  addWorkout: () => {},
  updateWorkout: () => {},
  deleteWorkout: () => {},
  getWeeklyWorkoutData: () => [],
  loading: true
});

// Mock workout data
const initialWorkouts: WorkoutEntry[] = [
  {
    id: '1',
    userId: '1',
    date: '2025-08-01',
    type: 'Strength',
    duration: 60,
    caloriesBurned: 450,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
      { name: 'Squats', sets: 4, reps: 10, weight: 100 },
      { name: 'Deadlift', sets: 3, reps: 6, weight: 120 }
    ],
    notes: 'Felt strong today'
  },
  {
    id: '2',
    userId: '1',
    date: '2025-08-03',
    type: 'Cardio',
    duration: 45,
    caloriesBurned: 380,
    exercises: [
      { name: 'Running', sets: 1, reps: 1, weight: 0 }
    ],
    notes: 'Easy pace run'
  },
  {
    id: '3',
    userId: '1',
    date: '2025-08-05',
    type: 'HIIT',
    duration: 30,
    caloriesBurned: 320,
    exercises: [
      { name: 'Burpees', sets: 5, reps: 15, weight: 0 },
      { name: 'Mountain Climbers', sets: 5, reps: 20, weight: 0 }
    ],
    notes: 'Tough workout'
  }
];

// Provider component
export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved workouts on mount
  useEffect(() => {
    const storedWorkouts = localStorage.getItem('gymTrackerWorkouts');
    
    if (storedWorkouts) {
      try {
        setWorkouts(JSON.parse(storedWorkouts));
      } catch (error) {
        console.error('Error parsing stored workouts:', error);
        setWorkouts(initialWorkouts);
      }
    } else {
      setWorkouts(initialWorkouts);
    }
    
    setLoading(false);
  }, []);

  // Save workouts to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gymTrackerWorkouts', JSON.stringify(workouts));
    }
  }, [workouts, loading]);

  // Add a new workout
  const addWorkout = (workout: Omit<WorkoutEntry, 'id'>) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString()
    };
    
    setWorkouts(prev => [...prev, newWorkout]);
  };

  // Update an existing workout
  const updateWorkout = (id: string, workout: Partial<WorkoutEntry>) => {
    setWorkouts(prev => 
      prev.map(w => w.id === id ? { ...w, ...workout } : w)
    );
  };

  // Delete a workout
  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  // Get weekly workout data for charts
  const getWeeklyWorkoutData = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Get the date of the past Sunday (start of week)
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDay);
    startDate.setHours(0, 0, 0, 0);
    
    // Get stats for each day of the current week
    return days.map((day, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      
      // Format date to match workout dates format (YYYY-MM-DD)
      const formattedDate = date.toISOString().split('T')[0];
      
      // Find workouts for this day and sum duration
      const dayWorkouts = workouts.filter(w => w.date === formattedDate);
      const totalMinutes = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
      
      return { day, value: totalMinutes };
    });
  };

  return (
    <WorkoutContext.Provider value={{ 
      workouts, 
      addWorkout, 
      updateWorkout, 
      deleteWorkout, 
      getWeeklyWorkoutData,
      loading 
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};