import React, { useEffect } from 'react';
import MainImageSection from './MainImageSection';
import MainTitleSection from './MainTitleSection';
import MainDescriptionSection from './MainDescriptionSection';
import Section from './Section';
import GalleryCarousel from './GalleryCarousel';
import { useAppContext, setHomeSections } from '../Context/AppContextProvider';
import sectionsData from '../Data/sectionsData';
import './Home.css'; 

const Home = () => {
  const { state, dispatch } = useAppContext();

  const paragraphsMain = [
    "El Lago de Chapala, el lago más extenso del país, es la principal fuente de abastecimiento de agua de la Zona Conurbada de Guadalajara.",
    "El lago de Chapala tiene una capacidad total de 7,897 millones de metros cúbicos (Mm³) y una superficie de 114,659 hectáreas (ha), de las cuales el 86% pertenece al estado de Jalisco y el 14% a Michoacán. Es el lago más grande de la República Mexicana y la principal fuente de abastecimiento de agua potable para la Zona Metropolitana de Guadalajara, proporcionando el 60% del agua que llega a la ciudad."
  ];

  useEffect(() => {
    // Cargar las secciones dinámicas desde el JSON en el contexto
    setHomeSections(dispatch, sectionsData);
  }, [dispatch]);

  return (
    <div className="cont-prin container-fluid" id="lago-cha">
      {/* Componente de imagen */}
      <MainImageSection src="/images/lago_chap.jpeg" alt="Imagen del lago de Chapala" />

      {/* Componente de título */}
      <MainTitleSection title="Lago de Chapala" />

      {/* Componente de descripción */}
      <MainDescriptionSection paragraphs={paragraphsMain} />

      {/* Renderizado de Secciones Dinámicas */}
      {state.homeSections.map((section, index) => {
        if (section.id === "gale") {
          // Si la sección es la galería, renderiza el carrusel
          return (
            <GalleryCarousel
              key={index}
              id={section.id}
              title={section.title}
              images={section.images}
            />
          );
        } else {
          // Si no, renderiza una sección normal
          return (
            <Section
              key={index}
              id={section.id}
              title={section.title}
              image={section.image}
              description={section.description}
              accordions={section.accordions}
            />
          );
        }
      })}
    </div>
  );
};

export default Home;
