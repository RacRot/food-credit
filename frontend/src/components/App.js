import React, { useEffect } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;


const App = () => {
  useEffect(() => {
    // NOTE: Test connection with api
    fetch('http://localhost:5001/health')
      .then(response => response.json())
      .then(data => console.log('The Server said: ', data));
  })
  return(
    <Wrapper>
      <Title> Hello, World! </Title>
    </Wrapper>
  );
};

export default App;
