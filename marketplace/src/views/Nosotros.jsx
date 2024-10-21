import React from 'react';
import '../estilos/Nosotros.css'
import NavBar from '../components/NavBar'
import { useEffect } from 'react';
import banner from "../assets/bannerNosotros.jpg";


const Nosotros = () => {

return (
    <>
    <NavBar />

    <section className="presentacion">
    <div className="body">
    <h1>Sobre Nosotros</h1>

    <p>El mejor auto al mejor precio<br />de la forma más simple</p>
    </div>
    </section>

    </>
);
};

export default Nosotros;


