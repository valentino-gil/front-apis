import React, { useState, useEffect, useCallback } from 'react';
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
    precioMax: 100000,
    precioMin: 0,
    marca: "",
    modelo: "",
  };

  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]); // Estado para productos originales
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [categorias, setCategorias] = useState({
    marcas: [],
    modelos: [],
  });
  const [favoritos, setFavoritos] = useState([]); // Lista de favoritos

  const obtenerProductos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all');
      const productosConImagen = response.data.map(producto => ({
        ...producto,
        imagenUrl: `http://localhost:8080/api/producto/all/${producto.id}/imagen`,
      }));
      setProductos(productosConImagen);
      setProductosOriginales(productosConImagen); // Guardamos los productos originales
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, []);

  const obtenerCategorias = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/all');
      const productos = response.data;
      const marcas = [...new Set(productos.map(p => p.marca))];
      const modelos = [...new Set(productos.map(p => p.modelo))];
      setCategorias({ marcas, modelos });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  }, []);

  const cargarFavoritos = useCallback(async () => {
    const token = localStorage.getItem('authToken');
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
  }, []);

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
    cargarFavoritos();

    // Listener para evento de producto actualizado
    const handleProductoActualizado = () => {
      obtenerProductos();
      obtenerCategorias();
    };

    window.addEventListener('producto-actualizado', handleProductoActualizado);

    // Limpiar el listener
    return () => {
      window.removeEventListener('producto-actualizado', handleProductoActualizado);
    };
  }, [obtenerProductos, obtenerCategorias, cargarFavoritos]);

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

      // Disparar evento de producto actualizado
      window.dispatchEvent(new Event('producto-actualizado'));
    } catch (error) {
      console.error('Error al actualizar favoritos:', error.response?.data || error.message);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value, // Guardamos el valor como string
    });
  };

  const aplicarFiltros = () => {
    // Filtrar productos según los filtros aplicados
    const productosFiltrados = productosOriginales.filter(producto =>
      producto.año >= filtros.añoMin &&
      producto.año <= filtros.añoMax &&
      producto.precio >= filtros.precioMin &&
      producto.precio <= filtros.precioMax &&
      (filtros.marca === "" || producto.marca === filtros.marca) &&
      (filtros.modelo === "" || producto.modelo === filtros.modelo)
    );
    setProductos(productosFiltrados);
  };

  const restablecerFiltros = () => {
    setFiltros(filtrosIniciales);
    setProductos(productosOriginales); // Restaura los datos originales
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
            max="100000"
            step="1000"
            value={filtros.precioMin}
            onChange={handleFiltroChange}
          />
          <input
            type="range"
            name="precioMax"
            min="0"
            max="100000"
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
