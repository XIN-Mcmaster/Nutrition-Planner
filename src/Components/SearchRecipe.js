import React, { useEffect, useState } from 'react';
import { Card, Button, CardFooter, Row, Col, Form, FormControl } from 'react-bootstrap';
import '../Styles/recipe.css'



export function SearchRecipe({addRecipe,step}) {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=b0c0ed84&app_key=bdec1840b882434233a91e927101a8db`);
            const data = await response.json();
            setSearchResults(data.hits || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddRecipe = (recipe) => {
        addRecipe(recipe.uri); 

    };
    
    useEffect(() => {
        if (step = step + 1) {
            setKeyword('');
            setSearchResults([]);
        }
    }, [step]);

    return (
        <div>
            <div className="d-flex justify-content-center">
                <Form className='d-flex col-4'>
                    <FormControl
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search recipes..."
                        className='mr-2'
                    />
                    <Button variant="primary" onClick={handleSearch} >Search</Button>
                </Form>
            </div>

            <Row xs={1} md={4} lg={5} className="m-3">
                {searchResults && searchResults.length > 0 ? ( // Check if searchResults is defined and has items
                    searchResults.map((hit) => (
                        <Col className="mb-4">
                            <Card className="h-100 d-flex flex-column" key={hit.recipe.uri}>
                                <Card.Img variant="top" src={hit.recipe.image} />
                                <Card.Body>
                                    <Card.Title>{hit.recipe.label}</Card.Title>
                                    <Card.Text>
                                        <div className='cal'>{Math.round(hit.recipe.calories)}kcal</div>
                                        <ul className='nutr'>
                                            <li className='fat'><span>Protein: {Math.round(hit.recipe.totalNutrients.PROCNT.quantity)}g</span></li>
                                            <li className='protein'>Fat: {Math.round(hit.recipe.totalNutrients.FAT.quantity)}g</li>
                                            <li className='carb'>Carb: {Math.round(hit.recipe.totalNutrients.CHOCDF.quantity)}g</li>
                                        </ul>
                                        <a href={hit.recipe.url} target="_blank" rel="noopener noreferrer">
                                            View Recipe
                                        </a>
                                    </Card.Text>
                                </Card.Body>
                                <CardFooter>
                                    <Button variant="primary" onClick={() => handleAddRecipe(hit.recipe)}>Add</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))
                ) : null}
            </Row>
        </div>
    )

}