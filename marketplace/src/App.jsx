import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginView from './views/Login';
import RegisterView from './views/RegisterView';
import RegistroAuto from './views/RegistroAuto';
import ResultadosSearchBar from './views/ResultadosSearchBar';
import CarritoView from './views/CarritoView';
import PerfilView from './views/PerfilView';
import WishlistView from './views/WishlistView';
import MisFacturasView from './views/MisFacturasView';
import ResultadosProductos from './views/ResultadosProductos'; // Importa la nueva vista
import CarDetail from './views/CarDetail';
import Nosotros from './views/Nosotros';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/login" element={<LoginView />} /> {/* Página de Login */}
      <Route path="/registro" element={<RegisterView />} /> {/* Página de Registro */}
      <Route path="/resultados" element={<ResultadosSearchBar />} /> 
      <Route path="/carrito" element={<CarritoView />} /> 
      <Route path="/perfil" element={<PerfilView />} /> 
      <Route path="/wishlist" element={<WishlistView />} /> 
      <Route path="/misfacturas" element={<MisFacturasView />} /> 
      <Route path="/resultados" element={<ResultadosSearchBar />} /> {/* Resultados de barra de búsqueda */}
      <Route path="/registroAuto" element={<RegistroAuto />} /> {/* Registro de Auto */}
      <Route path="/productos" element={<ResultadosProductos />} /> {/* Nueva ruta para los productos */}
      <Route path="/car/:id" element={<CarDetail />} /> {/* Ruta para ver el detalle de un auto */}
    </Routes>
  );
}

export default App;

