import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
import { SearchRecipe } from '../Components/SearchRecipe';
import { useUser } from '../UserContext';
import { useNavigate  } from 'react-router-dom';
import RecipePreview from '../Components/recipePreview';
import { Header } from '../Components/Header';

const CreatePlan = () => {
  const [step, setStep] = useState(1);
  const [meal, setMeal] = useState('Breakfast');
  const [name, setName] = useState('');
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  const { userId } = useUser();
  const navigate = useNavigate();

  const create = async (plan) => {
    try {
      const response = await fetch('http://localhost:3001/api/plan/createPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });
      
      if(response.ok){
        navigate('/myRecipe');
      }

    } catch (error) {
      console.error('Login failed:', error);
    }

  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      switch (step) {
        case 1:
          setMeal('Lunch');
          break;
        case 2:
          setMeal('Dinner');
          break;
        default:
          break;
      }
    }
    else {
      // All steps completed, proceed to next action or page
      console.log('Breakfast Recipes:', breakfastRecipes);
      console.log('Lunch Recipes:', lunchRecipes);
      console.log('Dinner Recipes:', dinnerRecipes);

      const newPlan = {
        name: name,
        userID: userId,
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
      }

      create(newPlan);

    }
  };

  const handleAddRecipe = (recipe) => {
    if (recipe) {
      switch (step) {
        case 1:
          setBreakfastRecipes([...breakfastRecipes, recipe]);
          break;
        case 2:
          setLunchRecipes([...lunchRecipes, recipe]);
          break;
        case 3:
          setDinnerRecipes([...dinnerRecipes, recipe]);
          break;
        default:
          break;
      }
    }
  };

  const handleremoveRecipe = (recipe) => {
    switch (step) {
      case 1:
        const updatebreakfast = breakfastRecipes.filter(uri => uri!= recipe);
        setBreakfastRecipes(updatebreakfast);
        break;
      case 2:
        const updatelunch = lunchRecipes.filter(uri => uri!= recipe);
        setLunchRecipes(updatelunch);
        break;
      case 3:
        const updatedinner = dinnerRecipes.filter(uri => uri!= recipe);
        setDinnerRecipes(updatedinner);
        break;
      default:
        break;
    }
  };


  const rederPreview = () => {
    switch (step) {
      case 1:
        return breakfastRecipes.map((uri)=>{
          return <RecipePreview uri={uri} onDelete={handleremoveRecipe}/>
        });
      case 2:
        return lunchRecipes.map((uri)=>{
          return <RecipePreview uri={uri} onDelete={handleremoveRecipe}/>
        });
      case 3:
        return dinnerRecipes.map((uri)=>{
          return <RecipePreview uri={uri} onDelete={handleremoveRecipe}/>
        });
      default:
        break;
    } 
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SearchRecipe addRecipe={handleAddRecipe} step={step} />;
      case 2:
        return <SearchRecipe addRecipe={handleAddRecipe} step={step} />;
      case 3:
        return <SearchRecipe addRecipe={handleAddRecipe} step={step} />;
      default:
        return null;
    }
  };

  return (
    <div>
    <Header></Header>
    <Container>
      <div className="my-4">
        {step === 3 && (
          <div className="d-flex justify-content-center m-2">
            <Form className="d-flex col-4">
              <FormControl
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter plan name"
                required
              />
            </Form>
          </div>
        )}
        <h1>Step {step} - Select {meal}</h1>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div className="scroll-container" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
                {renderStep()}
              </div>
            </Col>
          </Row>
        </Container>
        <div className="d-flex justify-content-end mt-5">
          <Button variant="primary" onClick={handleNextStep}>
            {step < 3 ? 'Next Step' : 'Finish'}
          </Button>
        </div>
        <div className="row row-cols-auto g-4 m-4">
          {rederPreview()}
        </div>
      </div>
    </Container>
    </div>
  );
}

export default CreatePlan;