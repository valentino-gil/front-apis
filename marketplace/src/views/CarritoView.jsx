import React, { useEffect, useState } from 'react';
import '../estilos/Carrito.css';
import NavBar from '../components/NavBar';
import trashcan from '../assets/trashcan.svg';
import axios from 'axios';

const CarritoView = () => {
    const [Items, setItems] = useState([]);
    const [productos, setProductos] = useState([]);

    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('authToken');

    // Obtener los productos del carrito y sus detalles al cargar la vista
    useEffect(() => {
        // Obtener los productos del carrito
        axios.get('http://localhost:8080/api/carrito/all', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setItems(response.data);
                // Obtener los detalles de los productos basados en los IDs del carrito
                return axios.get('http://localhost:8080/api/producto/all');
            })
            .then(response => {
                // Filtrar solo los productos que están en el carrito
                const productosFiltrados = response.data.filter(p =>
                    Items.some(item => item.producto === p.id)
                );
                console.log(productosFiltrados)
                setProductos(productosFiltrados);
            })
            .catch(error => console.error('Error al obtener los productos del carrito:', error));
    }, []);

    // Función para actualizar la cantidad de un producto
    const actualizarCantidad = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Evitar cantidades menores a 1
        const token = localStorage.getItem('authToken');
        axios.put(`http://localhost:8080/api/carrito/cantidad/${newQuantity}`, 
            { id: itemId },
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                setItems(Items.map(item =>
                    item.id === itemId ? {...item, cantidad: newQuantity } : item
                ));
            })
            .catch(error => console.error('Error al actualizar la cantidad:', error));
    };

    // Función para eliminar un producto del carrito
    const eliminarItem = (itemId) => {
        axios.delete(`http://localhost:8080/api/carrito/borrar/${itemId}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(() => {
                setItems(Items.filter(item => item.id !== itemId));
            })
            .catch(error => console.error('Error al eliminar el producto del carrito:', error));
    };

    // Calcular el subtotal
    const calcularSubtotal = () => {
        return Items.reduce((acc, item) => {
            const producto = productos.find(p => p.id === item.producto);
            return acc + (producto ? producto.precio * item.cantidad : 0);
        }, 0);
    };

    return (
        <div>
            <NavBar /> {/* Agrega la barra de navegación aquí */}
            <div className="cart-container">
                <div className="cart-content">
                    <h2>Mi Carrito</h2>
                    {Items.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        Items.map(item => {
                            const producto = productos.find(p => p.id === item.producto);
                            if (!producto) return null;
                            return (
                                <div key={item.id} className="cart-item">
                                    <img src={producto.Imagen} alt={producto.marca + ' ' + producto.modelo + '' + producto.año} className="item-image" />
                                    <div className="item-details">
                                        <h3>{producto.marca} {producto.modelo} {producto.año}</h3>
                                        <p>{producto.descripcion}</p>
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
                    {Items.length > 0 && (
                        <div className="cart-summary">
                            <p className="total">Sub-total: ${calcularSubtotal().toLocaleString()}</p>
                            <button className="checkout-button">Finalizar compra</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarritoView;
