import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import Background from '../../../../shared/components/Background';

import PartnerCard from './PartnerCard';

import { Container, Title, AddPartnerButton } from './styles';

export interface IPartners {
  id: string;
  name: string;
  avatar_url: string;
}

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<IPartners[]>([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      api.get('providers').then(response => setPartners(response.data));
    }
  }, [isFocused]);

  return (
    <Background>
      <SafeAreaView>
        <Container contentContainerStyle={{ paddingBottom: 200 }}>
          <Title>Parceiros</Title>

          {partners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onPartnerChange={setPartners}
            />
          ))}

          <AddPartnerButton onPress={() => navigation.navigate('AddPartner')}>
            <Icon name="plus-circle" size={36} color="#ff9000" />
          </AddPartnerButton>
        </Container>
      </SafeAreaView>
    </Background>
  );
};

export default Partners;
