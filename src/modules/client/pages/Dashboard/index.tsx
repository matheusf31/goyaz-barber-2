import React from 'react';
import { Text, Button } from 'react-native';

import Background from '../../../../shared/components/Background';

import { Container } from './styles';

import { useAuth } from '../../../../shared/hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Background>
      <Container>
        <Text style={{ alignSelf: 'center', color: '#fff' }}>
          Dashboard Client
        </Text>

        <Button title="Sair" onPress={signOut} />
      </Container>
    </Background>
  );
};

export default Dashboard;
