import React from 'react';
import { Dumbbell } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout'

const WorkoutTemplates: React.FC = () => {
  return (
    <AdminLayout title="Workout Templates">
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Workout Templates</h1>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
          Create Template
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="grid gap-4">
            {/* Placeholder for workout template list */}
            <div className="text-gray-500 text-center py-8">
              No workout templates created yet.
              <br />
              Click the Create Template button to get started.
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default WorkoutTemplates;