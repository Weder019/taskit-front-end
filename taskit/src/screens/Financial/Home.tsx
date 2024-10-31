import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text } from 'react-native';

import Container from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';

type FinancialHomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'FinancialHome'>;

export default function FinancialHome() {
  const navigation = useNavigation<FinancialHomeScreenNavigationProp>();
  return (
    <ScreenContent>
      <Container rounded>
        <View>
          <Text>Financial Home</Text>
          <Button
            title="Go to New Bank Account"
            onPress={() => navigation.navigate('NewBankAccount')}
          />
          <Button title="Go to New Expense" onPress={() => navigation.navigate('NewExpense')} />
          {/* Outros botões para navegação */}
        </View>
      </Container>
    </ScreenContent>
  );
}
