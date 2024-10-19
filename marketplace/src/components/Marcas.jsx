import React, { useState, useEffect } from "react";

const Marcas = () => {
  const [cars, setCars] = useState([]); // Estado para almacenar los autos
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

useEffect(() => {
    // Función para obtener los autos del backend
    const fetchCars = async () => {
    try {
        // Realizar la solicitud para obtener todos los autos
        const response = await fetch("http://localhost:8080/api/producto/all");
        const allCars = await response.json();

        // Limitar los autos a los primeros 4
        const limitedCars = allCars.slice(0, 8);

        // Ahora obtenemos las imágenes para cada auto
        const carsWithImages = await Promise.all(
        limitedCars.map(async (car) => {
            // Obtener la imagen de cada auto usando su ID
            const imageResponse = await fetch(`http://localhost:8080/api/producto/all/${car.id}/imagen`);
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob); // Convertir Blob a URL para la imagen

            return { ...car, image: imageUrl }; // Añadimos la URL de la imagen al auto
        })
        );

        setCars(carsWithImages); // Actualizamos el estado con los autos y sus imágenes
        setLoading(false); // Desactivamos el loading
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
    };

    fetchCars();
  }, []); // Ejecutar el efecto solo una vez cuando el componente se monta

  // Mostrar un mensaje de carga mientras obtenemos los datos
if (loading) {
    return <p>Cargando autos...</p>;
}

return (
    <section className="featured-cars">
    <h2></h2>
    <h2>Nuestras marcas</h2>

    <div className="marcas-list">
        

        {cars.length === 0 ? (
        <p>No hay marcas disponibles</p>
        ) : (
          // Usar un Set para filtrar marcas únicas
        [...new Set(cars.map(car => car.marca))].map((marca, index) => (
            <div key={index} className="car-item">
            
            <p>{marca}</p>
            </div>
        ))
        )}
    </div>
    </section>
);  

}

export default Marcas;

