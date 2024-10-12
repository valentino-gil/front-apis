import React from 'react';
import FormInput from './FormInput';
import './RegisterForm.css'
const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el submit
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registrarse</h2>

        <div className="contact-info">
          <h3>Contacto</h3>
          <FormInput label="Email" type="email" name="email" placeholder="Email" />
          <FormInput label="Password" type="password" name="password" placeholder="Password" />
          <div className="form-group">
            <label>Rol</label>
              <select name="role" id="role" defaultValue="" required>
                <option value="" disabled>Seleccione su rol</option>
                <option value="comprador">Comprador</option>
                <option value="vendedor">Vendedor</option>
              </select>
          </div>
        </div>

        <div className="personal-info">
          <h3>Datos Personales</h3>
          <FormInput label="Nombre" type="text" name="name" placeholder="Name" />
          <FormInput label="Apellido" type="text" name="secondName" placeholder="Second Name" />
          <FormInput label="Ciudad" type="text" name="city" placeholder="City" />
          <FormInput label="Código Postal" type="text" name="postalCode" placeholder="Postal Code" />
          <FormInput label="Provincia" type="text" name="province" placeholder="Province" />

          <div className="form-group">
            <label>País/Región</label>
            <select name="country" className="form-control">
              <option value="Italy">Italy</option>
              <option value="Argentina">Argentina</option>
              
            </select>
          </div>

    

          <div className="form-group">
            <label>
              <input type="checkbox" name="saveInfo" />
              Guardar esta información para una compra rápida futura
            </label>
          </div>

          <button type="submit" className="btn-submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
