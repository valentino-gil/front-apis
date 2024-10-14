import React from "react";
import logo from '../assets/car.svg';  // logo de la pagina
import user from '../assets/user.svg'; // icono usuario
import heart from '../assets/heart.svg'; // icono wishlist
import carrito from '../assets/carrito.svg'; // icono carrito
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate

const NavBar = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Hace scroll suave hacia el tope de la página
    navigate("/");  // También redirige a la ruta home si es necesario
  };

  return (
    <nav>
      <div className="nav-left">
        {/* Enlace al home y scroll al tope */}
        <img src={logo} alt="Logo" className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
      </div>
      <ul className="nav-center">
        <li onClick={scrollToTop} style={{ cursor: 'pointer' }}>Inicio</li> {/* Agregado onClick */}
        <li>Vehículos</li>
        <li>Nosotros</li>
        <li>Servicios</li>
      </ul>
      <div className="nav-right">
        <input type="text" placeholder="Buscar autos..." />
        <img src={user} alt="mi perfil" className="logoUser" />
        <img src={heart} alt="favoritos" className="favoritos" />
        <img src={carrito} alt="carrito" className="logocarrito" />
      </div>
    </nav>
  );
};

export default NavBar;