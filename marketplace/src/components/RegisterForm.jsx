import React, { useState } from 'react';
import './RegisterForm.css'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: '',
    nombreUsuario: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Registro exitoso');
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registrarse</h2>

        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input type="text" name="nombreUsuario" placeholder="Nombre de Usuario" value={formData.nombreUsuario} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Rol</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled>Seleccione su rol</option>
            <option value="Comprador">Comprador</option>
            <option value="Vendedor">Vendedor</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
