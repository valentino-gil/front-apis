import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Perfil.css';
import NavBar from '../components/NavBar';
import profileIcon from '../assets/user.svg';
import { useNavigate } from 'react-router-dom';

const PerfilView = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token) {
            setError('No se encontró un token de autenticación.');
            return;
        }

        axios.get('http://localhost:8080/api/usuario/perfil', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario:', error);
                setError('No se pudieron cargar los datos del usuario.');
            });
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Eliminar el token del almacenamiento local
        navigate('/'); // Redirigir al home
    };

    const handleRedirectFacturas = () => {
        navigate('/misfacturas');
    }

    return (
        <div>
            <NavBar />
            <div className="profile-container">
                <div className="profile-content">
                    <h2>Mi Perfil</h2>
                    {error && <p className="error-message">{error}</p>}
                    {user ? (
                        <div className="profile-info">
                            <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
                            <div className="user-details">
                                <p><strong>Nombre:</strong> {user.nombre}</p>
                                <p><strong>Apellido:</strong> {user.apellido}</p>
                                <p><strong>Email:</strong> {user.mail}</p>
                                <p><strong>Nombre de Usuario:</strong> {user.nombreUsuario}</p>
                            </div>
                        </div>
                    ) : (
                        !error && <p>Cargando datos del usuario...</p>
                    )}
                    <div className="actions">
                        <button className="invoices-button" onClick={handleRedirectFacturas}>Mis Facturas</button>
                        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilView;
