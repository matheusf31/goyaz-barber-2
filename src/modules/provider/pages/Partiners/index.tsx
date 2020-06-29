import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import Background from '../../../../shared/components/Background';

import PartinerCard from './PartinerCard';

import { Container, Title, PartinerList, AddPartinerButton } from './styles';

export interface IPartiners {
  id: string;
  name: string;
  avatar_url: string;
}

const Partiners: React.FC = () => {
  const [partiners, setPartiners] = useState<IPartiners[]>([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      api.get('providers').then(response => setPartiners(response.data));
    }
  }, [isFocused]);

  return (
    <Background>
      <SafeAreaView>
        <Container contentContainerStyle={{ paddingBottom: 200 }}>
          <Title>Parceiros</Title>

          {partiners.map(partiner => (
            <PartinerCard
              key={partiner.id}
              partiner={partiner}
              onPartinerChange={setPartiners}
            />
          ))}

          <AddPartinerButton onPress={() => navigation.navigate('AddPartiner')}>
            <Icon name="plus-circle" size={36} color="#ff9000" />
          </AddPartinerButton>
        </Container>
      </SafeAreaView>
    </Background>
  );
};

export default Partiners;
