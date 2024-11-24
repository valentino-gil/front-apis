import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../estilos/ResultadosProductos.css';
import heart from '../assets/heartwhite.svg'; // Icono de corazón vacío
import heartblue from '../assets/heartblue.svg'; // Icono de corazón lleno
import { Link } from "react-router-dom"; // Importa el componente Link


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
  const [favoritos, setFavoritos] = useState([]); // Estado para manejar favoritos

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all');
      const productosConImagen = response.data.map(producto => ({
        ...producto,
        imagenUrl: `http://localhost:8080/api/producto/all/${producto.id}/imagen`, // Agrega la URL de la imagen para cada producto
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

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevState => ({ ...prevState, [name]: value }));
  };

  const aplicarFiltros = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all/filtrar', {
        params: filtros,
      });
      const productosFiltradosConImagen = response.data.map(producto => ({
        ...producto,
        imagenUrl: `http://localhost:8080/api/producto/all/${producto.id}/imagen`,
      }));
      setProductos(productosFiltradosConImagen);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  const restablecerFiltros = () => {
    setFiltros(filtrosIniciales);
    obtenerProductos();
  };

  const agregarAWishlist = async (productoId) => {
    const token = localStorage.getItem('authToken'); // Si necesitas autenticación

    try {
      await axios.post(`http://localhost:8080/api/wishlist/${productoId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setFavoritos(prevFavoritos => [...prevFavoritos, productoId]); // Actualiza el estado local
      console.log(`Producto ${productoId} añadido a la wishlist.`);
    } catch (error) {
      console.error('Error al añadir a la wishlist:', error.response?.data || error.message);
    }
  };

  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      setFavoritos(prevFavoritos => prevFavoritos.filter(id => id !== productoId));
    } else {
      agregarAWishlist(productoId);
    }
  };

  return (
    <div className="contenedor-resultados">
      <NavBar />
      <aside className="filtros">
        {/* Filtros */}
        <h2>Filtrar</h2>
        <div className="filtro-año">
          <label>Año: {filtros.añoMin} - {filtros.añoMax}</label>
          <input
            type="range"
            name="añoMin"
            min="2000"
            max="2025"
            value={filtros.añoMin}
            onChange={handleFiltroChange}
          />
          <input
            type="range"
            name="añoMax"
            min="2000"
            max="2025"
            value={filtros.añoMax}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="filtro-precio">
          <label>Precio: ${filtros.precioMin} - ${filtros.precioMax}</label>
          <input
            type="range"
            name="precioMin"
            min="0"
            max="1000000"
            step="1000"
            value={filtros.precioMin}
            onChange={handleFiltroChange}
          />
          <input
            type="range"
            name="precioMax"
            min="0"
            max="1000000"
            step="1000"
            value={filtros.precioMax}
            onChange={handleFiltroChange}
          />
        </div>
        <div>
          <label>Marcas</label>
          <select name="marca" value={filtros.marca} onChange={handleFiltroChange}>
            <option value="">Todas</option>
            {categorias.marcas.map((marca, index) => (
              <option key={index} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Modelos</label>
          <select name="modelo" value={filtros.modelo} onChange={handleFiltroChange}>
            <option value="">Todos</option>
            {categorias.modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
        </div>
        <button className="botonAplicar" onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button className="botonRestablecer" onClick={restablecerFiltros}>Restablecer Filtros</button>
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
