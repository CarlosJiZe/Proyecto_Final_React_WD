import React from 'react';
import './MainImageSection.css';

const MainImageSection = (props) => {
  return (
    <div>
      <img src={props.src} alt={props.alt} className="imgp" />
    </div>
  );
};

export default MainImageSection;
