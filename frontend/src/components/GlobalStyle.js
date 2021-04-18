import { createGlobalStyle } from 'styled-components';

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

export default GlobalStyle;