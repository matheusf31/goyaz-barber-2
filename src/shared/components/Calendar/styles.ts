import styled from 'styled-components/native';
import { Calendar, CalendarMarkingProps } from 'react-native-calendars';

interface ICalendarContainer {
  opened: boolean;
}

export const Container = styled.View`
  padding: 0px 25px;
`;

export const CalendarContainer = styled.View<ICalendarContainer>`
  display: ${props => (props.opened ? 'flex' : 'none')};
`;

export const DateButton = styled.TouchableOpacity`
  height: 46px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const DateText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #fff;
`;

export const CalendarInput = styled(Calendar)<CalendarMarkingProps>``;
