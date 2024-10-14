import React, { useState } from "react";
import logo from '../assets/car.svg';  // logo de la pagina
import user from '../assets/user.svg'; // icono usuario
import heart from '../assets/heart.svg'; // icono wishlist
import carrito from '../assets/carrito.svg'; // icono carrito
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para capturar el valor del input
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/");  // También redirige a la ruta home si es necesario
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página
  
    // Validar que haya algo escrito en el input de búsqueda
    if (!searchTerm.trim()) {
      return;
    }
  
    try {
      // Construir la URL dinámicamente, según los valores de búsqueda
      let searchUrl = "http://localhost:8080/api/producto/all/filtrar?";
  
      if (searchTerm.trim()) {
        searchUrl += `modelo=${searchTerm}`; 
      }
  
      const response = await fetch(searchUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // Aquí puedes navegar a una página de resultados y pasar los datos obtenidos
        navigate("/resultados", { state: { autos: data } });
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error occurred while fetching search results", error);
    }
  };

  return (
    <nav>
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
      </div>
      <ul className="nav-center">
        <li onClick={scrollToTop} style={{ cursor: 'pointer' }}>Inicio</li>
        <li>Vehículos</li>
        <li>Nosotros</li>
        <li>Servicios</li>
      </ul>
      <div className="nav-right">
        <form onSubmit={handleSearch}> {/* Formulario para la búsqueda */}
          <input 
            type="text" 
            placeholder="Buscar autos por marca o modelo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el valor del input
          />
        </form>
        <img src={user} alt="mi perfil" className="logoUser" />
        <img src={heart} alt="favoritos" className="favoritos" />
        <img src={carrito} alt="carrito" className="logocarrito" />
      </div>
    </nav>
  );
};

export default NavBar;
