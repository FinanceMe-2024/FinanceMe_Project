import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './Components/Pages/Home.js'; // Importa el componente MainApp
import Login from './Components/Pages/Login'; // Importa el componente Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta para el Login */}
        <Route path="/app/*" element={<MainApp />} /> {/* Ruta para el MainApp */}
      </Routes>
    </Router>
  );
}

export default App;

