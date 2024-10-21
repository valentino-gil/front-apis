import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../estilos/CheckoutView.css';

const CheckoutView = () => {
    const [items, setItems] = useState([]);
    const [productos, setProductos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [codigo, setCodigo] = useState('h');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('authToken');

    const fetchCheckout = async () => {
        try {
            const carritoResponse = await axios.get('http://localhost:8080/api/carrito/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const carritoItems = carritoResponse.data;
            setItems(carritoItems);

            const productosResponse = await axios.get('http://localhost:8080/api/producto/all');
            const allProductos = productosResponse.data;

            const productosFiltrados = allProductos.filter(producto =>
                carritoItems.some(item => item.producto === producto.id)
            );

            setProductos(productosFiltrados);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            setMensaje('Error al obtener el carrito');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckout();
    }, [token]); // Solo ejecutar una vez al montar

    const calcularSubtotal = () => {
        return items.reduce((acc, item) => {
            const producto = productos.find(p => p.id === item.producto);
            return acc + (producto ? producto.precio * item.cantidad * (1 - descuento) : 0);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/facturas/descuento/${inputValue}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCodigo(inputValue);
            setDescuento(response.data);
            setIsDisabled(true);
            // Lógica para manejar la respuesta
        } catch (error) {
            console.error('Error al verificar el descuento:', error);
            setMensaje('Error al verificar el descuento');
        }
    };
    
    const confirmarCompra = async () => {
        try {
            await axios.post(`http://localhost:8080/api/facturas/${codigo}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/comprafinalizada'); // Redirige después de la compra
        } catch (error) {
            console.error('Error en la facturación:', error);
            setMensaje('Error en la facturación');
        }
    };
    

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    if (loading) {
        return <div>Cargando...</div>; // Mostrar mensaje de carga
    }

    return (
        <div>
            <NavBar />
            <div className="cart-container">
                <div className="cart-content">
                    <h2>Resumen de compra</h2>
                    {items.length === 0 ? (
                        <p>No hay productos seleccionados para comprar</p>
                    ) : (
                        items.map(item => {
                            const producto = productos.find(p => p.id === item.producto);
                            if (!producto) return null;
                            return (
                                <div key={item.id} className="cart-item">
                                    <img src={producto.imagen} alt={`${producto.marca} ${producto.modelo} ${producto.año}`} className="item-image" />
                                    <div className="item-details">
                                        <h3>{item.cantidad}x {producto.marca} {producto.modelo} {producto.año}</h3>
                                        <p className="item-total">${(producto.precio * item.cantidad).toLocaleString()}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    {items.length > 0 && (
                        <div className="cart-summary">
                            <form onSubmit={handleSubmit}>
                                Código de descuento:
                                <input
                                    type="text"
                                    placeholder="Escribe un código de descuento..."
                                    value={inputValue}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                />
                                <button className="descuento-button" onClick={handleSubmit}>Aplicar</button>
                                <p>{mensaje}</p>
                            </form>
                            <p className="total">Total: ${calcularSubtotal().toLocaleString()}</p>
                            <button onClick={() => confirmarCompra()} className="checkout-button">Confirmar compra</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;
