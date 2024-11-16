import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import './App.css';


function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        {/* Ruta raíz para Home */}
        <Route exact path="/" element={<Home />} />
        
        {/* Rutas futuras */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
