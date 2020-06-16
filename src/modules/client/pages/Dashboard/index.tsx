import React from 'react';
import { Text, Button } from 'react-native';

import { Container } from './styles';

import { useAuth } from '../../../../shared/hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text style={{ alignSelf: 'center', color: '#000' }}>Cliente</Text>

      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
