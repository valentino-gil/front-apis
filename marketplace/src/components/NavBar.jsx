import React from "react";
import logo from '../assets/car.svg';  // logo de la pagina
import user from '../assets/user.svg'; // icono usuario
import heart from '../assets/heart.svg'; // icono wishlist
import carrito from '../assets/carrito.svg'; // icono carrito

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
        <img src={user} alt="mi perfil" className="logoUser" />
        <img src={heart} alt="favoritos" className="favoritos" />
        <img src={carrito} alt="carrito" className="logocarrito" />
      </div>
    </nav>
  );
};

export default NavBar;

  