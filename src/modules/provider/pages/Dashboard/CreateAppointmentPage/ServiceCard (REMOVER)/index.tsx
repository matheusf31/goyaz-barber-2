import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  ServiceContainer,
  ServiceName,
  ServiceInfoContainer,
  ServiceInfoPriceContainer,
  ServiceInfoDurationContainer,
  ServiceInfoText,
} from './styles';

import { IServices } from '../index';

interface IServiceCardProps {
  service: IServices;
  selectedService: IServices;
  onChangeSelectedService: React.Dispatch<React.SetStateAction<IServices>>;
}

const ServiceCard: React.FC<IServiceCardProps> = ({
  service,
  selectedService,
  onChangeSelectedService,
}) => {
  return (
    <ServiceContainer
      selected={selectedService === service}
      onPress={() => onChangeSelectedService(service)}
    >
      <ServiceName selected={selectedService === service}>
        {service.name}
      </ServiceName>

      <ServiceInfoContainer>
        <ServiceInfoPriceContainer>
          <Icon name="dollar-sign" size={12} color="#18171d" />

          <ServiceInfoText selected={selectedService === service}>
            {service.price}
          </ServiceInfoText>
        </ServiceInfoPriceContainer>

        <ServiceInfoDurationContainer>
          <Icon name="clock" size={12} color="#18171d" />

          <ServiceInfoText selected={selectedService === service}>
            {service.duration}
          </ServiceInfoText>
        </ServiceInfoDurationContainer>
      </ServiceInfoContainer>
    </ServiceContainer>
  );
};

export default ServiceCard;
