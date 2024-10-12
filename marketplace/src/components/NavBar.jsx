import React from "react";
import logo from '../assets/car.svg';  // Importa tu logo aquí
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';  // Importa los íconos
import user from '../assets/user.svg';

const NavBar = () => {
  return (
    <nav>
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="nav-center">
        <li>Inicio</li>
        <li>Vehículos</li>
        <li>Nosotros</li>
        <li>Servicios</li>
      </ul>
      <div className="nav-right">
        <input type="text" placeholder="Buscar autos..." />
        <img src={user} alt="logoUser" className="logoUser" />
        <FaHeart className="icon" />
        <FaShoppingCart className="icon" />
      </div>
    </nav>
  );
};

export default NavBar;

  