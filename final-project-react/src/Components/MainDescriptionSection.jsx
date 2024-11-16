import React from 'react';
import './MainDescriptionSection.css';

const MainDescriptionSection = (props) => {
  return (
    <div className='textDecr'>
      {props.paragraphs.map((paragraph, index) => (
        <p key={index} className="princ">{paragraph}</p>
      ))}
    </div>
  );
};

export default MainDescriptionSection;
