// src/components/TopSellers.js
import React from 'react';


const TopSellers = () => {
  const sellers = [
    {
      name: 'Laura',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      review: 'Excelente servicio y atención, me ayudaron a encontrar el auto perfecto.',
      rating: 4.5,
    },
    {
      name: 'Edmundo',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      review: 'El financiamiento fue muy sencillo, y estoy muy feliz con mi nuevo coche.',
      rating: 5,
    },
    {
      name: 'María',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      review: 'La mejor experiencia de compra de autos que he tenido.',
      rating: 4.5,
    },
  ];

  return (
    <section className="top-sellers">
      <h2>Top vendedores</h2>
      <p>En base a opinión y calificación de los usuarios</p>
      <div className="sellers-container">
        {sellers.map((seller, index) => (
          <div key={index} className="seller-card">
            <img src={seller.image} alt={seller.name} className="seller-image" />
            <div className="seller-rating">
              {'★'.repeat(Math.floor(seller.rating))}
              {seller.rating % 1 !== 0 && '½'}
            </div>
            <p className="seller-review">"{seller.review}"</p>
            <p className="seller-name">{seller.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellers;
