import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  margin-top: ${Platform.OS === 'ios' ? 70 : 40}px;
  margin-bottom: 30px;
`;

export const CalendarContainer = styled.View`
  flex-direction: row;
  width: 80%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;

  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const CalendarText = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;

export const CalendarLeftBottom = styled.TouchableOpacity`
  margin-left: -30px;
`;

export const CalendarRightBottom = styled.TouchableOpacity`
  margin-right: -30px;
`;