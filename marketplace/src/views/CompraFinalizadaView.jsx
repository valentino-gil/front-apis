import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../estilos/Carrito.css';

const CompraFinalizadaView = () => {
    const navigate = useNavigate();

    const volverInicio = () => {
        navigate("/");
    }
    return (
        <div>
            <NavBar />
            <div className="cart-container">
                <div className="cart-content">
                    <h2>Compra finalizada con exito!!</h2>
                    <button onClick={() => volverInicio} className="checkout-button">Volver a Inicio</button>
                </div>
            </div>
        </div>
    );
};

export default CompraFinalizadaView;
