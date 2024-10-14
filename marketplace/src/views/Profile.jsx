import React from 'react';
import '../estilos/Profile.css'
import NavBar from '../components/NavBar'

const Profile = () => {
  return (
    <>
    <NavBar />
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-header">
          <img src="https://via.placeholder.com/150" alt="Profile" className="profile-picture" />
          <h2>Sebastian Gomez</h2>
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <img src="https://via.placeholder.com/50" alt="Direccion" />
            <p>Direccion</p>
          </div>
          <div className="profile-item">
            <img src="https://via.placeholder.com/50" alt="Mis Compras" />
            <p>Mis compras</p>
          </div>
          <div className="profile-item">
            <img src="https://via.placeholder.com/50" alt="Tarjetas" />
            <p>Tarjetas</p>
          </div>
          <div className="profile-item">
            <img src="https://via.placeholder.com/50" alt="Opiniones" />
            <p>Opiniones</p>
          </div>
          <div className="profile-item">
            <img src="https://via.placeholder.com/50" alt="Informacion personal" />
            <p>Informacion personal</p>
          </div>
        </div>
      </div>

      <div className="recently-viewed">
        <h3>Visto recientemente</h3>
        <div className="recent-item">
          <img src="https://via.placeholder.com/100" alt="Toyota Hilux" />
          <p>Toyota Hilux</p>
          <p>$9.99</p>
        </div>
        <div className="recent-item">
          <img src="https://via.placeholder.com/100" alt="Citroen DS3" />
          <p>Citroen DS3</p>
          <p>$9.99</p>
        </div>
        <div className="recent-item">
          <img src="https://via.placeholder.com/100" alt="Renault Clio" />
          <p>Renault Clio</p>
          <p>$9.99</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
