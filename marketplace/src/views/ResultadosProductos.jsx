import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../estilos/ResultadosProductos.css';

const ResultadosProductos = () => {
  // Valores iniciales de los filtros
  const filtrosIniciales = {
    añoMax: 2023,
    añoMin: 2005,
    precioMax: 18000000,
    precioMin: 7300000,
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
      setProductos(response.data);
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
      setProductos(response.data);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  const restablecerFiltros = () => {
    // Restablece los filtros a sus valores iniciales
    setFiltros(filtrosIniciales);
    obtenerProductos(); // Vuelve a cargar todos los productos sin filtro
  };

  return (
    <div className="contenedor-resultados">
      <NavBar /> {/* Aquí se incluye el NavBar */}
      <aside className="filtros">
        <h2>Filtrar</h2>
        <div>
          <label>Año</label>
          <input type="number" name="añoMin" value={filtros.añoMin} onChange={handleFiltroChange} />
          <input type="number" name="añoMax" value={filtros.añoMax} onChange={handleFiltroChange} />
        </div>
        <div>
          <label>Precio</label>
          <input type="number" name="precioMin" value={filtros.precioMin} onChange={handleFiltroChange} />
          <input type="number" name="precioMax" value={filtros.precioMax} onChange={handleFiltroChange} />
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
        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button onClick={restablecerFiltros}>Restablecer Filtros</button> {/* Botón para restablecer */}
      </aside>
      <main className="resultados">
        <h2>Resultados</h2>
        <div className="lista-productos">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div key={producto.id} className="producto">
                <h3>{producto.marca} {producto.modelo}</h3>
                <p>Año: {producto.año}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Ubicación: {producto.ubicacion}</p>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </main> 
    </div>
  );
};

export default ResultadosProductos;
