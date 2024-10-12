import {Link} from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'
import RegisterView from './RegisterView';
const Home = () => {
    return (
        <>
      <ul>
        <li>
            <Link to = '/registro'>Registro</Link>
        </li>
      </ul>
      <Routes>
        <Route path = '/registro' element={<RegisterView/>}/> 
      </Routes>
      </>
    );
  };
  
  export default Home;