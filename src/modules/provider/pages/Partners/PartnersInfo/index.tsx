import React from 'react';
import { useRoute } from '@react-navigation/native';

import Background from '../../../../../shared/components/Background';
import InfosCard from '../../../components/InfosCards';

import { Container } from './styles';

interface IPartnersInfo {
  provider_id: string;
}

const PartnersInfo: React.FC<IPartnersInfo> = () => {
  const route = useRoute();
  const routeParams = route.params as IPartnersInfo;

  return (
    <Background>
      <Container>
        <InfosCard provider_id={routeParams.provider_id} />
      </Container>
    </Background>
  );
};

export default PartnersInfo;
