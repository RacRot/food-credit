import styled from 'styled-components';

import BackgroundImage from '../../assets/background_landing.jpg';

const MainSection = styled.section`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  max-width: 100%;
`;

export default MainSection;