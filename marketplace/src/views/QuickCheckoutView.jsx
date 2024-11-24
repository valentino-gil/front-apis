import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../estilos/CheckoutView.css';

const QuickCheckoutView = () => {
    const { id } = useParams(); // Obtener el id de la URL
    const [item, setItem] = useState(null);
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
            const response = await fetch(`http://localhost:8080/api/producto/all/${id}`);
    
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error fetching car: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            setItem(data);
        } catch (error) {
            console.error("Error fetching car details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckout();
    }, [token]); // Solo ejecutar una vez al montar

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
            await axios.post(`http://localhost:8080/api/facturas/${item.id}/${codigo}`, {}, {
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
                    {item.length === 0 ? (
                        <p>No hay productos seleccionados para comprar</p>
                    ) : (
                                <div key={item.id} className="cart-item">
                                    <img src={item.imagen} alt={`${item.marca} ${item.modelo} ${item.año}`} className="item-image" />
                                    <div className="item-details">
                                        <h3>1x {item.marca} {item.modelo} {item.año}</h3>
                                        <p className="item-total">${(item.precio ).toLocaleString()}</p>
                                    </div>
                                </div>)}
                    {item != null  && (
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
                            <p className="total">Total: ${item.precio * (1-descuento)}</p>
                            <button onClick={() => confirmarCompra()} className="checkout-button">Confirmar compra</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickCheckoutView;