import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../estilos/ResultadosSearchBar.css';

const ResultadosSearchBar = () => {
  const location = useLocation();
  const autos = location.state?.autos || [];

  return (
    <div className="body">
      <div className="resultados-container">
        <NavBar />
        {autos.length > 0 ? ( // Verifica si hay autos antes de mostrar el encabezado
          <>
            <h1>Resultados de la búsqueda</h1> {/* Mueve el encabezado aquí */}
            <ul className="autos-list">
              {autos.map((auto, index) => (
                <li key={index} className="resultado-item">
                  <img
                    src={`http://localhost:8080/api/producto/all/${auto.id}/imagen`}
                    alt={`${auto.marca} ${auto.modelo}`}
                    className="auto-imagen"
                  />
                  <h2>{auto.marca} {auto.modelo}</h2>
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

