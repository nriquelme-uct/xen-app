import { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  
  return context;
};