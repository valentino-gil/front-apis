import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import RegisterView from './RegisterView';
import LoginView from './Login';
import Welcome from './welcome';
import '../estilos/Home.css';
import NavBar from '../components/NavBar';
import FeaturedCars from '../components/FeaturedCars'; // Esto sigue mostrando lo más novedoso
import TopSellers from '../components/TopSellers'; // Mostrando los autos más vendidos
import MostSearchedCars from '../components/MostSearchedCars'; // Nueva sección para los autos más buscados

const Home = () => {
  return (
    <>
      <div className='body'>
        <NavBar />
        <section className="presentacion">
          <div className="contenido">
            <h1>Tu nuevo automóvil está aquí</h1>
            <p>Descubre los últimos modelos con la mejor tecnología, rendimiento y seguridad. Tu próximo vehículo te está esperando.</p>
            <button>Descubre nuestros autos</button>
          </div>
        </section>
        <FeaturedCars />  {/* Autos más novedosos */}
        <TopSellers />    {/* Autos más vendidos */}
        <MostSearchedCars /> {/* Nueva sección: Autos más buscados */}
      </div>
    </>
  );
};

export default Home;
