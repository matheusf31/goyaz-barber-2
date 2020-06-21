import React, { useState, useEffect, useCallback } from 'react';

import { useIsFocused } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import Background from '../../../../shared/components/Background';
import ClientCard from './ClientCard';
import FilterInput from '../../components/FilterInput';

import { Container, ClientsList, Title } from './styles';

export interface IClients {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  banned: boolean;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClients[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');

  const isFocused = useIsFocused();

  const loadClients = useCallback(() => {
    api.get('users').then(response => setClients(response.data));
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadClients();
    }
  }, [isFocused, loadClients]);

  return (
    <Background>
      <Container>
        <Title>Clientes</Title>

        <FilterInput
          placeHolderText="Digite o nome do cliente"
          onChangeTextFilter={setTextFilter}
        />

        <ClientsList
          data={clients}
          keyExtractor={client => client.id}
          renderItem={({ item: client }) => (
            <ClientCard
              client={client}
              textFilter={textFilter}
              reloadClients={loadClients}
            />
          )}
          contentContainerStyle={{ paddingBottom: 300 }}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </Background>
  );
};

export default Clients;
