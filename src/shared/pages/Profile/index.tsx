import React, { useCallback, useRef } from 'react';
import {
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
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';

import defaultAvatar from '../../assets/defaultavatar.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, UserAvatarButton, UserAvatar, Title } from './styles';

interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { profile, updateUser } = useAuth();

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          phone: Yup.string()
            .required('Telefone obrigatório.')
            .matches(/^(6\d|06\d)(\d{4,5}-?\d{4})$/, 'Telefone inválido.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um email válido.'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.lenght,
            then: Yup.string().required('Campo obrigatório.'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.lenght,
              then: Yup.string().required('Campo obrigatório.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          phone,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          phone,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil!',
          `${err.response.data.message}`,
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolha da galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          // eslint-disable-next-line no-console
          console.log('ImagePicker Error: ', response.error);

          Alert.alert('Erro ao atualizar seu avatar.');

          return;
        }

        const data = new FormData();

        data.append('avatar', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${profile.id}.jpg`,
        });

        api
          .patch('/users/avatar', data)
          .then(apiResponse => {
            updateUser(apiResponse.data);
            Alert.alert('Foto do perfil atualizada com sucesso.');
          })
          .catch(err => {
            Alert.alert('Erro ao atualizar foto de perfil.');
          });
      },
    );
  }, [updateUser, profile.id]);

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              {profile.avatar_url ? (
                <UserAvatar source={{ uri: profile.avatar_url }} />
              ) : (
                <UserAvatar source={defaultAvatar} />
              )}

              <Icon
                name="camera"
                size={26}
                color="#ff9000"
                style={{
                  position: 'absolute',
                  bottom: -15,
                  right: -5,
                }}
              />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={profile} ref={formRef} onSubmit={handleSignUp}>
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
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                containerStyle={{ marginTop: 20 }}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="oneTimeCode"
                returnKeyType="send"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="oneTimeCode"
                returnKeyType="send"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="oneTimeCode"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Atualizar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default Profile;
