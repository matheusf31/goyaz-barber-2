import React, { useMemo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../shared/services/api';

import Background from '../../../../../shared/components/Background';

import { IProvider } from '../SelectDate';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  Title,
  ServicesContainer,
  ServicesList,
  ServiceContainer,
  ServiceInfoContainer,
  ServiceName,
  ServiceInfoText,
  ServiceInfoPriceContainer,
  ServiceInfoDurationContainer,
  ConfirmContainer,
  ConfirmContainerInfo,
  Avatar,
  ConfirmContainerDetails,
  DetailsContainer,
  DetailsName,
  DetailsText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface IRouteParams {
  provider: IProvider;
  date: string;
}

export interface IServices {
  name: string;
  price: string;
  duration: string;
}

const SelectServiceAndConfirm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { provider, date } = route.params as IRouteParams;

  const [selectedService, setSelectedService] = useState({} as IServices);
  const [showConfirmContainer, setShowConfirmContainer] = useState(false);

  const handleSelectService = useCallback((service: IServices) => {
    setSelectedService(service);
    setShowConfirmContainer(true);
  }, []);

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

  const formattedDate = useMemo(() => {
    return format(parseISO(date), "dd 'de' MMMM',' cccc 'às' kk:mm", {
      locale: pt,
    });
  }, [date]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      await api.post('appointments', {
        provider_id: provider.id,
        date: parseISO(date),
        service: selectedService.name,
      });

      Alert.alert('Agendamento criado com sucesso!');

      navigation.reset({
        routes: [{ name: 'Dashboard' }],
        index: 0,
      });
    } catch (err) {
      Alert.alert('Erro ao marcar!', err.response.data.message);
    }
  }, [provider.id, selectedService, date, navigation]);

  return (
    <Background>
      <Container>
        <Title>Escolha o serviço</Title>

        <ServicesContainer>
          <ServicesList
            numColumns={2}
            data={services}
            keyExtractor={service => service.name}
            renderItem={({ item: service }) => (
              <ServiceContainer
                selected={selectedService === service}
                onPress={() => handleSelectService(service)}
              >
                <ServiceName selected={selectedService === service}>
                  {service.name.charAt(0).toUpperCase() + service.name.slice(1)}
                </ServiceName>

                <ServiceInfoContainer>
                  <ServiceInfoPriceContainer>
                    <ServiceInfoText selected={selectedService === service}>
                      {service.price}
                    </ServiceInfoText>
                  </ServiceInfoPriceContainer>

                  <ServiceInfoDurationContainer>
                    <Icon
                      name="clock"
                      size={12}
                      color={selectedService === service ? '#17181d' : '#fff'}
                    />

                    <ServiceInfoText selected={selectedService === service}>
                      {service.duration}
                    </ServiceInfoText>
                  </ServiceInfoDurationContainer>
                </ServiceInfoContainer>
              </ServiceContainer>
            )}
          />
        </ServicesContainer>

        {showConfirmContainer && (
          <ConfirmContainer>
            <ConfirmContainerInfo>
              {provider.avatar_url ? (
                <Avatar
                  source={{
                    uri: provider.avatar_url,
                  }}
                />
              ) : (
                <Avatar source={defaultAvatar} />
              )}

              <ConfirmContainerDetails>
                <DetailsContainer>
                  <Icon name="user" size={16} color="#ff9000" />
                  <DetailsName>{provider.name}</DetailsName>
                </DetailsContainer>

                <DetailsContainer>
                  <Icon name="scissors" size={16} color="#ff9000" />
                  <DetailsText style={{ fontSize: 16 }}>
                    {selectedService.name.charAt(0).toUpperCase() +
                      selectedService.name.slice(1)}
                  </DetailsText>
                </DetailsContainer>

                <DetailsContainer>
                  <Icon name="clock" size={16} color="#ff9000" />
                  <DetailsText>{formattedDate}</DetailsText>
                </DetailsContainer>
              </ConfirmContainerDetails>
            </ConfirmContainerInfo>

            <DetailsText style={{ marginTop: 5, marginLeft: 20 }}>
              Obs.: o serviço custará {selectedService.price} e durará
              aproximadamente {selectedService.duration}
            </DetailsText>

            <CreateAppointmentButton
              activeOpacity={0.9}
              onPress={handleCreateAppointment}
            >
              <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
            </CreateAppointmentButton>
          </ConfirmContainer>
        )}
      </Container>
    </Background>
  );
};

export default SelectServiceAndConfirm;
