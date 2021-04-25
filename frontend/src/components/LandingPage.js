import React from 'react';
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

const LoginForm = styled.form`
  background-color: rgb(255, 0, 0, 0.4);
  width: 55vh;
  height: 55vh;
  border: solid 1 px blue;
  border-radius: 180px;
  margin-left: 5.75%;
  top: 5%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LandingPage = () => {
  return (
    <MainSection>
      <LoginForm />
    </MainSection>
  );
};

export default LandingPage;