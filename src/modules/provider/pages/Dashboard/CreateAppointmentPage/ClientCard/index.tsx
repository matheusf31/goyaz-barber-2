import React, { useCallback, useMemo } from 'react';

import Icon from 'react-native-vector-icons/Feather';

import defaultAvatar from '../../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  ClientCardContainer,
  ClientAvatar,
  ClientInfoContainer,
  ClientName,
  ClientGenericText,
  RemoveSelectedClientButton,
} from './styles';

import { IClients, IServices } from '../index';

interface IClientCardProps {
  client: IClients;
  selectedClient: IClients;
  textFilter: string;
  onChangeTextFilter: React.Dispatch<React.SetStateAction<string>>;
  onChangeSelectClient: React.Dispatch<React.SetStateAction<IClients>>;
  onChangeSelectedService: React.Dispatch<React.SetStateAction<IServices>>;
}

const ClientCard: React.FC<IClientCardProps> = ({
  client,
  textFilter,
  selectedClient,
  onChangeTextFilter,
  onChangeSelectClient,
  onChangeSelectedService,
}) => {
  const regexExp = useMemo(() => {
    return new RegExp(textFilter, 'i');
  }, [textFilter]);

  const handleSelectClient = useCallback(() => {
    onChangeSelectClient(client);
  }, [client, onChangeSelectClient]);

  const handleRemoveClient = useCallback(() => {
    onChangeSelectClient({} as IClients);
    onChangeTextFilter('');
    onChangeSelectedService({} as IServices);
  }, [onChangeSelectClient, onChangeTextFilter, onChangeSelectedService]);

  return (
    client.name.match(regexExp) && (
      <Container onPress={handleSelectClient}>
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
          </ClientInfoContainer>

          {selectedClient.id && (
            <RemoveSelectedClientButton onPress={handleRemoveClient}>
              <Icon name="x" size={26} color="#18171d" />
            </RemoveSelectedClientButton>
          )}
        </ClientCardContainer>
      </Container>
    )
  );
};

export default ClientCard;
