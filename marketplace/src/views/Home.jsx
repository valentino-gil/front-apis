import React from 'react';
import RegisterView from './RegisterView';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LoginView from './Login';
import Welcome from './welcome';
import '../estilos/Home.css';
import NavBar from '../components/NavBar';
import FeaturedCars from '../components/FeaturedCars';
import TopSellers from '../components/TopSellers'; 

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
        <FeaturedCars />
        <TopSellers /> 
      </div>

    </>
  );
};

export default Home;



