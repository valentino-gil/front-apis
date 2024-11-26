import axios from 'axios';
import React, { useEffect, useState } from 'react';
import carrito from '../assets/carrito.svg';
import trashcan from '../assets/trashcan.svg';
import NavBar from '../components/NavBar';
import '../estilos/Wishlist.css';

const WishlistView = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local

    // Función para obtener la lista de deseos
    const fetchWishlist = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de deseos:', error);
        }
    };

    // Función para mostrar notificaciones
    const mostrarNotificacion = (texto, tipo) => {
        setMensaje(texto);
        setMostrarMensaje(true);
        setTimeout(() => {
            setMostrarMensaje(false);
        }, 3000);
    };

    // Función para agregar un producto al carrito
    const addToCart = async (productoId) => {
        try {
            // Verificar stock del producto
            const productoResponse = await axios.get(`http://localhost:8080/api/producto/all/${productoId}`);
            const producto = productoResponse.data;

            if (producto.stock <= 0) {
                mostrarNotificacion('Este producto no tiene stock disponible.', 'error');
                return;
            }

            // Comprobar que el carrito no exceda el stock
            const carritoResponse = await axios.get(`http://localhost:8080/api/carrito/${productoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const carritoItem = carritoResponse.data;

            const cantidadEnCarrito = carritoItem ? carritoItem.cantidad : 0;
            const nuevaCantidad = cantidadEnCarrito + 1;

            if (nuevaCantidad > producto.stock) {
                mostrarNotificacion(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`, 'error');
                return; // No realizar ninguna acción si se supera el stock
            }

            // Agregar al carrito si todo está bien
            await axios.post(
                `http://localhost:8080/api/carrito/`,
                {
                    producto: productoId,
                    cantidad: 1,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            mostrarNotificacion('Producto agregado al carrito correctamente.', 'éxito');
        } catch (error) {
            mostrarNotificacion('Error al agregar el producto al carrito', 'error');
            console.error('Error al agregar el producto al carrito:', error);
        }
    };

    // Función para eliminar un producto de la wishlist
    const removeFromWishlist = async (productoId) => {
        try {
            await axios.delete(`http://localhost:8080/api/wishlist/${productoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems((prevItems) =>
                prevItems.filter((item) => item.id !== productoId)
            );
        } catch (error) {
            console.error('Error al eliminar el producto de la lista de deseos:', error);
        }
    };

    // Cargar la lista de deseos al montar el componente
    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="wishlist-container">
                <div className="wishlist-content">
                    <h2>Mi Wishlist</h2>
                    {wishlistItems.length === 0 ? (
                        <p>No hay productos en la wishlist.</p>
                    ) : (
                        wishlistItems.map((item) => (
                            <div key={item.id} className="wishlist-item">
                                <img
                                    src={item.imagen}
                                    alt={`${item.marca} ${item.modelo}`}
                                    className="item-image"
                                />
                                <div className="item-details">
                                    <h3>
                                        {item.marca} {item.modelo} {item.año}
                                    </h3>
                                    <p className="descripcion">{item.descripcion}</p>
                                    <p className="precio">Precio: ${item.precio}</p>
                                </div>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => addToCart(item.id)}
                                >
                                    Agregar al carrito
                                    <img src={carrito} alt="carrito" className="logoTrashCan" />
                                </button>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    Eliminar
                                    <img src={trashcan} alt="borrar" className="logoTrashCan" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {mostrarMensaje && (
                    <div className={`mensaje ${mensaje === 'Producto agregado al carrito correctamente.' ? 'verde' : 'rojo'}`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistView;
