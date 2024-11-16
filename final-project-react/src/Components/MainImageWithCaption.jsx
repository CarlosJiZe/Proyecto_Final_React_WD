import React from 'react';
import './MainImageWithCaption.css';

const MainImageWithCaption = (props) => {
  return (
    <figure>
      <img src={props.src} alt={props.alt} className="imgp" />
      {props.caption && <figcaption className="sfgc">{props.caption}</figcaption>}
    </figure>
  );
};

export default MainImageWithCaption;