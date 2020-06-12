import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Background>
      <Container>
        <Image source={logoImg} style={{ height: 100, width: '105%' }} />

        <Title>Faça seu logon</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />

        <Input name="password" icon="lock" placeholder="Senha" />

        <Button onPress={() => console.log('deu')}>Entrar</Button>
      </Container>
    </Background>
  );
};

export default SignIn;
