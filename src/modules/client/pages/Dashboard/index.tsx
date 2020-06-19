import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import ListAppointment from './ListAppointment';
import ListConcludedAppointment from './ListConcludedAppointment';

import Background from '../../../../shared/components/Background';
import MonthCalendar from '../../../../shared/components/MonthCalendar';

import {
  Container,
  Title,
  AppointmentsList,
  ConcludedAppointmentsList,
} from './styles';

export interface IAppointments {
  id: string;
  concluded: boolean;
  date: string;
  past: boolean;
  price: number;
  service: string;
  provider: {
    id: string;
    name: string;
    avatar_url: string;
    phone: string;
  };
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointments[]>([]);
  const [concludedAppointments, setConcludedAppointments] = useState<
    IAppointments[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const response = await api.get<IAppointments[]>('appointments', {
        params: {
          month: selectedMonth.getMonth() + 1,
          year: selectedMonth.getFullYear(),
        },
      });

      setAppointments(
        response.data.filter(
          appointment => !appointment.concluded && !appointment.past,
        ),
      );

      setConcludedAppointments(
        response.data.filter(
          appointment => appointment.concluded && appointment.past,
        ),
      );
    }

    loadAppointments();
  }, [selectedMonth]);

  useEffect(() => {
    if (isFocused) {
      setSelectedMonth(new Date());
    }
  }, [isFocused]);

  const handleCancelAppointment = useCallback(
    async (appointment_id: string) => {
      try {
        await api.patch(`appointments/user/cancel/${appointment_id}`);

        setAppointments(prevState =>
          prevState.filter(e => e.id !== appointment_id),
        );
      } catch (err) {
        Alert.alert('Erro ao cancelar!', err.response.data.message);
      }
    },
    [],
  );

  return (
    <Background>
      <MonthCalendar date={selectedMonth} onChangeMonth={setSelectedMonth} />

      <Container>
        {appointments.length > 0 && (
          <>
            <Title>Próximos agendamentos desse mês</Title>

            <AppointmentsList
              horizontal
              data={appointments}
              keyExtractor={appointment => appointment.id}
              renderItem={({ item: appointment }) => (
                <ListAppointment
                  appointment={appointment}
                  onCancelAppointment={() =>
                    handleCancelAppointment(appointment.id)
                  }
                />
              )}
            />
          </>
        )}

        {concludedAppointments.length > 0 && (
          <>
            <Title>Agendamentos concluídos desse mês</Title>

            <ConcludedAppointmentsList
              horizontal
              data={concludedAppointments}
              keyExtractor={appointment => appointment.id}
              renderItem={({ item: appointment }) => (
                <ListConcludedAppointment appointment={appointment} />
              )}
            />
          </>
        )}
      </Container>
    </Background>
  );
};

export default Dashboard;
