import styled from 'styled-components';
import React from 'react';

const Bar = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 3em;
  background: #3c3c3c;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const RegisterBtn = styled.button`
  background: aqua;
  border-radius: 5px;
  font-size: 16px;
  padding: 0.5em;
  margin-left: auto;
  margin-right: 10px;
  order: 2;
`;

const FoodCreditLabel = styled.div`  
  font: italic small-caps bold 24px Georgia;
  color: yellow;
  margin-left: 45%;
  text-align: center;
`;

const Navbar = () => {
  return (
    <Bar>
      <FoodCreditLabel>Food Credit</FoodCreditLabel>
      <RegisterBtn>Register</RegisterBtn>
    </Bar>
  )
};

export default Navbar;