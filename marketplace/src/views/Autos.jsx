import React from 'react';
import '../estilos/Autos.css'
import NavBar from '../components/NavBar'
import Marcas from '../components/Marcas';
import Vehiculos from '../components/Vehiculos';
import { useEffect } from 'react';


const Autos = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Forzar el scroll a la parte superior al cargar el componente
  }, []);
  return (
    <>
      <NavBar />
      <div className="autos-container">
      


        <section class="flex-container">
        <div className="Vehiculos">
          <Vehiculos />
        </div>
        <div className="Marcas">
          <Marcas />
        </div>
        </section>
      </div>
    </>
  );
};

export default Autos;



