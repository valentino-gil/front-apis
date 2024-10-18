import React, { useState, useEffect } from 'react';
import logo from '../assets/car.svg'; // logo de la pagina
import user from '../assets/user.svg'; // icono usuario
import heart from '../assets/heart.svg'; // icono wishlist
import carrito from '../assets/carrito.svg'; // icono carrito
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState(null); // Estado para el rol de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si está logueado
  const [showMenu, setShowMenu] = useState(false); // Estado para manejar el menú desplegable
  const navigate = useNavigate();

  // Función para obtener el rol del usuario desde el backend
  const fetchUserRole = async () => {
    const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
    if (token) {
      try {
        const response = await fetch('http://localhost:8080/api/usuario/perfil', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token como Bearer token
          },
        });

        if (response.ok) {
          const data = await response.json(); // Supongo que el backend devuelve el perfil con el rol
          setUserRole(data.role); // Asumimos que el rol está en la propiedad "role" del perfil
          setIsLoggedIn(true);
        } else {
          console.error("Error fetching user profile");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserRole(); // Llama a la función para obtener el rol cuando el componente se monta
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/"); // Redirige a la ruta home si es necesario
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    try {
      let searchUrl = `http://localhost:8080/api/producto/all/filtrar?modelo=${searchTerm.trim()}`;

      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        navigate("/resultados", { state: { autos: data } });
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error occurred while fetching search results", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/'); // Redirigir al home
  };

  return (
    <nav>
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
      </div>
      <ul className="nav-center">
        <li onClick={scrollToTop} style={{ cursor: 'pointer' }}>Inicio</li>
        
        {/* Lógica condicional para mostrar diferentes opciones según el rol */}
        {isLoggedIn ? (
          userRole === 'comprador' ? (
            <li onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Comprar Vehículo</li>
          ) : (
            <li onClick={() => navigate('/registroAuto')} style={{ cursor: 'pointer' }}>Vender Vehículo</li>
          )
        ) : (
          <li onClick={() => navigate('/Login')} style={{ cursor: 'pointer' }}>Comprar/Vender Vehículos</li>
        )}

        <li>Nosotros</li>
        <li>Servicios</li>
      </ul>
      <div className="nav-right">
        <form onSubmit={handleSearch}> 
          <input 
            type="text" 
            placeholder="Buscar autos por marca o modelo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </form>
        <img src={user} alt="mi perfil" className="logoUser" onClick={() => setShowMenu(!showMenu)} />
        <img src={heart} alt="favoritos" className="favoritos" />
        <img src={carrito} alt="carrito" className="logocarrito" />
        
        {/* Opciones de perfil si el menú está desplegado */}
        {showMenu && (
          <div className="menu-dropdown">
            {isLoggedIn ? (
              <>
                <div className="profile-option" onClick={() => { navigate('/perfil'); setShowMenu(false); }}>
                  Perfil
                </div>
                <div className="logout-option" onClick={handleLogout}>
                  Cerrar sesión
                </div>
              </>
            ) : (
              <>
                <div onClick={() => { navigate('/login'); setShowMenu(false); }}>
                  Iniciar sesión
                </div>
                <div onClick={() => { navigate('/register'); setShowMenu(false); }}>
                  Registrarse
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
