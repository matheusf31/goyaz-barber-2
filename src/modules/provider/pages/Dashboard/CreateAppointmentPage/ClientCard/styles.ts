import styled from 'styled-components/native';

interface IClientCardContainer {
  banned: boolean;
}

interface IClientAvatar {
  banned: boolean;
}

export const Container = styled.TouchableHighlight``;

export const ClientCardContainer = styled.View<IClientCardContainer>`
  flex-direction: row;

  margin-bottom: 15px;
  padding: 10px 20px;
  border-radius: 10px;
  background: #f4f4f4;

  border-width: 2px;
  border-color: ${props => (props.banned ? 'red' : '#f4f4f4')};

  align-items: center;
`;

export const ClientAvatar = styled.Image<IClientAvatar>`
  width: 64px;
  height: 64px;
  border-radius: 32px;

  border-width: 2px;
  border-color: ${props => (props.banned ? 'red' : '#f4f4f4')};
`;

export const ClientInfoContainer = styled.View`
  margin-left: 20px;

  flex: 1;
`;

export const ClientName = styled.Text`
  color: #18171d;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';

  padding: 0 0 10px 0;
`;

export const ClientGenericText = styled.Text`
  color: #18171d;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  padding: 0 0 5px 0;
`;

export const RemoveSelectedClientButton = styled.TouchableOpacity``;
