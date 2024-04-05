import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from "styled-components";
import bg from '../../img/bg.png';
import { MainLayout } from '../../styles/Layouts';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Pages/Login';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';
import { useAuthContext } from '../../hooks/useAuthContext'; 

function MainApp() {
  const [active, setActive] = useState(1);
  const { user } = useAuthContext(); 

  const displayData = () => {
    if (!user) { 
      return <Navigate to="/" />; 
    }

      switch(active) {
          case 1:
              return <Dashboard />;
          case 2:
              return <Income />;
          case 3:
              return <Login />;
          case 4:
              return <Expenses />
          default: 
              return <Dashboard />;
      }
  }

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()} {}
        </main>
      </MainLayout>
    </AppStyled>
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

export default MainApp;
