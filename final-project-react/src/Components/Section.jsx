import React from 'react';
import './Section.css';
import MainImageWithCaption from './MainImageWithCaption';
import MainDescriptionSection from './MainDescriptionSection';
import AccordionButton from './AccordionButton';

const Section = (props) => {
  return (
    <div id={props.id} className="section container-fluid">
      <hr className="custom-hr"/>
      <h1>{props.title}</h1>
      <MainImageWithCaption
        src={props.image.src}
        alt={props.image.alt}
        caption={props.image.caption}
        className={props.image.className}
      />
      <MainDescriptionSection paragraphs={props.description} />

      {/* Botones que muestran las descripciones */}
      <div>
        {props.accordions.map((accordion, index) => (
          <AccordionButton
            key={index}
            title={accordion.title}
            description={accordion.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;

