import React, { useState } from 'react';
import './AccordionButton.css';
import { Button } from 'react-bootstrap';

const AccordionButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => {
    setIsOpen(!isOpen); // Cambiar el estado al hacer clic
  };

  return (
    <div className="my-3" id='btnTxt'>
      {/* Botón interactivo */}
      <Button
        variant={isOpen ? "dark" : "primary"}
        className="w-100 text-start"
        onClick={toggleVisibility} // Cambiar estado al hacer clic
      >
        {props.title}
      </Button>

      {/* Contenido que se muestra si está abierto */}
      {isOpen && (
        <div className="mt-2 p-2 border rounded bg-dark" id='paragraphTxt'>
          {props.description.map((paragraph, index) => (
            <p key={index} className="secp">{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionButton;



