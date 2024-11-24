import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../estilos/ResultadosProductos.css';
import heart from '../assets/heartwhite.svg'; // Icono de corazón vacío
import heartblue from '../assets/heartblue.svg'; // Icono de corazón lleno
import { Link } from "react-router-dom";

const ResultadosProductos = () => {
  const filtrosIniciales = {
    añoMax: 2025,
    añoMin: 2000,
    precioMax: 1000000,
    precioMin: 0,
    marca: "",
    modelo: "",
  };

  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [categorias, setCategorias] = useState({
    marcas: [],
    modelos: [],
  });
  const [favoritos, setFavoritos] = useState([]); // Lista de favoritos

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
    cargarFavoritos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all');
      const productosConImagen = response.data.map(producto => ({
        ...producto,
        imagenUrl: `http://localhost:8080/api/producto/all/${producto.id}/imagen`,
      }));
      setProductos(productosConImagen);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all');
      const productos = response.data;
      const marcas = [...new Set(productos.map(p => p.marca))];
      const modelos = [...new Set(productos.map(p => p.modelo))];
      setCategorias({ marcas, modelos });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const cargarFavoritos = async () => {
    const token = localStorage.getItem('authToken'); // Asegúrate de manejar autenticación
    try {
      const response = await axios.get('http://localhost:8080/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setFavoritos(response.data.map(producto => producto.id)); // Cargar IDs de productos favoritos
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const toggleFavorito = async (productoId) => {
    const token = localStorage.getItem('authToken');
    const esFavorito = favoritos.includes(productoId);

    try {
      if (esFavorito) {
        // Eliminar de favoritos
        await axios.delete(`http://localhost:8080/api/wishlist/${productoId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFavoritos(prevFavoritos => prevFavoritos.filter(id => id !== productoId));
      } else {
        // Agregar a favoritos
        await axios.post(`http://localhost:8080/api/wishlist/${productoId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFavoritos(prevFavoritos => [...prevFavoritos, productoId]);
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error.response?.data || error.message);
    }
  };

  return (
    <div className="contenedor-resultados">
      <NavBar />
      <aside className="filtros">
        {/* Filtros */}
        <h2>Filtrar</h2>
        {/* Código de filtros omitido por brevedad */}
      </aside>
      <main className="resultados">
        <h2>Resultados</h2>
        <div className="lista-productos">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div key={producto.id} className="producto">
                <div style={{ position: 'relative' }}>
                  <Link to={`/car/${producto.id}`}>
                    <img src={producto.imagenUrl} alt={`${producto.marca} ${producto.modelo}`} className="imagen-producto" />
                  </Link>
                  <button
                    className="wishlist-boton"
                    onClick={() => toggleFavorito(producto.id)}
                  >
                    <img
                      src={favoritos.includes(producto.id) ? heartblue : heart}
                      alt="wishlist icon"
                    />
                  </button>
                </div>
                <Link to={`/car/${producto.id}`}>
                  <h3>{producto.marca} {producto.modelo}</h3>
                </Link>
                <p>Año: {producto.año}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Kilometraje: {producto.km}</p>
                <p>Stock: {producto.stock}</p>
              </div>
            ))
          ) : (
            <p className='noResultados'>Lo sentimos, no encontramos resultados para tu búsqueda</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultadosProductos;
