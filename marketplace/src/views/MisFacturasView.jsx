import React, { useEffect, useState } from 'react';
import '../estilos/Carrito.css';
import NavBar from '../components/NavBar';
import a_left from '../assets/arrow-left.svg';
import a_right from '../assets/arrow-right.svg';
import axios from 'axios';

const MisFacturasView = () => {
    const [facturas, setFacturas] = useState([]);
    const [contador, setContador] = useState([]);
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
            const facturaItems = carritoResponse.data;
            setFacturas(facturaItems);
            setContador(0);
            () => detalles(contador);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    // Obtener los productos del carrito y sus detalles al cargar la vista
    useEffect(() => {
        fetchFacturas();
    }, [token]); // Dependencia de 'token' para asegurarse de que siempre se actualice correctamente

    // Función para actualizar la cantidad de un producto
    const cambiarPagina = async (newQuantity) => {
        if (newQuantity < 1 || facturas[newQuantity] === undefined) return; // Evitar cantidades menores a 1
        try {
            setContador(newQuantity);
            () => detalles(newQuantity);
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    };

    const detalles = async (cantidad) =>{
        try{
            const response = await axios.put(`http://localhost:8080/api/facturas/${facturas[newQuantity].id}`, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const itemsFacturas =  response.data;
            setItems(itemsFacturas);
            const productosResponse = await axios.get('http://localhost:8080/api/producto/all');
            const allProductos = productosResponse.data;

            setProductos(allProductos.filter(producto =>
                itemsFacturas.some(item => item.productoId === producto.id)));
        }catch (error){
            console.error("No se enconntraron los detalles: ", error)
        }
    }

    const item = (p_id) =>{
        return itemsFactura
            .filter(item => item.productoId === p_id)
            .map(item => item.cantidad);
    }

    return (
        <div>
            <NavBar /> {/* Agrega la barra de navegación aquí */}
            <div className="factura-container">
                <div className="factura-content">
                    <h2>Mis Facturas</h2>
                    <div className="page-control">
                        <button onClick={() => cambiarPagina(contador - 1)}>
                            <img src={a_left} alt="anterior" className="icon" />
                        </button>
                        <span className="page">Pagina {contador}</span>
                        <button onClick={() => cambiarPagina(contador + 1)}>
                            <img src={a_right} alt="posterior" className="icon" />
                        </button>
                    </div>
                    {facturas.length === 0 ? (
                        <p>No hay facturas aun. Haz tu primera compra!!</p>
                    ) : (
                        productos.map(producto => {
                            if (!producto) return null;
                            return (
                                <div key={producto.id} className="factura-item">
                                    <img src={producto.Imagen} alt={`${producto.marca} ${producto.modelo} ${producto.año}`} className="item-image" />
                                    <div className="item-details">
                                        <h3>{item(producto.id)}x {producto.marca} {producto.modelo} {producto.año}</h3>
                                    </div>
                                    <p className="item-total">${(producto.precio * item(producto.id)).toLocaleString()}</p>
                                </div>
                            );
                        })
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
