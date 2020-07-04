import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IServices } from '../index';

export const Container = styled.SafeAreaView`
  margin: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';

  margin-top: 30px;
  margin-bottom: 20px;
`;

export const AdditionalList = styled(
  FlatList as new () => FlatList<IServices>,
)``;

export const AdditionalCardContainer = styled.View`
  padding: 5px 10px 10px;
  border-radius: 10px;

  background: #f4f4f4;
`;

export const AdditionalBodyContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AdditionalMainText = styled.Text`
  color: #18171d;
  font-size: 15px;
  font-family: 'RobotoSlab-Medium';
  align-self: center;
`;

export const AdditionalContainer = styled.View`
  /* background: green; */
`;

export const AdditionalRowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;

  /* background: blue; */
`;

export const AdditionalContainerText = styled.Text`
  color: #18171d;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const RemoveAdditionalButton = styled.TouchableOpacity``;

export const AdditionalFooterContainer = styled.View`
  flex-direction: row;
  padding-top: 15px;
  align-self: flex-end;
  align-items: baseline;
`;

export const AddAdditionalButton = styled.TouchableOpacity`
  margin-top: 10px;
  align-self: center;
`;
