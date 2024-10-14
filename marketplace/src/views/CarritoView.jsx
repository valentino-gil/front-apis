import React, { useState } from 'react';
import '../estilos/Carrito.css';
import trashcan from '../assets/trashcan.svg';

const CarritoView = () => {
    // Simulando la obtención de elementos del carrito
    const [Items, setItems] = useState([
        { id: 1, name: 'Toyota Hilux 2019', price: 45000, quantity: 1, image: 'Toyota_Hilux_2019.jpg' },
        { id: 2, name: 'Ford Ranger 2020', price: 55000, quantity: 1, image: 'Ford_Ranger_2020.jpg' }
    ]);

    // Función para actualizar la cantidad de un producto
    const actualizarCantidad = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Evitar cantidades menores a 1
        setItems(Items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Función para eliminar un producto del carrito
    const eliminarItem = (itemId) => {
        setItems(Items.filter(item => item.id !== itemId));
    };

    // Calcular el subtotal
    const calcularSubtotal = () => {
        return Items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-container">
            <div className="cart-content">
                <h2>Elementos del carrito</h2>

                {Items.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    Items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <div className="quantity-control">
                                    <button onClick={() => actualizarCantidad(item.id, item.quantity - 1)}>-</button>
                                    <span class="quantity">{item.quantity}</span>
                                    <button onClick={() => actualizarCantidad(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => eliminarItem(item.id)} className="remove-button">Borrar <img src={trashcan} alt="borrar" className="logoTrashCan" /></button>
                            </div>
                            <p className="item-total">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))
                )}

                {Items.length > 0 && (
                    <div className="cart-summary">
                        <p class="total">Sub-total: ${calcularSubtotal().toLocaleString()}</p>
                        <button className="checkout-button">Finalizar compra</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarritoView;
