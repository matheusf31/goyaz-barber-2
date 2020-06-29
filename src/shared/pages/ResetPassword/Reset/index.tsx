import React, { useRef, useCallback } from 'react';
import { ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../../components/Input';

import Background from '../../../components/Background';

import api from '../../../services/api';

import { BackButton, Container, Title, SubmitButton } from './styles';

const ResetPassword: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async data => {
      const { token, newPassword, confirmPassword } = data;

      try {
        await api.post('password/reset', {
          token,
          password: newPassword,
          password_confirmation: confirmPassword,
        });

        Alert.alert('Senha alterada com sucesso!', 'Por favor, faça login.');
        navigation.navigate('SignIn');
      } catch (err) {
        formRef.current?.setFieldValue('newPassword', '');
        formRef.current?.setFieldValue('confirmPassword', '');

        Alert.alert('Erro!', err.response.data.message);
      }
    },
    [navigation],
  );

  return (
    <Background>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </BackButton>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Recuperação de senha</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="token"
              icon="mail"
              placeholder="Token"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordRef.current?.focus();
              }}
            />

            <Input
              name="newPassword"
              icon="lock"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Sua nova senha"
              textContentType="newPassword"
              ref={newPasswordRef}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />

            <Input
              name="confirmPassword"
              icon="lock"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
              placeholder="Confirmação de senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <SubmitButton
              onPress={() => {
                if (formRef.current) {
                  formRef.current.submitForm();
                }
              }}
            >
              Criar nova senha
            </SubmitButton>
          </Form>
        </Container>
      </ScrollView>
    </Background>
  );
};

export default ResetPassword;
