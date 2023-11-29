import React, { useEffect, useState } from 'react';

const RecipePreview = ({ uri, onDelete }) => {
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

  const handleDelete = () => {
    onDelete(uri);
  };

  return (
    <div className="position-relative" style={{ width: '200px' }}>
      {recipe && (
        <>
          <img
            src={recipe.image}
            alt={recipe.label}
            className="card-img-top img-fluid"
            style={{ height: '150px', objectFit: 'cover' }}
          />
          <button
            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3 mt-2"
            onClick={handleDelete}
          >
            X
          </button>
        </>
      )}
    </div>

  );
};

export default RecipePreview;
