import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import background from '../../assets/background_laranja.png';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default styled.ImageBackground.attrs({
  defaultSource: background,
  source: background,
})`
  position: absolute;
  height: ${screenHeight}px;
  width: ${screenWidth + 1}px;
  background-color: rgba(0, 0, 0, 0.45);
`;
