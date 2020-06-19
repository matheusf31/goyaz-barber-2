import React, { useMemo, SetStateAction, Dispatch } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  CalendarContainer,
  CalendarText,
  CalendarLeftBottom,
  CalendarRightBottom,
} from './styles';

interface IGraphsDateInputProps {
  date: Date;
  onChangeMonth: Dispatch<SetStateAction<Date>>;
}

const GraphsDateInput: React.FC<IGraphsDateInputProps> = ({
  date,
  onChangeMonth,
}) => {
  const dateFormatted = useMemo(() => {
    const newDate = format(date, "MMMM '-' yyyy'", { locale: pt });
    return newDate.substring(0, 1).toUpperCase().concat(newDate.substring(1));
  }, [date]);

  return (
    <Container>
      <CalendarContainer>
        <CalendarLeftBottom
          onPress={() => {
            onChangeMonth(subMonths(date, 1));
          }}
        >
          <Icon name="chevron-left" size={32} color="#ff9000" />
        </CalendarLeftBottom>

        <CalendarText>{dateFormatted}</CalendarText>

        <CalendarRightBottom
          onPress={() => {
            onChangeMonth(addMonths(date, 1));
          }}
        >
          <Icon name="chevron-right" size={32} color="#ff9000" />
        </CalendarRightBottom>
      </CalendarContainer>
    </Container>
  );
};

export default GraphsDateInput;
