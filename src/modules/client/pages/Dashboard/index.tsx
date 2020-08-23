import React, { useEffect, useState, useCallback } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import AppointmentCard from './AppointmentCard';
import ConcludedAppointmentCard from './ConcludedAppointmentCard';

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
        response.data.filter(appointment => appointment.concluded),
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
        setAppointments(prevState =>
          prevState.filter(e => e.id !== appointment_id),
        );

        await api.patch(`appointments/user/cancel/${appointment_id}`);
      } catch (err) {
        Alert.alert('Erro ao cancelar!', err.response.data.message);
      }
    },
    [],
  );

  return (
    <Background>
      <SafeAreaView>
        <MonthCalendar date={selectedMonth} onChangeMonth={setSelectedMonth} />
      </SafeAreaView>

      <Container>
        {appointments.length > 0 && (
          <>
            <Title>Próximos agendamentos desse mês</Title>

            <AppointmentsList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={appointments}
              keyExtractor={appointment => appointment.id}
              renderItem={({ item: appointment }) => (
                <AppointmentCard
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
              showsHorizontalScrollIndicator={false}
              horizontal
              data={concludedAppointments}
              keyExtractor={appointment => appointment.id}
              renderItem={({ item: appointment }) => (
                <ConcludedAppointmentCard appointment={appointment} />
              )}
              contentContainerStyle={{ paddingRight: 20 }}
            />
          </>
        )}
      </Container>
    </Background>
  );
};

export default Dashboard;
