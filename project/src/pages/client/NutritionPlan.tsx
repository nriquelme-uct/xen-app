import React, { useState } from 'react';
import { Card, Tab, Nav, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { Book, Apple, List, PlusCircle } from 'lucide-react';
import ClientLayout from '../../components/layouts/ClientLayout';

// Mock nutrition data
const mockMeals = [
  {
    id: 1,
    day: 'Monday',
    meals: [
      { name: 'Breakfast', content: 'Oatmeal with berries and nuts', calories: 350, protein: 12, carbs: 45, fat: 15 },
      { name: 'Lunch', content: 'Grilled chicken salad with olive oil dressing', calories: 450, protein: 35, carbs: 15, fat: 25 },
      { name: 'Dinner', content: 'Baked salmon with quinoa and roasted vegetables', calories: 550, protein: 40, carbs: 30, fat: 25 },
      { name: 'Snack', content: 'Greek yogurt with honey', calories: 180, protein: 15, carbs: 20, fat: 5 }
    ]
  },
  {
    id: 2,
    day: 'Tuesday',
    meals: [
      { name: 'Breakfast', content: 'Protein smoothie with banana and almond milk', calories: 300, protein: 20, carbs: 30, fat: 10 },
      { name: 'Lunch', content: 'Turkey wrap with whole grain tortilla', calories: 420, protein: 30, carbs: 35, fat: 15 },
      { name: 'Dinner', content: 'Beef stir-fry with brown rice', calories: 580, protein: 35, carbs: 45, fat: 20 },
      { name: 'Snack', content: 'Protein bar', calories: 200, protein: 15, carbs: 20, fat: 8 }
    ]
  },
  {
    id: 3,
    day: 'Wednesday',
    meals: [
      { name: 'Breakfast', content: 'Egg white omelet with vegetables', calories: 280, protein: 25, carbs: 10, fat: 15 },
      { name: 'Lunch', content: 'Tuna salad sandwich on whole grain bread', calories: 420, protein: 35, carbs: 30, fat: 18 },
      { name: 'Dinner', content: 'Chicken breast with sweet potato and green beans', calories: 480, protein: 40, carbs: 35, fat: 12 },
      { name: 'Snack', content: 'Apple with almond butter', calories: 220, protein: 6, carbs: 25, fat: 12 }
    ]
  },
  {
    id: 4,
    day: 'Thursday',
    meals: [
      { name: 'Breakfast', content: 'Greek yogurt with granola and berries', calories: 320, protein: 20, carbs: 40, fat: 10 },
      { name: 'Lunch', content: 'Lentil soup with mixed green salad', calories: 380, protein: 20, carbs: 45, fat: 12 },
      { name: 'Dinner', content: 'Grilled steak with roasted potatoes and asparagus', calories: 550, protein: 45, carbs: 30, fat: 25 },
      { name: 'Snack', content: 'Protein shake', calories: 150, protein: 25, carbs: 5, fat: 2 }
    ]
  },
  {
    id: 5,
    day: 'Friday',
    meals: [
      { name: 'Breakfast', content: 'Whole grain toast with avocado and eggs', calories: 420, protein: 20, carbs: 30, fat: 25 },
      { name: 'Lunch', content: 'Grilled chicken wrap with vegetables', calories: 450, protein: 35, carbs: 40, fat: 15 },
      { name: 'Dinner', content: 'Baked cod with quinoa and roasted vegetables', calories: 420, protein: 35, carbs: 30, fat: 15 },
      { name: 'Snack', content: 'Mixed nuts and dried fruits', calories: 250, protein: 8, carbs: 20, fat: 16 }
    ]
  },
  {
    id: 6,
    day: 'Saturday',
    meals: [
      { name: 'Breakfast', content: 'Protein pancakes with maple syrup', calories: 450, protein: 25, carbs: 50, fat: 15 },
      { name: 'Lunch', content: 'Grilled vegetable and chicken salad', calories: 380, protein: 30, carbs: 20, fat: 20 },
      { name: 'Dinner', content: 'Lean beef burger with sweet potato fries', calories: 650, protein: 40, carbs: 60, fat: 25 },
      { name: 'Snack', content: 'Cottage cheese with pineapple', calories: 200, protein: 28, carbs: 12, fat: 2 }
    ]
  },
  {
    id: 7,
    day: 'Sunday',
    meals: [
      { name: 'Breakfast', content: 'Vegetable frittata', calories: 350, protein: 25, carbs: 10, fat: 22 },
      { name: 'Lunch', content: 'Salmon salad with mixed greens', calories: 420, protein: 35, carbs: 15, fat: 25 },
      { name: 'Dinner', content: 'Grilled chicken with brown rice and broccoli', calories: 520, protein: 45, carbs: 45, fat: 12 },
      { name: 'Snack', content: 'Protein smoothie', calories: 220, protein: 30, carbs: 15, fat: 3 }
    ]
  }
];

const mockFoodDiary = [
  {
    id: 1,
    date: '2025-08-05',
    entries: [
      { name: 'Breakfast', content: 'Oatmeal with berries', calories: 320, protein: 10, carbs: 50, fat: 8 },
      { name: 'Lunch', content: 'Chicken sandwich', calories: 450, protein: 30, carbs: 40, fat: 15 },
      { name: 'Dinner', content: 'Salmon with rice', calories: 520, protein: 40, carbs: 40, fat: 20 },
      { name: 'Snack', content: 'Protein bar', calories: 200, protein: 15, carbs: 20, fat: 8 }
    ]
  },
  {
    id: 2,
    date: '2025-08-04',
    entries: [
      { name: 'Breakfast', content: 'Eggs and toast', calories: 350, protein: 20, carbs: 30, fat: 15 },
      { name: 'Lunch', content: 'Tuna salad', calories: 380, protein: 35, carbs: 15, fat: 20 },
      { name: 'Dinner', content: 'Pasta with chicken', calories: 580, protein: 35, carbs: 70, fat: 15 },
      { name: 'Snack', content: 'Greek yogurt', calories: 150, protein: 15, carbs: 10, fat: 5 }
    ]
  }
];

const NutritionPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plan');
  const [currentDay, setCurrentDay] = useState(1);
  
  // Calculate total macros for a day
  const calculateDayTotals = (meals: any[]) => {
    return meals.reduce((totals, meal) => {
      return {
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };
  
  // Get the current day's meal plan
  const currentDayPlan = mockMeals.find(day => day.id === currentDay) || mockMeals[0];
  const currentDayTotals = calculateDayTotals(currentDayPlan.meals);
  
  return (
    <ClientLayout title="Nutrition Plan">
      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="plan" className="d-flex align-items-center">
              <Book size={18} className="me-2" />
              <span>Meal Plan</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="diary" className="d-flex align-items-center">
              <List size={18} className="me-2" />
              <span>Food Diary</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Tab.Content>
          <Tab.Pane eventKey="plan">
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Weekly Meal Plan</h5>
                      <Form.Select 
                        className="w-auto"
                        value={currentDay}
                        onChange={(e) => setCurrentDay(parseInt(e.target.value))}
                      >
                        {mockMeals.map(day => (
                          <option key={day.id} value={day.id}>{day.day}</option>
                        ))}
                      </Form.Select>
                    </div>
                    
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Meal</th>
                          <th>Food</th>
                          <th className="text-center">Calories</th>
                          <th className="text-center">Protein</th>
                          <th className="text-center">Carbs</th>
                          <th className="text-center">Fat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDayPlan.meals.map((meal, index) => (
                          <tr key={index}>
                            <td><strong>{meal.name}</strong></td>
                            <td>{meal.content}</td>
                            <td className="text-center">{meal.calories}</td>
                            <td className="text-center">{meal.protein}g</td>
                            <td className="text-center">{meal.carbs}g</td>
                            <td className="text-center">{meal.fat}g</td>
                          </tr>
                        ))}
                        <tr className="table-light">
                          <td colSpan={2}><strong>Daily Totals</strong></td>
                          <td className="text-center"><strong>{currentDayTotals.calories}</strong></td>
                          <td className="text-center"><strong>{currentDayTotals.protein}g</strong></td>
                          <td className="text-center"><strong>{currentDayTotals.carbs}g</strong></td>
                          <td className="text-center"><strong>{currentDayTotals.fat}g</strong></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row>
              <Col md={6} className="mb-4 mb-md-0">
                <Card className="h-100">
                  <Card.Header className="bg-transparent">
                    <h5 className="mb-0">Nutrition Overview</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <h6>Daily Calorie Target: 2000-2200</h6>
                      <div className="progress" style={{ height: '10px' }}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${Math.min((currentDayTotals.calories / 2200) * 100, 100)}%` }} 
                          aria-valuenow={currentDayTotals.calories} 
                          aria-valuemin={0} 
                          aria-valuemax={2200}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <small>{currentDayTotals.calories} kcal</small>
                        <small>2200 kcal</small>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6>Protein: 150-180g</h6>
                      <div className="progress" style={{ height: '10px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${Math.min((currentDayTotals.protein / 180) * 100, 100)}%` }} 
                          aria-valuenow={currentDayTotals.protein} 
                          aria-valuemin={0} 
                          aria-valuemax={180}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <small>{currentDayTotals.protein}g</small>
                        <small>180g</small>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6>Carbohydrates: 200-250g</h6>
                      <div className="progress" style={{ height: '10px' }}>
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${Math.min((currentDayTotals.carbs / 250) * 100, 100)}%` }} 
                          aria-valuenow={currentDayTotals.carbs} 
                          aria-valuemin={0} 
                          aria-valuemax={250}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <small>{currentDayTotals.carbs}g</small>
                        <small>250g</small>
                      </div>
                    </div>
                    
                    <div>
                      <h6>Fats: 50-70g</h6>
                      <div className="progress" style={{ height: '10px' }}>
                        <div 
                          className="progress-bar bg-danger" 
                          role="progressbar" 
                          style={{ width: `${Math.min((currentDayTotals.fat / 70) * 100, 100)}%` }} 
                          aria-valuenow={currentDayTotals.fat} 
                          aria-valuemin={0} 
                          aria-valuemax={70}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <small>{currentDayTotals.fat}g</small>
                        <small>70g</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card className="h-100">
                  <Card.Header className="bg-transparent">
                    <h5 className="mb-0">Nutrition Tips</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item">
                        <div className="d-flex">
                          <div className="me-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded">
                              <Apple size={20} className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-1">Protein Timing</h6>
                            <p className="mb-0 text-muted small">Consume protein within 30 minutes after your workout to optimize muscle recovery.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="list-group-item">
                        <div className="d-flex">
                          <div className="me-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded">
                              <Apple size={20} className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-1">Hydration</h6>
                            <p className="mb-0 text-muted small">Aim for 2-3 liters of water daily. Proper hydration is essential for optimal performance.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="list-group-item">
                        <div className="d-flex">
                          <div className="me-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded">
                              <Apple size={20} className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-1">Meal Frequency</h6>
                            <p className="mb-0 text-muted small">Spread your protein intake across 4-5 meals throughout the day for better absorption.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="list-group-item">
                        <div className="d-flex">
                          <div className="me-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded">
                              <Apple size={20} className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-1">Pre-Workout Nutrition</h6>
                            <p className="mb-0 text-muted small">Consume a mix of protein and carbs 1-2 hours before workout for optimal energy.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
          
          <Tab.Pane eventKey="diary">
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Food Diary</h5>
                    <p className="text-muted mb-0">Track your daily food intake</p>
                  </div>
                  <Button variant="primary" className="d-flex align-items-center">
                    <PlusCircle size={18} className="me-2" />
                    <span>Add Entry</span>
                  </Button>
                </div>
              </Col>
            </Row>
            
            {mockFoodDiary.map((day) => (
              <Card key={day.id} className="mb-4 shadow-sm">
                <Card.Header className="bg-transparent">
                  <h5 className="mb-0">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Meal</th>
                        <th>Food</th>
                        <th className="text-center">Calories</th>
                        <th className="text-center">Protein</th>
                        <th className="text-center">Carbs</th>
                        <th className="text-center">Fat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.entries.map((entry, index) => (
                        <tr key={index}>
                          <td><strong>{entry.name}</strong></td>
                          <td>{entry.content}</td>
                          <td className="text-center">{entry.calories}</td>
                          <td className="text-center">{entry.protein}g</td>
                          <td className="text-center">{entry.carbs}g</td>
                          <td className="text-center">{entry.fat}g</td>
                        </tr>
                      ))}
                      
                      <tr className="table-light">
                        <td colSpan={2}><strong>Daily Totals</strong></td>
                        <td className="text-center">
                          <strong>{day.entries.reduce((sum, entry) => sum + entry.calories, 0)}</strong>
                        </td>
                        <td className="text-center">
                          <strong>{day.entries.reduce((sum, entry) => sum + entry.protein, 0)}g</strong>
                        </td>
                        <td className="text-center">
                          <strong>{day.entries.reduce((sum, entry) => sum + entry.carbs, 0)}g</strong>
                        </td>
                        <td className="text-center">
                          <strong>{day.entries.reduce((sum, entry) => sum + entry.fat, 0)}g</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </ClientLayout>
  );
};

export default NutritionPlan;