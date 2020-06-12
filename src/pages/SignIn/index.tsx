import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';

import Background from '../../components/Background';

const SignIn: React.FC = () => {
  return (
    <Background>
      <Container>
        <Image source={logoImg} />

        <Title>Faça seu logon</Title>
      </Container>
    </Background>
  );
};

export default SignIn;
