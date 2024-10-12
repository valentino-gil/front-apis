import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Has iniciado sesión correctamente y tienes acceso a esta página.</p>
    </div>
  );
}

export default Welcome;
