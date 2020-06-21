import React, { useState, useMemo, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import api from '../../../../shared/services/api';

import { useAuth } from '../../../../shared/hooks/auth';

import Background from '../../../../shared/components/Background';
import MonthCalendar from '../../../../shared/components/MonthCalendar';
import AppointmentWeekCard from './AppointmentWeekCard';

import {
  Container,
  InfosContainer,
  AppointmentWeekInfoList,
  InfosContainerTitle,
  AppointmentMonthCardContainer,
  TableInfosContainer,
  InfoContainer,
  TableInfosText,
  Separator,
} from './styles';

type IWeekServices = {
  description: string;
  quantity: number;
};

export type IWeekInfo = {
  profitWithoutAdditionals: number;
  profitWithAdditionals: number;
  customers: number;
  services: IWeekServices[];
};

interface IAppointmentsInfo {
  totalAppointmentsInMonth: number;
  concludedAppointmentsInMonth: number;
  weekInfo: IWeekInfo[];
  totalProfitInMonthWithoutAdditionals: number;
  totalProfitInMonthWithAdditionals: number;
  totalCustomersInMonth: number;
}

const Dashboard: React.FC = () => {
  const { profile } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [appointmentsInfo, setAppointmentsInfo] = useState(
    {} as IAppointmentsInfo,
  );

  useEffect(() => {
    api
      .get(`appointments/info/${profile.id}`, {
        params: {
          month: selectedMonth.getMonth() + 1,
          year: selectedMonth.getFullYear(),
        },
      })
      .then(response => setAppointmentsInfo(response.data));
  }, [profile.id, selectedMonth]);

  const profitChartData = useMemo(() => {
    if (appointmentsInfo.weekInfo) {
      return {
        labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5'],
        datasets: [
          {
            data: [
              appointmentsInfo?.weekInfo[0].profitWithAdditionals,
              appointmentsInfo?.weekInfo[1].profitWithAdditionals,
              appointmentsInfo?.weekInfo[2].profitWithAdditionals,
              appointmentsInfo?.weekInfo[3].profitWithAdditionals,
              appointmentsInfo?.weekInfo[4].profitWithAdditionals,
            ],
            color: () => `rgba(255, 144, 0, 0.7)`, // muda a cor da linha
          },
        ],
        legend: ['Renda por semana'],
      };
    }

    return {
      labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5'],
      datasets: [
        {
          data: [0],
          color: () => `rgba(255, 144, 0, 0.7)`,
        },
      ],
      legend: ['Renda por semana'],
    };
  }, [appointmentsInfo]);

  return (
    <Background>
      <Container>
        <MonthCalendar date={selectedMonth} onChangeMonth={setSelectedMonth} />

        <InfosContainer contentContainerStyle={{ paddingBottom: 250 }}>
          <LineChart
            data={profitChartData}
            width={Dimensions.get('window').width} // from react-native
            height={200}
            yAxisLabel="R$ "
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              backgroundGradientFromOpacity: 1,
              backgroundGradientToOpacity: 1,
              color: () => `rgba(255, 144, 0, 0.1)`, // cor das linhas e do preenchimento delas
              labelColor: (opacity = 1) => `rgba(84, 84, 84, ${opacity})`, // cor do chartData
              propsForDots: {
                r: '3',
                strokeWidth: '1',
                stroke: '#fff',
              },
              strokeWidth: 2, // optional, default 3
              fillShadowGradient: '#F1B260',
              decimalPlaces: 0,
            }}
            bezier
            style={{
              borderRadius: 10,
              margin: 20,
            }}
            segments={4}
          />

          <InfosContainerTitle>Informações semanais</InfosContainerTitle>

          <AppointmentWeekInfoList
            horizontal
            data={appointmentsInfo.weekInfo}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item: weekInfo, index }) => (
              <AppointmentWeekCard weekInfo={weekInfo} weekIndex={index + 1} />
            )}
          />

          <InfosContainerTitle>Informações gerais do mês</InfosContainerTitle>

          <AppointmentMonthCardContainer>
            <TableInfosContainer>
              <InfoContainer>
                <TableInfosText>Total de agendamentos marcados:</TableInfosText>

                <TableInfosText>
                  {appointmentsInfo.totalAppointmentsInMonth}
                </TableInfosText>
              </InfoContainer>

              <InfoContainer>
                <TableInfosText>
                  Total de agendamentos concluídos:
                </TableInfosText>

                <TableInfosText>
                  {appointmentsInfo.concludedAppointmentsInMonth}
                </TableInfosText>
              </InfoContainer>

              <InfoContainer>
                <TableInfosText>Número de clientes do app:</TableInfosText>
                <TableInfosText>
                  {appointmentsInfo.totalCustomersInMonth}
                </TableInfosText>
              </InfoContainer>

              <Separator />

              <InfoContainer>
                <TableInfosText>Lucro total sem adicionais:</TableInfosText>
                <TableInfosText>
                  {appointmentsInfo.totalProfitInMonthWithoutAdditionals}
                </TableInfosText>
              </InfoContainer>

              <InfoContainer>
                <TableInfosText>Lucro total com adicionais:</TableInfosText>
                <TableInfosText>
                  {appointmentsInfo.totalProfitInMonthWithAdditionals}
                </TableInfosText>
              </InfoContainer>
            </TableInfosContainer>
          </AppointmentMonthCardContainer>
        </InfosContainer>
      </Container>
    </Background>
  );
};

export default Dashboard;
