import React from 'react';
import './App.css';
import GetLeagues from './GetLeagues';
import styled from 'styled-components';

const Wrapper = styled.main `
  background: linear-gradient(135deg, #eee 70%,#999);
  overflow-y: scroll;
`;

function App() {
  return (
    <Wrapper>
      <GetLeagues />
    </Wrapper>
  );
}

export default App;
