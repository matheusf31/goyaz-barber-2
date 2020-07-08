import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

interface ISignUpFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          phone: Yup.string()
            .required('Telefone obrigatório')
            .matches(/^(6\d|06\d)(\d{4,5}-?\d{4})$/, 'Telefone inválido'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, phone, password } = data;

        await api.post('/users', {
          name,
          email,
          phone,
          password,
          provider: false,
        });

        Alert.alert('Cadastro realizado com sucesso!', 'Faça seu login.');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro na autenticação!', `${err.response.data.message}`);
      }
    },
    [navigation],
  );

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, paddingBottom: 30 }}
        >
          <Container>
            <Image source={logoImg} style={{ height: 100, width: '105%' }} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => phoneInputRef.current?.focus()}
              />

              <Input
                ref={phoneInputRef}
                keyboardType="phone-pad"
                name="phone"
                icon="phone"
                placeholder="Celular"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="oneTimeCode"
                blurOnSubmit={false}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>

            <BackToSignInButton onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#ff9000" />
              <BackToSignInText>Login</BackToSignInText>
            </BackToSignInButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default SignUp;
