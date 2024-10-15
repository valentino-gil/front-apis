import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importa Routes y Route
import Home from './views/Home';
import LoginView from './views/Login';
import RegisterView from './views/RegisterView';
import ResultadosSearchBar from './views/ResultadosSearchBar';
import CarritoView from './views/CarritoView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/login" element={<LoginView />} /> {/* Página de Login */}
      <Route path="/registro" element={<RegisterView />} /> {/* Página de Registro */}
      <Route path="/resultados" element={<ResultadosSearchBar />} /> 
      <Route path="/carrito" element={<CarritoView />} /> 
    </Routes>
  );
}

export default App;



