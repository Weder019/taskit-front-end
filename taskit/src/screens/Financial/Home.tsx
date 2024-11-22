import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text } from 'react-native';

import GlobalCard from '~/components/GlobalCard';
import GlobalHeaderContainer from '~/components/GlobalHeaderContainer';
import { ScreenContent } from '~/components/ScreenContent';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';

type FinancialHomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'FinancialHome'>;

export default function FinancialHome() {
  const navigation = useNavigation<FinancialHomeScreenNavigationProp>();

  return (
    <ScreenContent style={{ justifyContent: 'flex-start' }}>
      <GlobalHeaderContainer>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Meu Cabeçalho</Text>
      </GlobalHeaderContainer>
      <GlobalCard style={{ marginHorizontal: 16 }}>
        <Text>Este é um card reutilizável!</Text>
      </GlobalCard>
    </ScreenContent>
  );
}
