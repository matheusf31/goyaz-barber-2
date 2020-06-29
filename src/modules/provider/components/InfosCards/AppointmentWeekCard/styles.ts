import styled from 'styled-components/native';

export const AppointmentWeekCardContainer = styled.View`
  /** mudar */
  width: 320px;

  background: #fff;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 10px;

  padding: 15px 10px;
`;

export const CardTitle = styled.Text`
  align-self: center;

  font-size: 20px;
  font-family: 'RobotoSlab-Medium';

  color: #ff9000;
`;

export const TableServicesContainer = styled.View`
  padding-bottom: 15px;
`;

export const ServiceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 2px 20px;
`;

export const TableServicesText = styled.Text`
  font-size: 15px;
  font-family: 'RobotoSlab-Regular';
`;

export const Separator = styled.View`
  align-self: center;
  height: 1px;
  width: 50px;
  background: #ff9000;
`;

export const TableInfosContainer = styled.View`
  margin-top: 15px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 3px 20px;
`;

export const TableInfosText = styled.Text`
  font-size: 15px;
  font-family: 'RobotoSlab-Medium';
`;
