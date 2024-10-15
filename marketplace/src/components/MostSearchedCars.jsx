import React, { useEffect, useState } from "react";
import axios from "axios";
import "../estilos/MostSearchedCars.css";

const MostSearchedCars = () => {
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const fetchMostSearchedCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/producto/all");

        // Obtener modelos únicos
        const uniqueCarModels = Array.from(new Set(response.data.map(car => car.modelo)));

        setCarModels(uniqueCarModels.slice(0, 10));//maximo 10 autos mostrara
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchMostSearchedCars();
  }, []);

  return (
    <section className="most-searched">
      <h2>Autos mas buscados</h2> {/* Título más grande */}
      <div className="car-list">
        {carModels.map((modelo, index) => (
          <div key={index} className="car-item">
            <h3>{modelo}</h3> {/* Solo se muestra el nombre del modelo */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostSearchedCars;
