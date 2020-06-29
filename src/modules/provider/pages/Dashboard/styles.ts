import styled from 'styled-components/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RectButton } from 'react-native-gesture-handler';

import { ISchedule } from './index';

interface IDayBusyButtonProps {
  dayBusy: boolean;
}

export const Container = styled.SafeAreaView`
  margin: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';

  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ScheduleList = styled(
  SwipeListView as new () => SwipeListView<ISchedule>,
)`
  margin-top: 10px;
`;

export const DayBusyButton = styled(RectButton)<IDayBusyButtonProps>`
  background: ${props => (props.dayBusy ? '#3bbc39' : '#bc3939')};
  height: 80px;
  margin: 5px 0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const DayBusyButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;
