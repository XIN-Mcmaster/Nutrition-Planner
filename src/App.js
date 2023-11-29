import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header';
import { useUser } from './UserContext';
import Banner from './Components/Banner';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function App() {
  const { userId } = useUser();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }

  }, [userId]);

  const handleButtonClick = () => {

    navigate('/createPlan');
  };


  return (

    <div>
      <Header></Header>
      <Banner onclick={handleButtonClick}></Banner>
    </div>
  );
}

export default App;

