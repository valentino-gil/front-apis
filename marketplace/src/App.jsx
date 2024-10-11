import React from 'react';
import RegisterView from './views/RegisterView';  // Importa la vista del formulario
import './App.css';  

function App() {
  return (
    <div className="App">
      <RegisterView /> {/* Llama a la vista del formulario de registro */}
    </div>
  );
}

export default App;

