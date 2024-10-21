import React, { useEffect, useState } from 'react';
import '../estilos/MisFacturas.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import a_left from '../assets/arrow-left.svg';
import a_right from '../assets/arrow-right.svg';
import FeaturedCars from '../components/FeaturedCars';

const MisFacturasView = () => {
    const [facturas, setFacturas] = useState([]);
    const [contador, setContador] = useState(0);
    const [productos, setProductos] = useState([]);
    const [itemsFactura, setItems] = useState([]);

    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('authToken');

    // Función para obtener las facturas y sus detalles
    const fetchFacturas = async () => {
        try {
            // Solicitud para obtener las facturas del usuario
            const carritoResponse = await axios.get('http://localhost:8080/api/facturas/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFacturas(carritoResponse.data);
            console.log(carritoResponse.data);
            console.log(facturas);
            console.log(facturas[0]);
            setContador(0);
            if (carritoResponse.data.length > 0) {
                const response = await axios.get(`http://localhost:8080/api/facturas/${carritoResponse.data[0].id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setItems(response.data);
            
                const productosResponse = await axios.get('http://localhost:8080/api/producto/all/all');
                const allProductos = productosResponse.data;
                setProductos(allProductos.filter(producto =>
                    response.data.some(item => item.productoId === producto.id)));
            }
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    // Obtener los productos del carrito y sus detalles al cargar la vista
    useEffect(() => {
        fetchFacturas();
    }, [token]);

    // Función para cambiar la página de la factura
    const cambiarPagina = async (newIndex) => {
        if (newIndex < 0 || newIndex >= facturas.length) return;
        setContador(newIndex);
        await fetchDetalles(newIndex);
    };

    // Función para obtener los detalles de una factura específica
    const fetchDetalles = async (index) => {
        try {
            console.log(facturas[index].id);
            const response = await axios.get(`http://localhost:8080/api/facturas/${facturas[index].id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(response.data);
            
            const productosResponse = await axios.get('http://localhost:8080/api/producto/all');
            const allProductos = productosResponse.data;
            setProductos(allProductos.filter(producto =>
                response.data.some(item => item.productoId === producto.id)));
        } catch (error) {
            console.error('No se encontraron los detalles:', error);
        }
    };

    // Función para obtener la cantidad de un producto en la factura
    const obtenerCantidad = (productoId) => {
        const item = itemsFactura.find(item => item.productoId === productoId);
        return item ? item.cantidad : 0;
    };

    

    return (
        <div>
            <NavBar />
            <div className="factura-container">
                <div className="factura-content">
                    <h2>Mis Facturas</h2>
                    <div className="page-control">
                        <button onClick={() => cambiarPagina(contador - 1)} disabled={contador === 0}>
                        <img src={a_left} alt="anterior" className="icon" />
                        </button>
                        <span className="page">Página {contador + 1}</span>
                        <button onClick={() => cambiarPagina(contador + 1)} disabled={contador === facturas.length - 1}>
                        <img src={a_right} alt="posterior" className="icon" />
                        </button>
                    </div>
                    {facturas.length === 0 ? (
                        <p>No hay facturas aún. ¡Haz tu primera compra!</p>
                    ) : (
                        productos.map(producto => (
                            <div key={producto.id} className="factura-item">
                                <img src={producto.imagen} alt={`${producto.marca} ${producto.modelo} ${producto.año}`} className="item-image" />
                                <div className="item-details">
                                    <h3>{obtenerCantidad(producto.id)}x {producto.marca} {producto.modelo} {producto.año}</h3>
                                </div>
                                <p className="item-total">${(producto.precio * obtenerCantidad(producto.id)).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                    {itemsFactura.length > 0 && (
                        <div className="factura-summary">
                            <p className="summary">Descuento: {facturas[contador].descuento}</p>
                            <p className="summary">Total: {facturas[contador].monto}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisFacturasView;
