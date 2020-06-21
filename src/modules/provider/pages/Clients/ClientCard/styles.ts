import styled from 'styled-components/native';

interface IClientCardContainer {
  banned: boolean;
}

interface IClientAvatar {
  banned: boolean;
}

export const Container = styled.View``;

export const ClientCardContainer = styled.View<IClientCardContainer>`
  flex-direction: row;

  margin-bottom: 15px;
  padding: 10px 20px;
  border-radius: 10px;
  background: #17181d;

  border-width: 2px;
  border-color: ${props => (props.banned ? 'red' : '#17181d')};

  align-items: center;
  justify-content: space-around;
`;

export const ClientAvatar = styled.Image<IClientAvatar>`
  width: 64px;
  height: 64px;
  border-radius: 32px;

  border-width: 2px;
  border-color: ${props => (props.banned ? 'red' : '#17181d')};
`;

export const ClientInfoContainer = styled.View`
  margin-left: 20px;

  width: 150px;
`;

export const ClientName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';

  padding: 0 0 10px 0;
`;

export const ClientGenericText = styled.Text`
  color: #f4ede8;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  padding: 0 0 5px 0;
`;

export const ClientConfirmActionContainer = styled.View`
  margin-bottom: 15px;
  padding: 30px 0;
  border-radius: 10px;
  background: #17181d;

  align-items: center;
  justify-content: center;
`;

export const ClientButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: -10px;
`;

export const ClientButton = styled.TouchableOpacity`
  padding: 0 10px;
`;
