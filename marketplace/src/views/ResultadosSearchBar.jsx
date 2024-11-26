import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../estilos/ResultadosSearchBar.css";

const ResultadosSearchBar = () => {
  const location = useLocation();
  const autos = location.state?.productos || [];
  const navigate = useNavigate();

  // Función para manejar el clic en un auto
  const handleCarClick = (id) => {
    navigate(`/car/${id}`); // Redirige a la página de detalles del auto con el ID en la URL
  };

  return (
    <div className="body">
      <div className="resultados-container">
        <NavBar />
        {autos.length > 0 ? (
          <>
            <h1>Resultados de la búsqueda</h1>
            <ul className="autos-list">
              {autos.map((auto, index) => (
                <li
                  key={index}
                  className="resultado-item"
                  onClick={() => handleCarClick(auto.id)} // Redirigir al hacer clic
                  style={{ cursor: "pointer" }} // Cambiar el cursor al estilo puntero
                >
                  <img
                    src={`http://localhost:8080/api/producto/all/${auto.id}/imagen`}
                    alt={`${auto.marca} ${auto.modelo}`}
                    className="auto-imagen"
                  />
                  <h2>
                    {auto.marca} {auto.modelo}
                  </h2>
                  <p className="detalles">Año: {auto.año}</p>
                  <p className="detalles">Km: {auto.km}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="no-autos">No se encontraron autos.</p>
        )}
      </div>
    </div>
  );
};

export default ResultadosSearchBar;
