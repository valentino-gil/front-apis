import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/MisVehiculos.css';

const MisVehiculos = () => {
  const [autos, setAutos] = useState([]);
  const navigate = useNavigate();

  // Obtener los vehículos del usuario
  const fetchVehiculos = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/producto/misVehiculos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAutos(data);
      } else {
        console.error('Error al obtener los vehículos');
      }
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  // Borrar vehículo
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/producto/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAutos(autos.filter(auto => auto.id !== id)); // Actualiza la lista después de borrar
      } else {
        console.error('Error al borrar el vehículo');
      }
    } catch (error) {
      console.error('Error al borrar el vehículo:', error);
    }
  };

  // Redirigir a la vista de actualización
  const handleUpdate = (id) => {
    navigate(`/actualizarAuto/${id}`);
  };

  return (
    <div className="mis-vehiculos-container">
      <h1>Mis Vehículos</h1>
      <ul>
        {autos.map((auto) => (
          <li key={auto.id}>
            <h3>{auto.modelo}</h3>
            <p>{auto.marca}</p>
            <button onClick={() => handleUpdate(auto.id)}>Actualizar</button>
            <button onClick={() => handleDelete(auto.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisVehiculos;
