import RegisterView from './RegisterView';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LoginView from './Login';
import Welcome from './welcome';  // Asegúrate de que la ruta sea correcta
import '../estilos/Home.css'
import NavBar from '../components/NavBar'
import FeaturedCars from '../components/FeaturedCars';
const Home = () => {
  return (
    <>
      <div>
      <NavBar />
      <section className="hero">
        <h1>Tu nuevo automóvil está aquí</h1>
        <p>
          Descubre los últimos modelos con la mejor tecnología, rendimiento y
          seguridad. Tu próximo vehículo te está esperando.
        </p>
        <button>Descubre nuestros autos</button>
      </section>
      <FeaturedCars />
    </div>
      
      
      <Routes>
        <Route path='/Login' element={<LoginView />} />
        <Route path='/Welcome' element={<Welcome />} />  {/* Ruta para la vista Welcome */}
        <Route path = '/registro' element={<RegisterView/>}/> 
      </Routes>
    </>
  );
};

export default Home;


