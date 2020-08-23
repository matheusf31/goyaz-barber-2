import React, { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../shared/services/api';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  ClientCardContainer,
  ClientAvatar,
  ClientInfoContainer,
  ClientName,
  ClientGenericText,
  ClientButton,
  ClientConfirmActionContainer,
  ClientButtonContainer,
} from './styles';

import { IClients } from '../index';

interface IClientCardProps {
  client: IClients;
  textFilter: string;
  onClientChange: React.Dispatch<React.SetStateAction<IClients[]>>;
}

const ClientCard: React.FC<IClientCardProps> = ({
  client,
  textFilter,
  onClientChange,
}) => {
  const [confirm, setConfirm] = useState(false);

  const handleBanUser = useCallback(
    async (user_id: string) => {
      try {
        await api.patch('/users/ban', {
          user_id,
          banned: client.banned,
        });

        onClientChange(prevState => {
          const clientIndex = prevState.findIndex(
            element => element.id === user_id,
          );

          prevState[clientIndex].banned = !prevState[clientIndex].banned;

          return prevState;
        });

        setConfirm(false);
      } catch (err) {
        Alert.alert('Erro ao banir!', err.response.data.message);
      }
    },
    [client.banned, onClientChange],
  );

  const regexExp = useMemo(() => {
    return new RegExp(textFilter, 'i');
  }, [textFilter]);

  return (
    client.name.match(regexExp) && (
      <Container>
        {!confirm && (
          <ClientCardContainer banned={client.banned}>
            {client.avatar_url ? (
              <ClientAvatar
                banned={client.banned}
                source={{ uri: client.avatar_url }}
              />
            ) : (
              <ClientAvatar banned={client.banned} source={defaultAvatar} />
            )}

            <ClientInfoContainer>
              <ClientName>{client.name}</ClientName>
              <ClientGenericText>{client.email}</ClientGenericText>
              <ClientGenericText>{client.phone}</ClientGenericText>
              <ClientGenericText>
                agendamentos concluídos: {client.concludedAppointments}
              </ClientGenericText>
            </ClientInfoContainer>

            {client.banned ? (
              <ClientButton
                style={{ left: 10 }}
                onPress={() => setConfirm(true)}
              >
                <Icon name="check-circle" size={26} color="#3bbc39" />
              </ClientButton>
            ) : (
              <ClientButton
                style={{ left: 10 }}
                onPress={() => setConfirm(true)}
              >
                <Icon name="slash" size={26} color="red" />
              </ClientButton>
            )}
          </ClientCardContainer>
        )}

        {confirm && (
          <ClientConfirmActionContainer>
            {client.banned ? (
              <ClientGenericText style={{ fontSize: 18 }}>
                Deseja mesmo desbanir esse usuário?
              </ClientGenericText>
            ) : (
              <ClientGenericText style={{ fontSize: 18 }}>
                Deseja mesmo banir esse usuário?
              </ClientGenericText>
            )}

            <ClientButtonContainer>
              <ClientButton onPress={() => setConfirm(false)}>
                <Icon name="x" size={26} color="red" />
              </ClientButton>

              <ClientButton onPress={() => handleBanUser(client.id)}>
                <Icon name="check" size={26} color="#3bbc39" />
              </ClientButton>
            </ClientButtonContainer>
          </ClientConfirmActionContainer>
        )}
      </Container>
    )
  );
};

export default ClientCard;
