import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
        <hr className='custom-hr'/>
      <div className="container">
        <div className="row">
          {/* Primera columna */}
          <div className="col-md-4">
            <h5>Sucursal Providencia</h5>
            <ul>
              <li>Brasilia 2970, Col. Colomos Providencia,</li>
              <li>C.P. 44680, Jalisco, México.</li>
              <li>Teléfonos: 33-3030-9350 | 800 087 9310</li>
            </ul>
          </div>

          {/* Segunda columna */}
          <div className="col-md-4">
            <h5>Domicilio Oficial</h5>
            <ul>
              <li>Av. Francia 1726, Col. Moderna,</li>
              <li>C.P. 44190, Jalisco, México</li>
              <li>Teléfonos: 33-3030-9200, | 800 087 9200</li>
              <li>(Oficialía de Partes: 9:00 - 15:00, L - V)</li>
            </ul>
          </div>

          {/* Tercera columna */}
          <div className="col-md-4">
            <h5>Entrada alternativa</h5>
            <ul>
              <li>Av. Alemania 1377, Col. Moderna,</li>
              <li>C.P. 44190, Jalisco, México</li>
              <li>Teléfonos: 33-3030-9200, | 800 087 9200</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
