import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Navbar from './Navbar';
import BackgroundImage from '../assets/background_landing.jpg';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    height: 100%;
    width: 100%;
  }
`;

const MainSection = styled.section`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  max-width: 100%;
`;

const App = () => {
  useEffect(() => {
    // NOTE: Test connection with api
    fetch('http://localhost:5001/health')
      .then(response => response.json())
      .then(data => console.log('The Server said: ', data));
  });
  return(
    <>
      <GlobalStyle />
      <Navbar />
      <MainSection />
    </>
  );
};

export default App;
