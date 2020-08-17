import React, { useState, useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../shared/services/api';

import AppointmentInfoCard from './AppointmentInfoCard';
import AddAdditionalModal from './AddAdditionalModal';

import Background from '../../../../../shared/components/Background';

import {
  Container,
  Title,
  AdditionalCardContainer,
  AdditionalBodyContainer,
  AdditionalMainText,
  AdditionalRowContainer,
  AdditionalContainer,
  AdditionalContainerText,
  RemoveAdditionalButton,
  AdditionalFooterContainer,
  AddAdditionalButton,
} from './styles';

import { ISchedule, IAppointment } from '../index';

interface IRouteParams {
  schedule: ISchedule;
}

const AppointmentPage: React.FC = () => {
  const route = useRoute();
  const { schedule } = route.params as IRouteParams;

  const [appointment, setAppointment] = useState<IAppointment>(
    schedule.appointment,
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateAdditional = useCallback(
    async (description: string, amount: number) => {
      try {
        const response = await api.put(
          `appointments/additional/${appointment.id}`,
          {
            description,
            amount,
          },
        );

        setAppointment(response.data);
      } catch (err) {
        Alert.alert('Erro!', err.response.data.message);
      }
    },
    [appointment.id],
  );

  return (
    <Background>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        {appointment && (
          <Container>
            <Title>Adicionais</Title>

            <AdditionalCardContainer>
              <AdditionalBodyContainer>
                <AdditionalContainer>
                  <AdditionalMainText>Descrição</AdditionalMainText>

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <AdditionalContainerText>
                        {service.description}
                      </AdditionalContainerText>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>

                <AdditionalContainer>
                  <AdditionalMainText>Valor</AdditionalMainText>

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <AdditionalContainerText>
                        R$ {service.value}
                      </AdditionalContainerText>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>

                <AdditionalContainer>
                  <AdditionalMainText>Quantidade</AdditionalMainText>

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <AdditionalContainerText>
                        {service.quantity}
                      </AdditionalContainerText>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>

                <AdditionalContainer>
                  <AdditionalMainText>Subtotal</AdditionalMainText>

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <AdditionalContainerText>
                        R$ {(service.quantity * service.value).toFixed(2)}
                      </AdditionalContainerText>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>

                <AdditionalContainer>
                  <AdditionalMainText />

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <RemoveAdditionalButton
                        onPress={() =>
                          handleUpdateAdditional(service.description, -1)
                        }
                      >
                        <Icon name="minus" size={18} color="red" />
                      </RemoveAdditionalButton>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>

                <AdditionalContainer>
                  <AdditionalMainText />

                  {appointment.additionals.services.map(service => (
                    <AdditionalRowContainer key={service.description}>
                      <RemoveAdditionalButton
                        onPress={() =>
                          handleUpdateAdditional(service.description, 1)
                        }
                      >
                        <Icon name="plus" size={18} color="green" />
                      </RemoveAdditionalButton>
                    </AdditionalRowContainer>
                  ))}
                </AdditionalContainer>
              </AdditionalBodyContainer>

              <AdditionalFooterContainer>
                <AdditionalMainText>Total:</AdditionalMainText>
                <AdditionalContainerText style={{ marginLeft: 5 }}>
                  R$ {appointment.additionals.total_income}
                </AdditionalContainerText>
              </AdditionalFooterContainer>
            </AdditionalCardContainer>

            <AddAdditionalButton onPress={() => setModalVisible(true)}>
              <Icon name="plus-circle" size={36} color="#ff9000" />
            </AddAdditionalButton>

            <AddAdditionalModal
              appointment_id={appointment.id}
              modalVisible={modalVisible}
              onModalChange={setModalVisible}
              onAppointmentUpdate={setAppointment}
            />

            <Title>Detalhes</Title>

            <AppointmentInfoCard
              appointment={appointment}
              onAppointmentUpdate={setAppointment}
            />
          </Container>
        )}
      </ScrollView>
    </Background>
  );
};

export default AppointmentPage;
