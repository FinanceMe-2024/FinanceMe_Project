import React, { useState } from 'react';
import styled from "styled-components";
import bg from '../../img/bg.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Login from './Components/Pages/Login';

function App() {
  const [active, setActive] = useState(1);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;