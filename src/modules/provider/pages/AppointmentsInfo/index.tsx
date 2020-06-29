import React from 'react';

import { useAuth } from '../../../../shared/hooks/auth';

import Background from '../../../../shared/components/Background';
import InfosCard from '../../components/InfosCards';

const AppointmentsInfo: React.FC = () => {
  const { profile } = useAuth();

  return (
    <Background>
      <InfosCard provider_id={profile.id} />
    </Background>
  );
};

export default AppointmentsInfo;
