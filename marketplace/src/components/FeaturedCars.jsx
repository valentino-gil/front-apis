import React from "react";

const FeaturedCars = () => {
  const cars = [
    { id: 1, name: "Ford Fiesta 2021", image: "link-to-image" },
    { id: 2, name: "Renault Clio", image: "link-to-image" },
    { id: 3, name: "Citroen DS3", image: "link-to-image" },
    { id: 4, name: "Toyota Hilux", image: "link-to-image" },
  ];

  return (
    <section className="featured-cars">
      <h2>Destacados</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id}>
            <img src={car.image} alt={car.name} />
            <p>{car.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
