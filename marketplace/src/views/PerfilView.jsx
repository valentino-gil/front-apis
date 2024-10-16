import React from 'react';
import '../estilos/Perfil.css';
import NavBar from '../components/NavBar'; // Importa el componente NavBar
import profileIcon from '../assets/user.svg'; // Asegúrate de tener un ícono de perfil en esta ruta

const PerfilView = () => {
    // Simulación de datos del usuario (en un futuro se obtendrían de la API)
    const user = {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        username: 'juanperez123'
    };

    return (
        <div>
            <NavBar /> {/* Agrega la barra de navegación aquí */}
            <div className="profile-container">
                <div className="profile-content">
                    <h2>Mi Perfil</h2>
                    <div className="profile-info">
                        <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
                        <div className="user-details">
                            <p><strong>Nombre:</strong> {user.nombre}</p>
                            <p><strong>Apellido:</strong> {user.apellido}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Nombre de Usuario:</strong> {user.username}</p>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="invoices-button">Mis Facturas</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilView;
