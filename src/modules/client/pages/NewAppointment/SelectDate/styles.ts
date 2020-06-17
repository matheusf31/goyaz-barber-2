import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { IProvider } from './index';

interface IProviderContainerProps {
  selected: boolean;
}

interface IProviderNameProps {
  selected: boolean;
}

interface IHourContainerProps {
  selected: boolean;
}

interface IHourTextProps {
  selected: boolean;
}

interface ISectionProps {
  show: boolean;
}

export const Container = styled.ScrollView`
  margin-bottom: 100px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvider>,
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})`
  padding: 28px 0px;
`;

export const ProviderContainer = styled(RectButton)<IProviderContainerProps>`
  background: ${props => (props.selected ? '#ff9000' : '#18171d')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export const ProviderName = styled.Text<IProviderNameProps>`
  margin-left: 12px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${props => (props.selected ? '#18171d' : '#f4ede8')};
`;

export const Schedule = styled.ScrollView`
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const ScheduleTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 20px;
  margin: 0 24px 24px;
`;

export const Section = styled.View<ISectionProps>`
  display: ${props => (props.show ? 'flex' : 'none')};
  padding: 0 0 16px;
`;

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  font-size: 18px;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

export const HourContainer = styled(RectButton)<IHourContainerProps>`
  padding: 12px 18px;
  background: ${props => (props.selected ? '#ff9000' : '#18171d')};
  border-radius: 10px;
  margin-right: 12px;
`;

export const HourText = styled.Text<IHourTextProps>`
  color: ${props => (props.selected ? '#18171d' : '#fff')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
