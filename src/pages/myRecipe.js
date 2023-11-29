import React, { useEffect, useState } from 'react';
import RecipeDetail from '../Components/RecipeDetail';
import { Header } from '../Components/Header';
import { useUser } from '../UserContext';
import { Tabs,Tab,Button } from 'react-bootstrap';
import '../Styles/recipe.css'

const MyRecipe = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [key, setKey] = useState('breakfast');
  const { userId } = useUser();

  const fetchMealPlans = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/plan/getPlan/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMealPlans(data);
      } else {
        console.error('Failed to fetch meal plans');
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  useEffect(() => {

    fetchMealPlans();

  }, []);

  const handleDeletePlan = async (planId) => {

    try {
      // Make an API call to delete the plan using the planId
      const response = await fetch(`http://localhost:3001/api/plan/deletePlan/${planId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchMealPlans();
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }

  }

  return (
    <div>
      <Header></Header>
      <div className="d-flex justify-content-center">
      {/* <h1>My Meal Plans</h1> */}
      <div className="mealplans">
        {mealPlans.map((plan) => (
          <div key={plan._id}>
            <div className='my-3 d-flex justify-content-between align-items-center'>
              <h2>Plan: {plan.name}</h2>
              <Button variant="danger" onClick={() => handleDeletePlan(plan._id)}>Delete</Button>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="breakfast" title="Breakfast">
                <div className="row row-cols-auto g-4 tab-content-wrapper">
                  {plan.breakfast.map((uri) => (
                    <div key={uri} className="col mb-3">
                      <RecipeDetail uri={uri} />
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="lunch" title="Lunch">
                <div className="row row-cols-auto g-4 tab-content-wrapper">
                  {plan.lunch.map((uri) => (
                    <div key={uri} className="col">
                      <RecipeDetail uri={uri} />
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="dinner" title="Dinner">
                <div className="row row-cols-auto g-4 tab-content-wrapper">
                  {plan.dinner.map((uri) => (
                    <div key={uri} className="col">
                      <RecipeDetail uri={uri} />
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default MyRecipe;
