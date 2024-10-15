import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../estilos/RegistroAutos.css';
import { useNavigate } from 'react-router-dom';

const RegistroAuto = () => {
  const [producto, setProducto] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: '',
    stock: '',
    descripcion: '',
    km: '',
  });
  const [imagen, setImagen] = useState(null);

  const navigate = useNavigate(); // Mover esto dentro del componente
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos
    const formData = new FormData();
    // Enviar los datos del producto como un Blob
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: "application/json" }));
    formData.append('imagen', imagen); // Adjuntar el archivo de imagen

    // Recuperar el token (asumiendo que está almacenado en local storage)
    const token = localStorage.getItem('authToken');

    try {
      // Realizar la llamada a la API sin especificar el Content-Type
      const response = await axios.post('http://localhost:8080/api/producto', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
          // No establecer Content-Type, dejar que el navegador lo maneje
        },
      });

      // Manejar la respuesta según sea necesario
      console.log('Producto registrado:', response.data);

      // Redirigir al home
      navigate('/'); // Aquí se redirige al home
    } catch (error) {
      console.error('Error al registrar el producto:', error.response?.data || error.message);
    }
  };

  return (
    <div className="registro-auto-container">
      <NavBar /> {/* Aquí se incluye el NavBar */}
      <h1 className="titulo">Registrar Nuevo Auto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={producto.marca}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={producto.modelo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Año</label>
          <input
            type="number"
            name="año"
            value={producto.año}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Kilometraje (Km)</label>
          <input
            type="number"
            name="km"
            value={producto.km}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Imagen del Auto (PNG)</label>
          <input
            type="file"
            accept="image/png"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Registrar Auto</button>
      </form>
    </div>
  );
};

export default RegistroAuto;
