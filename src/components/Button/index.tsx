import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

/** Posso colocar para receber color por exemplo */
interface IButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
