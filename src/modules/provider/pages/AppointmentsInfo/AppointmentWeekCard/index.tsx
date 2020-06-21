import React from 'react';

import {
  AppointmentWeekCardContainer,
  CardTitle,
  TableServicesContainer,
  TableServicesText,
  ServiceContainer,
  Separator,
  TableInfosContainer,
  InfoContainer,
  TableInfosText,
} from './styles';

import { IWeekInfo } from '../index';

interface IAppointmentWeekCardProps {
  weekInfo: IWeekInfo;
  weekIndex: number;
}

const AppointmentWeekCard: React.FC<IAppointmentWeekCardProps> = ({
  weekInfo,
  weekIndex,
}) => {
  return (
    <AppointmentWeekCardContainer>
      <CardTitle>Semana {weekIndex}</CardTitle>

      <TableServicesContainer>
        <ServiceContainer>
          <TableServicesText>
            {weekInfo.services[0].description}
          </TableServicesText>

          <TableServicesText>{weekInfo.services[0].quantity}</TableServicesText>
        </ServiceContainer>

        <ServiceContainer>
          <TableServicesText>
            {weekInfo.services[1].description}
          </TableServicesText>

          <TableServicesText>{weekInfo.services[1].quantity}</TableServicesText>
        </ServiceContainer>

        <ServiceContainer>
          <TableServicesText>
            {weekInfo.services[2].description}
          </TableServicesText>

          <TableServicesText>{weekInfo.services[2].quantity}</TableServicesText>
        </ServiceContainer>

        <ServiceContainer>
          <TableServicesText>
            {weekInfo.services[3].description}
          </TableServicesText>

          <TableServicesText>{weekInfo.services[3].quantity}</TableServicesText>
        </ServiceContainer>

        <ServiceContainer>
          <TableServicesText>
            {weekInfo.services[4].description}
          </TableServicesText>

          <TableServicesText>{weekInfo.services[4].quantity}</TableServicesText>
        </ServiceContainer>
      </TableServicesContainer>

      <Separator />

      <TableInfosContainer>
        <InfoContainer>
          <TableInfosText>Quantidade de clientes:</TableInfosText>

          <TableInfosText>{weekInfo.customers}</TableInfosText>
        </InfoContainer>

        <InfoContainer>
          <TableInfosText>Lucro sem adicionais:</TableInfosText>

          <TableInfosText>{weekInfo.profitWithoutAdditionals}</TableInfosText>
        </InfoContainer>

        <InfoContainer>
          <TableInfosText>Lucro com adicionais:</TableInfosText>
          <TableInfosText>{weekInfo.profitWithAdditionals}</TableInfosText>
        </InfoContainer>
      </TableInfosContainer>
    </AppointmentWeekCardContainer>
  );
};

export default AppointmentWeekCard;
