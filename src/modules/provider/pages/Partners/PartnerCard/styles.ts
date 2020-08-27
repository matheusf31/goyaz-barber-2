import styled from 'styled-components/native';

export const Container = styled.View``;

export const PartnerCardContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  background: #f4f4f4;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const PartnerAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const PartnerNameContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  margin-left: 15px;
`;

export const PartnerName = styled.Text`
  color: #17181d;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const DeletePartnerContainer = styled.TouchableOpacity`
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const DeletePartnerTextContainer = styled.TouchableOpacity`
  flex: 1;
`;

export const DeletePartnerText = styled.Text`
  color: #17181d;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const DeletePartnerButtonsContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 10px;
`;
