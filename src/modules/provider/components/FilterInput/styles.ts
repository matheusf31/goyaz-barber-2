import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const FilterInputContainer = styled.View`
  width: 100%;
  height: 55px;
  padding: 0 16px;

  border-radius: 10px;
  border-bottom-width: 1px;
  border-color: #f4ede8;

  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
