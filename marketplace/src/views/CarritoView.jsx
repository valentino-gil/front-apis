import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trashcan from '../assets/trashcan.svg';
import NavBar from '../components/NavBar';
import '../estilos/Carrito.css';

const CarritoView = () => {
    const [items, setItems] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('authToken');

    // Función para obtener los datos del carrito y los productos
    const fetchCarrito = async () => {
        try {
            // Solicitud para obtener los productos del carrito
            const carritoResponse = await axios.get('http://localhost:8080/api/carrito/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const carritoItems = carritoResponse.data;
            setItems(carritoItems);

            // Solicitud para obtener los detalles de los productos
            const productosResponse = await axios.get('http://localhost:8080/api/producto/all');
            const allProductos = productosResponse.data;

            // Filtrar los productos que están en el carrito
            const productosFiltrados = allProductos.filter(producto =>
                carritoItems.some(item => item.producto === producto.id)
            );

            setProductos(productosFiltrados);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    // Obtener los productos del carrito y sus detalles al cargar la vista
    useEffect(() => {
        fetchCarrito();
    }, [token]); // Dependencia de 'token' para asegurarse de que siempre se actualice correctamente

    // Función para actualizar la cantidad de un producto
    const actualizarCantidad = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Evitar cantidades menores a 1
        try {
            await axios.put(`http://localhost:8080/api/carrito/cantidad/${newQuantity}`, 
                { id: itemId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const i = items.map(item => item.id === itemId);
            const response = await axios.get(`http://localhost:8080/api/producto/all/${i.producto}`);
            if (newQuantity <= response.data.stock){
                setItems(prevItems =>
                    prevItems.map(item =>
                        item.id === itemId ? { ...item, cantidad: newQuantity } : item
                    )
                );
            }
            else{
                console.error("La cantidad de stock no es suficiente: ", error);
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/api/carrito/borrar/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    // Calcular el subtotal
    const calcularSubtotal = () => {
        return items.reduce((acc, item) => {
            const producto = productos.find(p => p.id === item.producto);
            return acc + (producto ? producto.precio * item.cantidad : 0);
        }, 0);
    };

    const handleChekoutRedirect = () => {
        navigate("/checkout"); // Redirige a la vista CheckoutView
    };

    return (
        <div>
            <NavBar /> {/* Agrega la barra de navegación aquí */}
            <div className="cart-container">
                <div className="cart-content">
                    <h2>Mi Carrito</h2>
                    {items.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        items.map(item => {
                            const producto = productos.find(p => p.id === item.producto);
                            if (!producto) return null;
                            return (
                                <div key={item.id} className="cart-item">
                                    <img src={producto.Imagen} alt={`${producto.marca} ${producto.modelo} ${producto.año}`} className="item-image" />
                                    <div className="item-details">
                                        <h3>{producto.marca} {producto.modelo} {producto.año}</h3>
                                        <p class="descripcion">{producto.descripcion}</p>
                                        <div className="quantity-control">
                                            <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                                            <span className="quantity">{item.cantidad}</span>
                                            <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                                        </div>
                                        <button onClick={() => eliminarItem(item.id)} className="remove-button">Borrar <img src={trashcan} alt="borrar" className="logoTrashCan" /></button>
                                    </div>
                                    <p className="item-total">${(producto.precio * item.cantidad).toLocaleString()}</p>
                                </div>
                            );
                        })
                    )}
                    {items.length > 0 && (
                        <div className="cart-summary">
                            <p className="total">Sub-total: ${calcularSubtotal().toLocaleString()}</p>
                            <button className="checkout-button" onClick={handleChekoutRedirect}>Finalizar compra</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarritoView;
