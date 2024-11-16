import React from 'react';
import './MainTitleSection.css';

const MainTitleSection = (props) => {
  return (
    <div className="cont-p">
      <h1>{props.title}</h1>
    </div>
  );
};

export default MainTitleSection;

