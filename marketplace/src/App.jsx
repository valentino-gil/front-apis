import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginView from './views/Login';
import RegisterView from './views/RegisterView';
import RegistroAuto from './views/RegistroAuto';
import ResultadosSearchBar from './views/ResultadosSearchBar';
import ResultadosProductos from './views/ResultadosProductos'; // Importa la nueva vista

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/login" element={<LoginView />} /> {/* Página de Login */}
      <Route path="/registro" element={<RegisterView />} /> {/* Página de Registro */}
      <Route path="/resultados" element={<ResultadosSearchBar />} /> {/* Resultados de barra de búsqueda */}
      <Route path="/registroAuto" element={<RegistroAuto />} /> {/* Registro de Auto */}
      <Route path="/productos" element={<ResultadosProductos />} /> {/* Nueva ruta para los productos */}
    </Routes>
  );
}

export default App;

