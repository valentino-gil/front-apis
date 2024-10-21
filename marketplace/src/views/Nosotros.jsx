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
    <h1>Sobre Nosotros</h1>

    <p>Transformamos la manera en que las personas<br />compran y venden autos</p>
    </section>

    <section className="historia">

    <p>Nuestra plataforma nació con la visión de simplificar el proceso de compra y venta de autos, conectando a compradores y vendedores de manera eficiente
    <br />Hoy, gracias a nuestra pasión por la innovación y el compromiso con la transparencia, ofrecemos una experiencia segura, confiable y accesible para todos</p>
    </section>
    <section className="oficinas">

    <h1>Nuestras oficinas</h1>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4904805596784!2d-58.38449352488405!3d-34.61704355820094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaba6ac89b35%3A0x1a2dc24cbca665a7!2sUADE!5e0!3m2!1ses!2sar!4v1729546249161!5m2!1ses!2sar" 
    
    width="400" height="300" >

    </iframe>
    </section>



    
    </>
);
};

export default Nosotros;


