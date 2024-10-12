import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LoginView from './Login';
import Welcome from './welcome';  // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <>
      <ul>
        <li>
          <Link to='/Login'>Login</Link>
        </li>
        <li>
          <Link to='/Welcome'>Welcome</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/Login' element={<LoginView />} />
        <Route path='/Welcome' element={<Welcome />} />  {/* Ruta para la vista Welcome */}
      </Routes>
    </>
  );
};

export default Home;
