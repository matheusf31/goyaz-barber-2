import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../shared/services/api';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  PartnerCardContainer,
  PartnerAvatar,
  PartnerNameContainer,
  PartnerName,
  DeletePartnerContainer,
  DeletePartnerTextContainer,
  DeletePartnerText,
  DeletePartnerButtonsContainer,
} from './styles';

import { IPartners } from '../index';

interface IPartnerCardProps {
  partner: IPartners;
  onPartnerChange: React.Dispatch<React.SetStateAction<IPartners[]>>;
}

const PartnerCard: React.FC<IPartnerCardProps> = ({
  partner,
  onPartnerChange,
}) => {
  const [confirm, setConfirm] = useState(false);

  const navigation = useNavigation();

  const handleDeletePartner = useCallback(async () => {
    try {
      await api.delete(`providers/${partner.id}`);

      onPartnerChange(prevState =>
        prevState.filter(partnerElem => partnerElem.id !== partner.id),
      );
    } catch (err) {
      Alert.alert('Ocorreu um erro.', err.response.data.message);
    }
  }, [partner.id, onPartnerChange]);

  return (
    <Container>
      {!confirm && (
        <PartnerCardContainer>
          {partner.avatar_url ? (
            <PartnerAvatar source={{ uri: partner.avatar_url }} />
          ) : (
            <PartnerAvatar source={defaultAvatar} />
          )}

          <PartnerNameContainer
            onPress={() =>
              navigation.navigate('PartnersInfo', {
                provider_id: partner.id,
              })
            }
          >
            <PartnerName>{partner.name}</PartnerName>
          </PartnerNameContainer>

          <TouchableOpacity onPress={() => setConfirm(true)}>
            <Icon name="x" size={28} color="#bc3939" />
          </TouchableOpacity>
        </PartnerCardContainer>
      )}

      {confirm && (
        <DeletePartnerContainer>
          <DeletePartnerTextContainer>
            <DeletePartnerText>
              Deseja mesmo excluir o {partner.name} do app?
            </DeletePartnerText>
          </DeletePartnerTextContainer>

          <DeletePartnerButtonsContainer>
            <TouchableOpacity
              onPress={() => setConfirm(false)}
              style={{ marginRight: 5 }}
            >
              <Icon name="x" size={28} color="#bc3939" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeletePartner}
              style={{ marginLeft: 5 }}
            >
              <Icon name="check" size={28} color="#3bbc39" />
            </TouchableOpacity>
          </DeletePartnerButtonsContainer>
        </DeletePartnerContainer>
      )}
    </Container>
  );
};

export default PartnerCard;
