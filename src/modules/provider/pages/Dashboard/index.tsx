import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { format, endOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { RowMap } from 'react-native-swipe-list-view';

import api from '../../../../shared/services/api';
import { useAuth } from '../../../../shared/hooks/auth';

import Calendar from '../../../../shared/components/Calendar';
import Background from '../../../../shared/components/Background';
import ScheduleCard from './ScheduleCard';

import {
  Container,
  Title,
  ScheduleList,
  DayBusyButton,
  DayBusyButtonText,
} from './styles';

interface IUser {
  name: string;
  avatar_url: string;
}

export interface IServices {
  description: string;
  value: number;
  quantity: number;
}

interface IAdditionals {
  id: string;
  total_income: number;
  services: IServices[];
}

export interface IAppointment {
  id: string;
  user: IUser;
  foreign_client_name: string;
  service: string;
  price: number;
  additionals: IAdditionals;
  concluded: boolean;
  date: string;
}

export interface ISchedule {
  time: string;
  timeFormatted: string;
  available: boolean;
  past: boolean;
  providerBusy: boolean;
  appointment: IAppointment;
  dayBusy: boolean;
}

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const isFocused = useIsFocused();

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSchedule = useCallback(() => {
    api
      .get(`providers/day-availability/${profile.id}`, {
        params: {
          day: selectedDay.getDate(),
          month: selectedDay.getMonth() + 1,
          year: selectedDay.getFullYear(),
        },
      })
      .then(response => setSchedules(response.data));
  }, [selectedDay, profile.id]);

  useEffect(() => {
    if (loading || isFocused) {
      loadSchedule();

      setLoading(false);
    }
  }, [loadSchedule, loading, isFocused]);

  const handleHourBusy = useCallback(
    async (time: string, rowMap: RowMap<ISchedule>) => {
      const findSchedule = schedules.find(schedule => schedule.time === time);

      rowMap[time].closeRow();

      if (findSchedule && !findSchedule.past) {
        await api.post('unavailables/set-unavailable', {
          date: findSchedule.timeFormatted,
          is_unavailable: !findSchedule.providerBusy,
        });
      }

      loadSchedule();
    },
    [schedules, loadSchedule],
  );

  const handleDayBusy = useCallback(async () => {
    const newDate = endOfDay(selectedDay);

    await api.post('unavailables/set-unavailable', {
      date: newDate,
      is_unavailable: !schedules[0].dayBusy,
    });
  }, [selectedDay, schedules]);

  const dateFormatted = useMemo(
    () => format(selectedDay, "dd 'de' MMMM',' cccc", { locale: pt }),
    [selectedDay],
  );

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <Calendar
          date={selectedDay}
          onChangeDate={setSelectedDay}
          dateFormatted={dateFormatted}
        />

        <ScheduleList
          data={schedules}
          keyExtractor={schedule => schedule.time}
          renderItem={({ item: schedule }) => (
            <ScheduleCard key={schedule.time} schedule={schedule} />
          )}
          renderHiddenItem={() => <View style={{ flex: 1 }} />}
          ListFooterComponent={() => (
            <DayBusyButton
              dayBusy={schedules[0]?.dayBusy}
              onPress={handleDayBusy}
            >
              <DayBusyButtonText>
                {schedules[0]?.dayBusy
                  ? 'Deixar dia livre'
                  : 'Deixar dia ocupado'}
              </DayBusyButtonText>
            </DayBusyButton>
          )}
          disableRightSwipe
          contentContainerStyle={{ paddingBottom: 430 }}
          showsVerticalScrollIndicator={false}
          rightOpenValue={-50}
          onRefresh={() => setLoading(true)}
          refreshing={loading}
          onRowOpen={(rowKey, rowMap) => handleHourBusy(rowKey, rowMap)}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
