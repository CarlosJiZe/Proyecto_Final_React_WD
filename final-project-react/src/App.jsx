import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Graficas from './Components/Graficas';
import Datos from './Components/Datos';
import AppContextProvider from './Context/AppContextProvider';
import './App.css';


function App() {
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
}

export default App;
