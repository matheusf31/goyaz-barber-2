import React, { useRef, useState, useCallback } from 'react';
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../../shared/services/api';

import {
  ModalViewBox,
  ModalHeader,
  ModalText,
  ModalForm,
  ModalInputContainer,
  ModalInput,
  ModalButton,
  ModalButtonText,
} from './styles';

import { IAppointment } from '../../index';

interface IAddAdditionalModalProps {
  appointment_id: string;
  modalVisible: boolean;
  onModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  onAppointmentUpdate: React.Dispatch<React.SetStateAction<IAppointment>>;
}

const AddAdditionalModal: React.FC<IAddAdditionalModalProps> = ({
  appointment_id,
  modalVisible,
  onModalChange,
  onAppointmentUpdate,
}) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const valueRef = useRef<TextInput>(null);
  const quantityRef = useRef<TextInput>(null);

  const handleModalSubmit = useCallback(async () => {
    try {
      const response = await api.put<IAppointment>('appointments/additional', {
        appointment_id,
        additional: {
          description,
          value,
          quantity,
        },
      });

      onModalChange(false);

      onAppointmentUpdate(response.data);
    } catch (err) {
      Alert.alert(err.response.data.message);
    }
  }, [
    appointment_id,
    description,
    value,
    quantity,
    onModalChange,
    onAppointmentUpdate,
  ]);

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => onModalChange(false)}
      backdropTransitionOutTiming={0}
      avoidKeyboard={false}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ModalViewBox>
          <ModalHeader>
            <ModalText>Criar novo adicional</ModalText>
          </ModalHeader>

          <ModalForm>
            <ModalInputContainer>
              <Icon name="edit" size={18} color="#000" />

              <ModalInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Descrição"
                placeholderTextColor="#999"
                onChangeText={text => setDescription(text)}
                returnKeyType="next"
                onSubmitEditing={() => valueRef.current?.focus()}
              />
            </ModalInputContainer>

            <ModalInputContainer>
              <Icon name="dollar-sign" size={18} color="#000" />

              <ModalInput
                ref={valueRef}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Valor"
                placeholderTextColor="#999"
                keyboardType="numbers-and-punctuation"
                onChangeText={text => setValue(Number(text))}
                returnKeyType="next"
                onSubmitEditing={() => quantityRef.current?.focus()}
              />
            </ModalInputContainer>

            <ModalInputContainer>
              <Icon name="package" size={18} color="#000" />

              <ModalInput
                ref={quantityRef}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Quantidade"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={text => setQuantity(Number(text))}
                returnKeyType="send"
                onSubmitEditing={handleModalSubmit}
              />
            </ModalInputContainer>
          </ModalForm>

          <ModalButton onPress={handleModalSubmit}>
            <ModalButtonText>Adicionar</ModalButtonText>
          </ModalButton>
        </ModalViewBox>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddAdditionalModal;
