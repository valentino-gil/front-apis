import axios from 'axios';
import React, { useEffect, useState } from 'react';
import carrito from '../assets/carrito.svg';
import trashcan from '../assets/trashcan.svg';
import NavBar from '../components/NavBar';
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
// Función para agregar un producto a la wishlist
const addToWishlist = async (productoId) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/wishlist/${productoId}`, // Usamos el ID del producto en la URL
            {}, // El cuerpo puede estar vacío si no necesitas más datos
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        
        // Agregar el producto recién agregado a la wishlist al estado local
        setWishlistItems(prevItems => [...prevItems, response.data]); 
        console.log('Producto agregado a la wishlist:', response.data);
    } catch (error) {
        console.error('Error al agregar el producto a la wishlist:', error);
    }
};


    // Función para agregar un producto al carrito
    const addToCart = async (productoId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/producto/all/${productoId}`);
            const carrito = await axios.post(`http://localhost:8080/api/carrito/`, 
                {
                    producto: productoId,
                    cantidad: 1
                },
                {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.stock === 0){
                await axios.delete(`http://localhost:8080/api/carrito/borrar/${carrito.data.id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
                );
            }
            else if(response.data.stock < carrito.data.cantidad){
                console.error("La cantidad de stock no es suficiente: ", error);
                const cantidad = carrito.data.cantidad - 1;
                await axios.put(`http://localhost:8080/api/carrito/cantidad/${cantidad}`, 
                { id: itemId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            else{
                alert('Producto agregado al carrito'); // Mensaje de éxito
            }
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
                                <img src={item.imagen} alt={`${item.marca} ${item.modelo}`} className="item-image" />
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
