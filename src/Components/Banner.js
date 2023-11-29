import React from 'react';
import { Carousel,Button } from 'react-bootstrap';
import banner1 from "../images/banner1.jpg"
import "../Styles/carousel.css"


const Banner = ({onclick}) => {

    const images=[banner1];

    
  return (
    <Carousel className="carousel-container">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100 carousel-img" src={image} alt={`Slide ${index + 1}`} />
          <div className="overlay"></div>
          <Carousel.Caption style={{ top: '70%' }}>
          <Button onClick={()=>onclick()} className='btn-carousel'>Create Plan</Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
