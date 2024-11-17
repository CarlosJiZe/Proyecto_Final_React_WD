import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Graficas from './Components/Graficas';
import Datos from './Components/Datos';
import './App.css';


function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        {/* Ruta raíz para Home */}
        <Route exact path="/" element={<Home />} />
        
        {/* Ruta para Graficas */}
        <Route path="/graficas" element={<Graficas />} />
        
        {/* Ruta para Datos */}
        <Route path="/datos" element={<Datos rowsPerPage={100} />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
