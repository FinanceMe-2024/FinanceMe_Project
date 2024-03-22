import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './Components/Pages/Home.js'; // Importa el componente MainApp

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} /> {/* Ruta principal que renderiza MainApp */}
      </Routes>
    </Router>
  );
}

export default App;

