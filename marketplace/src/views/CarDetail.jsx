import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../estilos/CarDetail.css';

const CarDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [car, setCar] = useState(null);
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(80, 80);
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/producto/all/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching car: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCar(data);

        // Obtener la cantidad en el carrito
        const carritoResponse = await fetch('http://localhost:8080/api/carrito/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (carritoResponse.ok) {
          const carritoData = await carritoResponse.json();
          const item = carritoData.find(item => item.producto === parseInt(id, 10));
          setCantidadEnCarrito(item ? item.cantidad : 0);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCar();
  }, [id, token]);

  const agregarCarrito = async () => {
    if (!car) return;

    if (cantidadEnCarrito + 1 > car.stock) {
      mostrarNotificacion('No hay suficiente stock disponible.', 'error');
      return;
    }

    try {
      const carritoResponse = await fetch('http://localhost:8080/api/carrito/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ producto: car.id, cantidad: 1 }),
      });

      if (!carritoResponse.ok) {
        throw new Error(`Error adding to cart: ${carritoResponse.status} ${carritoResponse.statusText}`);
      }

      setCantidadEnCarrito(cantidadEnCarrito + 1); // Actualiza la cantidad en el carrito
      mostrarNotificacion('Producto agregado al carrito', 'éxito');
    } catch (error) {
      mostrarNotificacion('Error al agregar al carrito', 'error');
      console.error(error);
    }
  };

  const mostrarNotificacion = (texto, tipo) => {
    setMensaje(texto);
    setMostrarMensaje(true);
    setTimeout(() => {
      setMostrarMensaje(false);
    }, 3000);
  };

  if (!car) {
    return <div>Cargando detalles del auto...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="car-detail">
        <img src={car.imagen} alt={`${car.marca} ${car.modelo}`} />
        <h1>{car.marca} {car.modelo}</h1>
        <p>Precio: {car.precio}</p>
        <p>Kilometraje: {car.km} km</p>
        <p>Año: {car.año}</p>
        <p>{car.descripcion}</p>
        <p>Stock disponible: {car.stock - cantidadEnCarrito}</p>
        <button onClick={() => agregarCarrito()}>Añadir al carrito</button>
        {mostrarMensaje && (
          <div className={`mensaje ${mensaje === 'Producto agregado al carrito' ? 'verde' : 'rojo'}`}>
            {mensaje}
          </div>
        )}
      </div>
    </>
  );
};

export default CarDetail;

