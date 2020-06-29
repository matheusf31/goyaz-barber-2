import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { useIsFocused } from '@react-navigation/native';

import api from '../../../../../shared/services/api';

import ClientCard from './ClientCard';
import ConfirmCard from './ConfirmCard';
import Background from '../../../../../shared/components/Background';
import FilterInput from '../../../components/FilterInput';

import {
  Container,
  Title,
  ClientsList,
  ForeignButtonContainer,
  ForeignButtonText,
  ForeignInputContainer,
  ForeignIcon,
  ForeignInput,
  ServicesList,
  ServiceContainer,
  ServiceName,
} from './styles';

interface IRouteParams {
  date: string;
}

export interface IServices {
  name: string;
  price: string;
  duration: string;
}

export interface IClients {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  banned: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IRouteParams;

  const [clients, setClients] = useState<IClients[]>([]);
  const [selectedClient, setSelectedClient] = useState({} as IClients);
  const [foreignClient, setForeignClient] = useState(false);
  const [foreignClientName, setForeignClientName] = useState('');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedService, setSelectedService] = useState({} as IServices);

  // const isFocused = useIsFocused();

  useEffect(() => {
    api.get('users').then(response => setClients(response.data));
  }, []);

  // useEffect(() => {
  //   if (isFocused) {
  //   }
  // }, [isFocused]);

  const services: IServices[] = useMemo(() => {
    return [
      {
        name: 'corte',
        price: 'R$ 25,00',
        duration: '30 min',
      },
      {
        name: 'barba',
        price: 'R$ 18,00',
        duration: '30 min',
      },
      {
        name: 'corte e barba',
        price: 'R$ 35,00',
        duration: '1 hr',
      },
      {
        name: 'hot towel',
        price: 'R$ 25,00',
        duration: '30 min',
      },
      {
        name: 'corte e hot towel',
        price: 'R$ 45,00',
        duration: '1 hr',
      },
    ];
  }, []);

  return (
    <Background>
      <Container>
        {!selectedClient.id && !foreignClient && (
          <>
            <Title>Selecione o cliente</Title>

            <FilterInput
              placeHolderText="Buscar cliente"
              onChangeTextFilter={setTextFilter}
            />

            <ClientsList
              data={clients}
              keyExtractor={client => client.id}
              contentContainerStyle={{ paddingBottom: 300 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: client }) => (
                <ClientCard
                  client={client}
                  textFilter={textFilter}
                  selectedClient={selectedClient}
                  onChangeTextFilter={setTextFilter}
                  onChangeSelectClient={setSelectedClient}
                  onChangeSelectedService={setSelectedService}
                />
              )}
              ListHeaderComponent={() => (
                <ForeignButtonContainer
                  underlayColor="#E38000"
                  onPress={() => setForeignClient(true)}
                >
                  <ForeignButtonText>
                    O cliente não utiliza o app
                  </ForeignButtonText>
                </ForeignButtonContainer>
              )}
            />
          </>
        )}

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 300 }}
        >
          {selectedClient.id && !foreignClient && (
            <>
              <Title>Cliente</Title>

              <ClientCard
                client={selectedClient}
                textFilter={textFilter}
                selectedClient={selectedClient}
                onChangeTextFilter={setTextFilter}
                onChangeSelectClient={setSelectedClient}
                onChangeSelectedService={setSelectedService}
              />
            </>
          )}

          {foreignClient && (
            <>
              <ForeignButtonContainer
                underlayColor="#E38000"
                onPress={() => {
                  setForeignClient(false);
                  setForeignClientName('');
                  setSelectedService({} as IServices);
                }}
                style={{ marginTop: 30 }}
              >
                <ForeignButtonText>O cliente utiliza o app</ForeignButtonText>
              </ForeignButtonContainer>

              <ForeignInputContainer>
                <ForeignIcon name="user" size={20} color="#89828E" />

                <ForeignInput
                  autoCapitalize="words"
                  keyboardAppearance="dark"
                  autoCorrect={false}
                  placeholder="Nome do cliente"
                  onChangeText={text => setForeignClientName(text)}
                  placeholderTextColor="#89828E"
                />
              </ForeignInputContainer>
            </>
          )}

          {(selectedClient.id || foreignClientName !== '') && (
            <>
              <Title>Selecione o serviço</Title>

              <ServicesList
                data={services}
                keyExtractor={service => service.name}
                horizontal
                contentContainerStyle={{
                  paddingRight: 20,
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: service }) => (
                  // <ServiceCard
                  //   service={service}
                  //   selectedService={selectedService}
                  //   onChangeSelectedService={setSelectedService}
                  // />
                  <ServiceContainer
                    selected={selectedService === service}
                    onPress={() => setSelectedService(service)}
                  >
                    <ServiceName selected={selectedService === service}>
                      {service.name}
                    </ServiceName>
                  </ServiceContainer>
                )}
              />

              {selectedService.name && (
                <>
                  <Title style={{ marginTop: 45 }}>Confirmar</Title>

                  <ConfirmCard
                    selectedService={selectedService}
                    client={selectedClient}
                    date={routeParams.date}
                    foreignClientName={foreignClientName}
                  />
                </>
              )}
            </>
          )}
        </ScrollView>
      </Container>
    </Background>
  );
};

export default CreateAppointment;
