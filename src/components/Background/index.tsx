import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import background from '../../assets/background.jpg';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default styled.ImageBackground.attrs(props => ({
  defaultSource: background,
  source: background,
  blurRadius: props.blurRadius || 2,
}))`
  position: absolute;
  height: ${screenHeight}px;
  width: ${screenWidth + 1}px;
  background-color: rgba(0, 0, 0, 0.45);
`;
