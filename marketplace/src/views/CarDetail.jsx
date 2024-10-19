import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../estilos/CarDetail.css';
import NavBar from '../components/NavBar';
const CarDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [car, setCar] = useState(null);


  useEffect(() => {
    window.scrollTo(80, 80);
  }, []);

  useEffect(() => {

    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/producto/all/${id}`);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`Error fetching car: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return <div>Cargando detalles del auto...</div>;
  }

  return (
    <>
      <NavBar/>
      <div className="car-detail">
      
        <img src={car.imagen} alt={`${car.marca} ${car.modelo}`} />
        <h1>{car.marca} {car.modelo}</h1>
        <p>Precio: {car.precio}</p>
        <p>Kilometraje: {car.km} km</p>
        <p>Año: {car.año}</p>
        <p>{car.descripcion}</p>
        <button>Comprar ahora</button>
        <button>Añadir al carrito</button>
      </div>
    </>
  );
};

export default CarDetail;
