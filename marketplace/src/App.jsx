import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importa Routes y Route
import Home from './views/Home';
import LoginView from './views/Login';
import RegisterView from './views/RegisterView';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/login" element={<LoginView />} /> {/* Página de Login */}
      <Route path="/registro" element={<RegisterView />} /> {/* Página de Registro */}
    </Routes>
  );
}

export default App;



