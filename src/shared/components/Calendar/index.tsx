import React, {
  SetStateAction,
  Dispatch,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { LocaleConfig } from 'react-native-calendars';

import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  DateButton,
  DateText,
  CalendarContainer,
  CalendarInput,
} from './styles';

LocaleConfig.locales.pt = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev.',
    'Março',
    'Abr',
    'Maio',
    'Jun',
    'Jul.',
    'Agost',
    'Set.',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
};

LocaleConfig.defaultLocale = 'pt';

const calendarTheme = {
  calendarBackground: '#18171d',
  textSectionTitleColor: '#f4ede8',
  todayTextColor: '#ff9000',
  dayTextColor: '#f4ede8',
  textDisabledColor: '#56525A',
  arrowColor: '#ff9000',
  monthTextColor: '#f4ede8',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayFontSize: 14,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 16,
  textDayHeaderFontFamily: 'RobotoSlab-Regular',
};

interface ICalendarProps {
  date: Date;
  onChangeDate: Dispatch<SetStateAction<Date>>;
}

const Calendar: React.FC<ICalendarProps> = ({ date, onChangeDate }) => {
  const [opened, setOpened] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM',' cccc", { locale: pt }),
    [date],
  );

  const onDayPress = useCallback(
    pressedDate => {
      onChangeDate(parseISO(pressedDate.dateString));
      setOpened(false);
    },
    [onChangeDate],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(prevState => !prevState)}>
        <Icon name="calendar" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      <CalendarContainer opened={opened}>
        <CalendarInput
          current={date}
          minDate={new Date()}
          hideExtraDays
          onDayPress={onDayPress}
          markingType="custom"
          markedDates={{
            [format(date, 'yyyy-MM-dd')]: {
              customStyles: {
                container: {
                  backgroundColor: '#ff9000',
                  borderRadius: 10,
                },
                text: {
                  color: '#000',
                  fontWeight: 'bold',
                },
              },
            },
          }}
          theme={calendarTheme}
          style={{ borderRadius: 10, padding: 10 }}
        />
      </CalendarContainer>
    </Container>
  );
};

export default Calendar;
