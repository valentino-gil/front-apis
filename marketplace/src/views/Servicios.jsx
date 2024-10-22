import React from 'react';
import '../estilos/Servicios.css'
import NavBar from '../components/NavBar'
import { useEffect } from 'react';
import banner from "../assets/bannerNosotros.jpg";


const Servicios = () => {

return (
    <>
    <NavBar />
    <div className="container">
    <div className="image-container">
        <img src='/src/assets/bannerNosotros.jpg' alt="Descripción de la imagen" />
    </div>
    <div className="text-container">
        <h2>Compra tu proximo auto</h2>
        <p>
        Aquí puedes añadir tu texto. Este es un ejemplo de texto que
        complementa la imagen a la izquierda. Asegúrate de reemplazar este
        texto con el contenido que desees mostrar.
        </p>
    </div>
    </div>



    
    </>
);
};

export default Servicios;
