import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../estilos/ResultadosProductos.css';
import heart from '../assets/heartwhite.svg'; // icono wishlist

const ResultadosProductos = () => {
  const filtrosIniciales = {
    añoMax: 2025,
    añoMin: 2000,
    precioMax: 1000000,
    precioMin: 0,
    marcas: [],
    modelos: [],
  };

  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [categorias, setCategorias] = useState({
    marcas: [],
    modelos: [],
  });

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
      const response = await axios.get('http://localhost:8080/api/producto/all/filtrar', {
        params: {
          añoMax: filtros.añoMax,
          añoMin: filtros.añoMin,
        },
      });
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

  return (
    <div className="contenedor-resultados">
      <NavBar />
      <aside className="filtros">
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
            max="500000"
            step="100"
            value={filtros.precioMin}
            onChange={handleFiltroChange}
          />
          <input
            type="range"
            name="precioMax"
            min="0"
            max="500000"
            step="100"
            value={filtros.precioMax}
            onChange={handleFiltroChange}
          />
        </div>
        <div>
          <label>Marcas</label>
          <select name="marca" onChange={handleFiltroChange}>
            <option value="">Todas</option>
            {categorias.marcas.map((marca, index) => (
              <option key={index} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Modelos</label>
          <select name="modelo" onChange={handleFiltroChange}>
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
               <img src={producto.imagenUrl} alt={`${producto.marca} ${producto.modelo}`} className="imagen-producto" />
              <button className="wishlist-boton" onClick={() => console.log('Añadir a wishlist')}>
              <img src={heart} alt="wishlist icon" />
              </button> {/* Botón corazón con SVG */}
              </div>
  <h3>{producto.marca} {producto.modelo}</h3>
  <p>Año: {producto.año}</p>
  <p>Precio: ${producto.precio}</p>
  <p>Ubicación: {producto.ubicacion}</p>
</div>
            ))
          ) : (
            <p className='noResultados'>Lo sentimos, no encontramos resultados para tu búsqueda</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResultadosProductos;
