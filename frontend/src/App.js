import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './Components/Pages/Home.js'; 
import Login from './Components/Pages/Login'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {}
        <Route path="/app/*" element={<MainApp />} /> {}
      </Routes>
    </Router>
  );
}

export default App;

