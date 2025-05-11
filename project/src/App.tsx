import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Login from './pages/Login';
import ClientDashboard from './pages/client/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import WorkoutLog from './pages/client/WorkoutLog';
import WorkoutStats from './pages/client/WorkoutStats';
import NutritionPlan from './pages/client/NutritionPlan';
import Profile from './pages/client/Profile';
import WorkoutTemplates from './pages/admin/WorkoutTemplates';
import NutritionTemplates from './pages/admin/NutritionTemplates';

// Hooks
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        !isAuthenticated ? <Login /> : <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />
      } />

      {/* Client Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
      <Route path="/workout-log" element={<ProtectedRoute><WorkoutLog /></ProtectedRoute>} />
      <Route path="/workout-stats" element={<ProtectedRoute><WorkoutStats /></ProtectedRoute>} />
      <Route path="/nutrition-plan" element={<ProtectedRoute><NutritionPlan /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/workout-templates" element={<AdminRoute><WorkoutTemplates /></AdminRoute>} />
      <Route path="/admin/nutrition-templates" element={<AdminRoute><NutritionTemplates /></AdminRoute>} />

      {/* Default Route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? (user?.role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/login'} />} />
    </Routes>
  );
}

export default App;