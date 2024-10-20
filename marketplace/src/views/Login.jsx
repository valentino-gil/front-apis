import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario
import '../estilos/Login.css'


const LoginView = () => {
  const [mail, setMail] = useState(''); // Cambia de email a mail
  const [contraseña, setContraseña] = useState(''); // Cambia de password a contraseña
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Para redirigir al usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, contraseña }), // Cambia los nombres aquí
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de respuesta del servidor:", data.access_token);
        localStorage.setItem('authToken', data.access_token);  // Guarda el token en localStorage
        navigate('/');  // Redirige a la página de bienvenida home
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registro'); // Redirige a la vista RegisterView
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mail">Email:</label>
            <input
              type="email"
              id="mail" // Cambia de email a mail
              value={mail} // Cambia de email a mail
              onChange={(e) => setMail(e.target.value)} // Cambia de email a mail
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña" // Cambia de password a contraseña
              value={contraseña} // Cambia de password a contraseña
              onChange={(e) => setContraseña(e.target.value)} // Cambia de password a contraseña
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='ingresar' type="submit">Ingresar</button>
          <button className='registrarse' type="button" onClick={handleRegisterRedirect}>Crear cuenta</button> {/* Cambia el tipo a button */}
        </form>
      </div>
    </div>
  );
};

export default LoginView;
