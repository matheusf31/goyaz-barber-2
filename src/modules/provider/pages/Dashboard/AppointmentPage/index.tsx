import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

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

  return (
    <Background>
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
                      R$ {service.quantity * service.value}
                    </AdditionalContainerText>
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
    </Background>
  );
};

export default AppointmentPage;
