import React from 'react';
import { Carousel } from 'react-bootstrap';
import './GalleryCarousel.css';

const GalleryCarousel = (props) => {
  return (
    <div className="section container-fluid" id={props.id}>
      <hr className="custom-hr"/>
      <h1>{props.title}</h1>
      <Carousel>
        {props.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`/images/${image.name}.jpg`}
              alt={image.description}
            />
            <Carousel.Caption>
              <p>{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default GalleryCarousel;


