import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../estilos/CarDetail.css';

const CarDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [car, setCar] = useState(null);
  const [contador, setContador] = useState(0);
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
      const response = await fetch(`http://localhost:8080/api/producto/all/${productoId}`);

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.status} ${response.statusText}`);
      }

      const productoData = await response.json();
      const stock = productoData.stock; // Asumiendo que 'stock' está en la respuesta

      if (stock < 1) {
        mostrarNotificacion("La cantidad de stock no es suficiente", "error");
        return;
      }

      const carritoResponse = await fetch('http://localhost:8080/api/carrito/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ producto: productoId, cantidad: 1 })
      });

      if (!carritoResponse.ok) {
        throw new Error(`Error adding to cart: ${carritoResponse.status} ${carritoResponse.statusText}`);
      }

      mostrarNotificacion("Producto agregado al carrito", "éxito"); // Mensaje de éxito
    } catch (error) {
      mostrarNotificacion("Error al agregar al carrito", "error");
      console.error(error);
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

  const comprarAhora = async (productoId) => {
    try {
      const response = await fetch('http://localhost:8080/api/carrito/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ producto: productoId, cantidad: 1 })
      });

      if (!response.ok) {
        throw new Error(`Error adding to cart: ${response.status} ${response.statusText}`);
      }

      handleCheckoutRedirect();
    } catch (error) {
      console.error("Error al seleccionar el producto:", error);
    }
  };

  const handleCheckoutRedirect = () => {
    navigate('/checkout'); // Redirige a la vista CheckoutView
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
        <button onClick={() => comprarAhora(car.id)}>Comprar ahora</button>
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
