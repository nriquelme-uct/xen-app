import React from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { PlusCircle, Apple, Edit, Trash } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';

// Mock data for nutrition templates
const mockTemplates = [
  {
    id: 1,
    name: 'Weight Loss Plan',
    description: 'Low calorie meal plan focused on fat loss while preserving muscle',
    dailyCalories: 1800,
    macros: { protein: 150, carbs: 150, fat: 60 },
    meals: 5
  },
  {
    id: 2,
    name: 'Muscle Gain Plan',
    description: 'High protein meal plan designed for muscle growth',
    dailyCalories: 2800,
    macros: { protein: 200, carbs: 300, fat: 80 },
    meals: 6
  },
  {
    id: 3,
    name: 'Maintenance Plan',
    description: 'Balanced nutrition plan for maintaining current physique',
    dailyCalories: 2200,
    macros: { protein: 160, carbs: 220, fat: 70 },
    meals: 4
  }
];

const NutritionTemplates: React.FC = () => {
  return (
    <AdminLayout title="Nutrition Templates">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted mb-0">
            Create and manage nutrition plans for your clients
          </p>
        </div>
        <Button variant="primary" className="d-flex align-items-center">
          <PlusCircle size={18} className="me-2" />
          <span>Create Template</span>
        </Button>
      </div>

      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Description</th>
                <th className="text-center">Daily Calories</th>
                <th className="text-center">Protein</th>
                <th className="text-center">Carbs</th>
                <th className="text-center">Fat</th>
                <th className="text-center">Meals</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTemplates.map(template => (
                <tr key={template.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                        <Apple size={20} className="text-primary" />
                      </div>
                      <span>{template.name}</span>
                    </div>
                  </td>
                  <td>
                    <small className="text-muted">{template.description}</small>
                  </td>
                  <td className="text-center">{template.dailyCalories}</td>
                  <td className="text-center">{template.macros.protein}g</td>
                  <td className="text-center">{template.macros.carbs}g</td>
                  <td className="text-center">{template.macros.fat}g</td>
                  <td className="text-center">{template.meals}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default NutritionTemplates;