import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import trashcan from '../assets/trashcan.svg';
import carrito from '../assets/carrito.svg';
import '../estilos/Wishlist.css';

const WishlistView = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local

    // Función para obtener la lista de deseos
    const fetchWishlist = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setWishlistItems(response.data); // Usa response.data para configurar la lista de productos
        } catch (error) {
            console.error('Error al obtener la lista de deseos:', error);
        }
    };

    // Cargar la lista de deseos al montar el componente
    useEffect(() => {
        fetchWishlist();
    }, []);

    // Función para eliminar un producto de la wishlist
    const removeFromWishlist = async (productoId) => {
        try {
            await axios.delete(`http://localhost:8080/api/wishlist/${productoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(prevItems => prevItems.filter(item => item.id !== productoId)); // Filtra el producto eliminado
        } catch (error) {
            console.error('Error al eliminar el producto de la lista de deseos:', error);
        }
    };

    // Función para agregar un producto al carrito
    const addToCart = async (productoId) => {
        try {
            // Aquí deberías implementar la lógica para agregar el producto al carrito
            // Esto es un ejemplo, necesitarás el endpoint correspondiente
            await axios.post(`http://localhost:8080/api/carrito`, 
                {
                    producto: productoId,
                    cantidad: 1
                }, 
                {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Producto agregado al carrito'); // Mensaje de éxito
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="wishlist-container">
                <div className="wishlist-content">
                    <h2>Mi Wishlist</h2>
                    {wishlistItems.length === 0 ? (
                        <p>No hay productos en la wishlist.</p>
                    ) : (
                        wishlistItems.map(item => (
                            <div key={item.id} className="wishlist-item">
                                <img src={item.Imagen} alt={`${item.marca} ${item.modelo}`} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.marca} {item.modelo} {item.año}</h3>
                                    <p className="descripcion">{item.descripcion}</p>
                                    <p className="precio">Precio: ${item.precio}</p>
                                </div>
                                <button className="add-to-cart-button" onClick={() => addToCart(item.id)}>
                                    Agregar al carrito
                                    <img src={carrito} alt="carrito" className="logoTrashCan" />
                                </button>
                                <button className="remove-button" onClick={() => removeFromWishlist(item.id)}>
                                    Eliminar
                                    <img src={trashcan} alt="borrar" className="logoTrashCan" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistView;
