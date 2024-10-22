import React from 'react';
import '../estilos/Servicios.css'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import banner from "../assets/bannerNosotros.jpg";


const Servicios = () => {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/registro'); // Redirige a la vista RegisterView
    };

return (
    <>
    <NavBar />
    <div className="container-1">
        <div className="image-container">
            <img src='/src/assets/bannerNosotros.jpg' alt="Descripción de la imagen" />
        </div>
        <div className="text-container">
            <h2>Compra tu proximo auto</h2>
            <p>
            En nuestra plataforma, encontrarás la mejor selección de vehículos para cada necesidad y presupuesto. 
            Desde autos económicos hasta modelos de lujo, te ofrecemos una experiencia de compra sencilla y segura, 
            con servicios adicionales para facilitar tu adquisición. Ya sea que busques un auto nuevo o usado, 
            nosotros te ayudamos a encontrar el vehículo ideal para tu estilo de vida.
            </p>
        </div>
    </div>
    <div className="container-2">
        <div className="text-container">
            <h2>Vende tu auto de manera fácil y rápida</h2>
            <p>
            Publica tu vehículo en nuestra plataforma y llega a miles de compradores potenciales. Te ofrecemos 
            una herramienta sencilla para gestionar tus anuncios y destacar tus vehículos. Con nuestras opciones de promoción, 
            podrás aumentar la visibilidad de tus publicaciones y concretar ventas en menos tiempo. Únete a nosotros y convierte 
            tu auto en una venta exitosa.
            </p>
        </div>
        <div className="image-container">
            <img src='/src/assets/autosventa.jpg' alt="Descripción de la imagen" />
        </div>
    </div>
    <div className="container-3">
        <div className="text-container">
            <h2>¡Únete a la comunidad y encuentra tu auto ideal!</h2>
            <p>
            Regístrate ahora y disfruta de todos los beneficios que nuestra plataforma ofrece. 
            Obtén acceso exclusivo a las mejores ofertas, personaliza tus búsquedas para recibir alertas de los autos que te interesan, 
            y mantente al tanto de las últimas novedades del mercado automotriz. 
            Ya seas comprador o vendedor, estamos aquí para facilitarte la mejor experiencia en la compra y venta de vehículos. 
            ¡No esperes más, crea tu cuenta hoy y da el primer paso hacia tu próximo auto!
            </p>
            <button class="checkout-button" onClick={handleRegisterRedirect}>Registrarse</button>
        </div>
    </div>
    </>
);
};

export default Servicios;
