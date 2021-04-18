import React, { useEffect } from 'react';

import Navbar from './Navbar.js';
import MainSection from './MainSection.js';
import GlobalStyle from './GlobalStyle.js';

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
