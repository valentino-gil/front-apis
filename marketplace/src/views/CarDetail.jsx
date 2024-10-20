import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../estilos/CarDetail.css';
import NavBar from '../components/NavBar';
import axios from 'axios';

const CarDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [car, setCar] = useState(null);
  const [contador, setContador] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const token = localStorage.getItem('authToken');

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

  const agregarCarrito = async (productoId) => {
    try {
      setContador(prevContador => {
        const nuevoContador = prevContador + 1;

        axios.post('http://localhost:8080/api/carrito/', 
          { producto: productoId, cantidad: nuevoContador }, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        ).then(response => {
          mostrarNotificacion("Artículo agregado correctamente al carrito", "success");
        }).catch(error => {
          mostrarNotificacion("Error al agregar al carrito", "error");
        });

        return nuevoContador;
      });
    } catch (error) {
      mostrarNotificacion("Error al agregar al carrito", "error");
    }
  };

  const mostrarNotificacion = (texto, tipo) => {
    setMensaje(texto);
    setMostrarMensaje(true);
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMostrarMensaje(false);
    }, 3000);
  };

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
        <button onClick={() =>  agregarCarrito(car.id)}>Añadir al carrito</button>
        {mostrarMensaje && (
        <div className={`mensaje ${mensaje === "Artículo agregado correctamente al carrito" ? "verde" : "rojo"}`}>
          {mensaje}
        </div>
      )}
      </div>
    </>
  );
};

export default CarDetail;
