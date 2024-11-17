import React, { useEffect } from 'react';
import MainImageWithCaption from './MainImageWithCaption';
import MainDescriptionSection from './MainDescriptionSection';
import { useAppContext, setGraphData } from '../Context/AppContextProvider';
import graficasData from '../Data/graficasData.json';
import './Graficas.css';

const Graficas = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // Cargar los datos de las gráficas en el contexto
    setGraphData(dispatch, graficasData);
  }, [dispatch]);

  return (
    <div className="graficas-section container-fluid">
      <br />
      <h1>Gráficas</h1>
      {state.graphData.map((section) => (
        <div key={section.id} id={section.id} className="graficas-subsection">
          <hr className="custom-hr" />
          <h2>{section.title}</h2>
          <MainImageWithCaption
            src={section.image.src}
            alt={section.image.alt}
            caption={section.image.caption}
            className={section.image.className}
          />
          <MainDescriptionSection paragraphs={section.description} />
        </div>
      ))}
    </div>
  );
};

export default Graficas;


