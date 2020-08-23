import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { setHours, isBefore, parseISO, isAfter, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../../../../shared/services/api';
import { socket } from '../../../../../shared/services/socket';

import Background from '../../../../../shared/components/Background';
import Calendar from '../../../../../shared/components/Calendar';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Schedule,
  ScheduleTitle,
  Section,
  SectionTitle,
  SectionContent,
  HourContainer,
  HourText,
} from './styles';

interface IRouteParams {
  providerId: string;
}

export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}

interface IAvailableHoursItem {
  time: string;
  timeFormatted: string;
  available: boolean;
}

const SelectDate: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IRouteParams;
  const navigation = useNavigation();

  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const [selectedDay, setSelectedDay] = useState(() => new Date());
  const [selectedHour, setSelectedHour] = useState('');
  const [availableHours, setAvailableHours] = useState<IAvailableHoursItem[]>(
    [],
  );
  const [scheduleUpdate, setScheduleUpdate] = useState(false);

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  const loadSchedule = useCallback(async () => {
    let mounted = true;

    if (mounted) {
      const response = await api.get(
        `providers/day-availability/${selectedProvider}`,
        {
          params: {
            year: selectedDay.getFullYear(),
            month: selectedDay.getMonth() + 1,
            day: selectedDay.getDate(),
          },
        },
      );

      setAvailableHours(response.data);
    }

    return () => {
      mounted = false;
    };
  }, [selectedDay, selectedProvider, scheduleUpdate]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  useEffect(() => {
    socket.on('scheduling-update', (_: unknown) => {
      setScheduleUpdate(oldScheduleUpdate => !oldScheduleUpdate);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleSelectHour = useCallback(
    (timeFormatted: string) => {
      setSelectedHour(timeFormatted);

      const providerInfo = providers.filter(
        provider => provider.id === selectedProvider,
      )[0];

      navigation.navigate('SelectServiceAndConfirm', {
        provider: providerInfo,
        date: timeFormatted,
      });
    },
    [navigation, selectedProvider, providers],
  );

  const compareDate = useMemo(() => {
    return setHours(selectedDay, 12);
  }, [selectedDay]);

  const morningAvailability = useMemo(() => {
    return availableHours.filter(
      ({ timeFormatted, available }) =>
        isBefore(parseISO(timeFormatted), compareDate) && available,
    );
  }, [availableHours, compareDate]);

  const afternoonAvailability = useMemo(() => {
    return availableHours.filter(
      ({ timeFormatted, available }) =>
        isAfter(parseISO(timeFormatted), compareDate) && available,
    );
  }, [availableHours, compareDate]);

  const dateFormatted = useMemo(
    () => format(selectedDay, "dd 'de' MMMM',' cccc", { locale: pt }),
    [selectedDay],
  );

  return (
    <Background>
      <Container contentContainerStyle={{ paddingBottom: 150 }}>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                {provider.avatar_url ? (
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />
                ) : (
                  <ProviderAvatar source={defaultAvatar} />
                )}

                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <ScheduleTitle>Escolha o Dia</ScheduleTitle>

        <Calendar
          date={selectedDay}
          onChangeDate={setSelectedDay}
          dateFormatted={dateFormatted}
        />

        {morningAvailability.length === 0 &&
        afternoonAvailability.length === 0 ? (
          <ScheduleTitle style={{ marginTop: 10, marginBottom: 50 }}>
            Nenhum horário disponível
          </ScheduleTitle>
        ) : (
          <Schedule>
            <ScheduleTitle>Escolha o Horário</ScheduleTitle>

            <Section show={morningAvailability.length > 0}>
              <SectionTitle>Manhã</SectionTitle>

              <SectionContent>
                {morningAvailability.map(({ time, timeFormatted }) => (
                  <HourContainer
                    selected={selectedHour === timeFormatted}
                    onPress={() => handleSelectHour(timeFormatted)}
                    key={time}
                  >
                    <HourText selected={selectedHour === time}>{time}</HourText>
                  </HourContainer>
                ))}
              </SectionContent>
            </Section>

            <Section show={afternoonAvailability.length > 0}>
              <SectionTitle>Tarde</SectionTitle>

              <SectionContent>
                {afternoonAvailability.map(({ time, timeFormatted }) => (
                  <HourContainer
                    selected={selectedHour === timeFormatted}
                    onPress={() => handleSelectHour(timeFormatted)}
                    key={time}
                  >
                    <HourText selected={selectedHour === time}>{time}</HourText>
                  </HourContainer>
                ))}
              </SectionContent>
            </Section>
          </Schedule>
        )}
      </Container>
    </Background>
  );
};

export default SelectDate;
