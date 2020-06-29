import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../shared/services/api';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  PartinerCardContainer,
  PartinerAvatar,
  PartinerNameContainer,
  PartinerName,
  DeletePartinerContainer,
  DeletePartinerTextContainer,
  DeletePartinerText,
  DeletePartinerButtonsContainer,
} from './styles';

import { IPartiners } from '../index';

interface IPartinerCardProps {
  partiner: IPartiners;
  onPartinerChange: React.Dispatch<React.SetStateAction<IPartiners[]>>;
}

const PartinerCard: React.FC<IPartinerCardProps> = ({
  partiner,
  onPartinerChange,
}) => {
  const [confirm, setConfirm] = useState(false);

  const navigation = useNavigation();

  const handleDeletePartiner = useCallback(async () => {
    try {
      await api.delete(`providers/${partiner.id}`);

      onPartinerChange(prevState =>
        prevState.filter(partinerElem => partinerElem.id !== partiner.id),
      );
    } catch (err) {
      Alert.alert('Ocorreu um erro.', err.response.data.message);
    }
  }, [partiner.id, onPartinerChange]);

  return (
    <Container>
      {!confirm && (
        <PartinerCardContainer>
          {partiner.avatar_url ? (
            <PartinerAvatar source={{ uri: partiner.avatar_url }} />
          ) : (
            <PartinerAvatar source={defaultAvatar} />
          )}

          <PartinerNameContainer
            onPress={() =>
              navigation.navigate('PartinersInfo', {
                provider_id: partiner.id,
              })
            }
          >
            <PartinerName>{partiner.name}</PartinerName>
          </PartinerNameContainer>

          <TouchableOpacity onPress={() => setConfirm(true)}>
            <Icon name="x" size={28} color="#bc3939" />
          </TouchableOpacity>
        </PartinerCardContainer>
      )}

      {confirm && (
        <DeletePartinerContainer>
          <DeletePartinerTextContainer>
            <DeletePartinerText>
              Deseja mesmo excluir o {partiner.name} do app?
            </DeletePartinerText>
          </DeletePartinerTextContainer>

          <DeletePartinerButtonsContainer>
            <TouchableOpacity
              onPress={() => setConfirm(false)}
              style={{ marginRight: 5 }}
            >
              <Icon name="x" size={28} color="#bc3939" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeletePartiner}
              style={{ marginLeft: 5 }}
            >
              <Icon name="check" size={28} color="#3bbc39" />
            </TouchableOpacity>
          </DeletePartinerButtonsContainer>
        </DeletePartinerContainer>
      )}
    </Container>
  );
};

export default PartinerCard;
