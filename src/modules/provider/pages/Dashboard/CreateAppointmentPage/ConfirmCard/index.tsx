import React, { useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, formatRelative, differenceInDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import api from '../../../../../../shared/services/api';

import defaultAvatar from '../../../../../../shared/assets/defaultavatar.png';

import {
  ConfirmContainer,
  ConfirmContainerInfo,
  Avatar,
  ConfirmContainerDetails,
  DetailsContainer,
  DetailsText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

import { IClients, IServices } from '../index';

interface IConfirmCardProps {
  client: IClients;
  selectedService: IServices;
  date: string;
  foreignClientName: string;
}

const ConfirmCard: React.FC<IConfirmCardProps> = ({
  client,
  selectedService,
  date,
  foreignClientName,
}) => {
  const navigation = useNavigation();

  const formatedDate = useMemo(() => {
    const parsedDate = parseISO(date);

    if (differenceInDays(parsedDate, new Date()) >= 6) {
      const dateFormated = formatRelative(parsedDate, new Date(), {
        locale: pt,
      });

      return `${dateFormated} às ${format(parsedDate, 'kk:mm')}`;
    }

    return formatRelative(parsedDate, new Date(), {
      locale: pt,
    });
  }, [date]);

  const handleCreateAppointment = useCallback(async () => {
    const foreign_client_name =
      foreignClientName === '' ? undefined : foreignClientName;

    try {
      await api.post('appointments/provider', {
        user_id: client.id,
        service: selectedService.name,
        date,
        foreign_client_name,
      });

      // navigation.reset({
      //   routes: [{ name: 'Dashboard' }],
      //   index: 0,
      // });

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro ao marcar.', err.response.data.message);
    }
  }, [client.id, date, selectedService.name, foreignClientName, navigation]);

  return (
    <ConfirmContainer>
      <ConfirmContainerInfo>
        {client.avatar_url ? (
          <Avatar
            source={{
              uri: client.avatar_url,
            }}
          />
        ) : (
          <Avatar source={defaultAvatar} />
        )}

        <ConfirmContainerDetails>
          <DetailsContainer>
            <Icon
              name="user"
              size={20}
              color="#ff9000"
              style={{ marginTop: 2 }}
            />
            <DetailsText>
              {client.name ? client.name : foreignClientName}
            </DetailsText>
          </DetailsContainer>

          <DetailsContainer>
            <Icon
              name="scissors"
              size={20}
              color="#ff9000"
              style={{ marginTop: 2 }}
            />
            <DetailsText>
              {selectedService.name.charAt(0).toUpperCase() +
                selectedService.name.slice(1)}
            </DetailsText>
          </DetailsContainer>

          <DetailsContainer>
            <Icon
              name="clock"
              size={20}
              color="#ff9000"
              style={{ marginTop: 2 }}
            />
            <DetailsText>{formatedDate}</DetailsText>
          </DetailsContainer>
        </ConfirmContainerDetails>
      </ConfirmContainerInfo>

      <CreateAppointmentButton
        underlayColor="#E38000"
        onPress={handleCreateAppointment}
      >
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
    </ConfirmContainer>
  );
};

export default ConfirmCard;
