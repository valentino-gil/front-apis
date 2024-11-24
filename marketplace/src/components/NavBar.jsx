import React, { useState, useEffect } from 'react';
import logo from '../assets/car.svg'; // logo de la página
import user from '../assets/user.svg'; // icono usuario
import heart from '../assets/heart.svg'; // icono wishlist
import carrito from '../assets/carrito.svg'; // icono carrito
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState(null); // Estado para el rol de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si está logueado
  const [showMenu, setShowMenu] = useState(false); // Estado para manejar el menú desplegable de perfil
  const [showVehicleMenu, setShowVehicleMenu] = useState(false); // Estado para manejar el submenú de vehículos
  const navigate = useNavigate();

  // Lógica para verificar si el usuario está logueado y obtener el rol
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/api/usuario/perfil', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserRole(data.role);
            setIsLoggedIn(true);
          } else {
            console.error("Error al obtener el perfil del usuario");
            handleLogout();
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchUserRole();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/api/producto/all/buscar?query=${searchTerm}`);
      
      if (response.ok) {
        const resultados = await response.json();
        // Redirigir a una página que muestre los resultados, pasando los datos
        navigate('/resultados', { state: { productos: resultados } });
      } else {
        console.error('Error al buscar autos');
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };
  

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/', { replace: true });
  };

  // Función para navegar al inicio y hacer scroll al tope
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
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
          userRole === 'Comprador' ? (
            <li onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Comprar Vehículo</li>
          ) : (
            <>
              <li onClick={() => setShowVehicleMenu(!showVehicleMenu)} style={{ cursor: 'pointer', position: 'relative' }}>
                Vehículo
                {/* Submenú para vehículos */}
                {showVehicleMenu && (
                  <ul className="submenu">
                    <li onClick={() => { navigate('/misVehiculos'); setShowVehicleMenu(false); }}>
                      Ver mis vehículos
                    </li>
                    <li onClick={() => { navigate('/registroAuto'); setShowVehicleMenu(false); }}>
                      Agregar vehículo
                    </li>
                  </ul>
                )}
              </li>
            </>
          )
        ) : (
          <li onClick={() => navigate('/Login')} style={{ cursor: 'pointer' }}>Comprar/Vender Vehículos</li>
        )}
  
        <li onClick={() => navigate('/nosotros')} style={{ cursor: 'pointer' }}>Nosotros</li>
        <li onClick={() => navigate('/servicios')} style={{ cursor: 'pointer' }}>Servicios</li>
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
        <Link to="/wishlist">
          <img src={heart} alt="favoritos" className="favoritos" />
        </Link>
        <Link to="/carrito">
          <img src={carrito} alt="carrito" className="logocarrito" />
        </Link>
  
        {/* Opciones de perfil si el menú está desplegado */}
        {showMenu && (
          <div className="menu-dropdown">
            {isLoggedIn ? (
              <>
                {userRole === 'Vendedor' && (
                  <>
                    
                  </>
                )}
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
                <div onClick={() => { navigate('/registro'); setShowMenu(false); }}>
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



