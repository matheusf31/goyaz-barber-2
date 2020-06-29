import React, { useRef, useCallback, useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';

import Background from '../../../components/Background';

import Input from '../../../components/Input';

import api from '../../../services/api';

import {
  BackButton,
  Container,
  Title,
  SubmitButton,
  ResetButton,
  ResetText,
} from './styles';

const SendToken: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async data => {
    setLoading(true);

    const { email } = data;

    try {
      await api.post('password/forgot', {
        email,
      });

      Alert.alert('Token enviado com sucesso!', 'Confira seu email.');
    } catch (err) {
      Alert.alert('Erro!', err.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Background>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </BackButton>

      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Enviar token</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <SubmitButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Enviar
            </SubmitButton>
          </Form>

          <ResetButton onPress={() => navigation.navigate('Reset')}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ResetText>Já recebi o token</ResetText>
            )}
          </ResetButton>
        </Container>
      </ScrollView>
    </Background>
  );
};

export default SendToken;
