import React from 'react';
import { useRoute } from '@react-navigation/native';

import Background from '../../../../../shared/components/Background';
import InfosCard from '../../../components/InfosCards';

import { Container } from './styles';

interface IPartinersInfo {
  provider_id: string;
}

const PartinersInfo: React.FC<IPartinersInfo> = () => {
  const route = useRoute();
  const routeParams = route.params as IPartinersInfo;

  return (
    <Background>
      <Container>
        <InfosCard provider_id={routeParams.provider_id} />
      </Container>
    </Background>
  );
};

export default PartinersInfo;
