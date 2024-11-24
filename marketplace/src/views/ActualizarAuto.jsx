import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../estilos/RegistroAutos.css';
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarAuto = () => {
  const { id } = useParams(); // ID del auto a actualizar
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
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

  // Obtener los datos del auto al montar el componente
  useEffect(() => {
    const fetchAutoData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:8080/api/producto/all/${id}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProducto(response.data); // Precarga los datos del auto
      } catch (error) {
        console.error('Error al obtener los datos del auto:', error);
        setMensajeError('No se pudieron cargar los datos del auto.');
      }
    };

    fetchAutoData();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en la imagen
  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    const token = localStorage.getItem('authToken');

    try {
      // Actualizar los datos del producto
      await axios({
        method: 'put',
        url: `http://localhost:8080/api/producto/${id}`,
        data: producto, // Datos del formulario
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Subir la imagen si fue modificada
      if (imagen) {
        const formData = new FormData();
        formData.append('imagen', imagen);

        await axios({
          method: 'post', // Endpoint para imagen
          url: `http://localhost:8080/api/producto/${id}/imagen`,
          data: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setMensajeExito('¡Has actualizado los datos de tu publicación correctamente!');
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setMensajeError(
        error.response?.data?.message ||
        'Error al actualizar el producto. Por favor, intenta nuevamente.'
      );
    }
  };

  return (
    <div className="registro-auto-container">
      <NavBar />
      <h1 className="titulo">Actualizar Auto</h1>
      
      {mensajeError && <p className="mensaje-error" style={{ color: 'red' }}>{mensajeError}</p>}
      {mensajeExito && <p className="mensaje-exito" style={{ color: 'green' }}>{mensajeExito}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={producto.marca}
            onChange={handleChange}
            placeholder="Marca actual"
          />
        </div>

        <div>
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={producto.modelo}
            onChange={handleChange}
            placeholder="Modelo actual"
          />
        </div>

        <div>
          <label>Año</label>
          <input
            type="number"
            name="año"
            value={producto.año}
            onChange={handleChange}
            placeholder="Año actual"
          />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio actual"
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            placeholder="Stock actual"
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Descripción actual"
          />
        </div>

        <div>
          <label>Kilometraje (Km)</label>
          <input
            type="number"
            name="km"
            value={producto.km}
            onChange={handleChange}
            placeholder="Kilometraje actual"
          />
        </div>

        <div>
          <label>Imagen del Auto (PNG)</label>
          <input 
            type="file" 
            accept="image/png"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Actualizar Auto</button>
      </form>
    </div>
  );
};

export default ActualizarAuto;
