import React from 'react';
import { Routes, Route} from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Graficas from './Components/Graficas';
import Datos from './Components/Datos';
import AppContextProvider from './Context/AppContextProvider';
import FaultyComponent from './Components/ErrorComponent';
import ErrorBoundary from './Components/Error';
import './App.css';


function App() {
  return (
    <AppContextProvider>
    <div className="App">
    <ErrorBoundary>
      <NavbarComponent />
      <FaultyComponent/>
      <Routes>
        {/* Ruta raíz para Home */}
        <Route exact path="/" element={<Home />} />
        
        {/* Ruta para Graficas */}
        <Route path="/graficas" element={<Graficas />} />
        
        {/* Ruta para Datos */}
        <Route path="/datos" element={<Datos rowsPerPage={100} />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
    </div>
    </AppContextProvider>
  );
}

export default App;
