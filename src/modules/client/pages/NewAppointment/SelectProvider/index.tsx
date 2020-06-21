import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Background from '../../../../../shared/components/Background';
import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';
import api from '../../../../../shared/services/api';

import {
  Container,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
} from './styles';

export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}

const SelectProvider: React.FC = () => {
  const navigation = useNavigation();

  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  const navigateToSelectDate = useCallback(
    (providerId: string) => {
      navigation.navigate('SelectDate', { providerId });
    },
    [navigation],
  );

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToSelectDate(provider.id)}
            >
              {provider.avatar_url ? (
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
              ) : (
                <ProviderAvatar source={defaultAvatar} />
              )}

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>
              </ProviderInfo>
            </ProviderContainer>
          )}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </Container>
    </Background>
  );
};

export default SelectProvider;
