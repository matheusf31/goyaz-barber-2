import styled from 'styled-components/native';

export const Container = styled.View``;

export const PartinerCardContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  background: #f4f4f4;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const PartinerAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const PartinerNameContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  margin-left: 15px;
`;

export const PartinerName = styled.Text`
  color: #18171d;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const DeletePartinerContainer = styled.TouchableOpacity`
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const DeletePartinerTextContainer = styled.TouchableOpacity`
  flex: 1;
`;

export const DeletePartinerText = styled.Text`
  color: #18171d;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const DeletePartinerButtonsContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 10px;
`;
