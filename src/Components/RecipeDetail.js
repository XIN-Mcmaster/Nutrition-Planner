import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const RecipeDetail = ({ uri }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/search?r=${encodeURIComponent(uri)}&app_id=b0c0ed84&app_key=bdec1840b882434233a91e927101a8db`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data[0]); // Set the fetched recipe details
        } else {
          console.error('Failed to fetch recipe details');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [uri]);

  return (
  <div className="card" style={{ width: '200px' }}>
  {recipe && (
    <div className="position-relative">
      <img
        src={recipe.image}
        alt={recipe.label}
        className="card-img-top img-fluid"
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <div className="card-title-overlay position-absolute bottom-0 start-0 end-0">
        <Card.Title className="text-white text-center">{recipe.label}</Card.Title>
      </div>
    </div>
  )}
</div>
  );
};

export default RecipeDetail;
