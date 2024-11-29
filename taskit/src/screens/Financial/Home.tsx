import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

import AccountList from './components/AccountList';
import BalanceSummary from './components/BalanceSummary';
import ExpandableFloatingButton from './components/ExpandableFloatingButton';
import ExpensesByCategoryCard from './components/ExpenseByCategoryChart';
import IncomeExpenseSummary from './components/IncomeExpenseSummary';
import MonthSelector from './components/MonthSelector';
import PendingCard from './components/PendingCard';
import { useUser } from '../../context/UserContext';

import GlobalCard from '~/components/GlobalCard';
import GlobalHeaderContainer from '~/components/GlobalHeaderContainer';
import { ScreenContent } from '~/components/ScreenContent';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';

type FinancialHomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'FinancialHome'>;

const accounts = [
  { name: 'Carteira', balance: 120.0 },
  { name: 'Conta Corrente', balance: -50.0 },
  { name: 'Poupança', balance: 500.0 },
  { name: 'Carteira', balance: 120.0 },
  { name: 'Conta Corrente', balance: -50.0 },
  { name: 'Poupança', balance: 500.0 },
  { name: 'Carteira', balance: 120.0 },
  { name: 'Conta Corrente', balance: -50.0 },
  { name: 'Poupança', balance: 500.0 },
  { name: 'Carteira', balance: 120.0 },
  { name: 'Conta Corrente', balance: -50.0 },
  { name: 'Poupança', balance: 500.0 },
];

const data = [
  { name: 'Casa', value: 1050, color: '#3E37F6' },
  { name: 'Mercado', value: 350, color: '#ED3336' },
  { name: 'Lazer', value: 150, color: '#40F485' },
];

export default function FinancialHome() {
  const { user, userData, refreshUserData } = useUser();
  const navigation = useNavigation<FinancialHomeScreenNavigationProp>();

  const buttons = [
    {
      icon: 'trending-up',
      label: 'Receita',
      onPress: () => navigation.navigate('NewIncome'),
    },
    {
      icon: 'trending-down',
      label: 'Despesa',
      onPress: () => navigation.navigate('NewExpense'),
    },
    {
      icon: 'tag',
      label: 'Categoria',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      icon: 'wallet',
      label: 'Conta',
      onPress: () => navigation.navigate('NewBankAccount'),
    },
  ];

  console.log(userData.accounts);

  return (
    <ScreenContent style={{ justifyContent: 'flex-start' }}>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollContainer}>
        <GlobalHeaderContainer>
          <MonthSelector
            selectedMonth="Setembro"
            onChangeMonth={(month) => console.log(`Mês selecionado: ${month}`)}
          />
          <BalanceSummary
            balance={120}
            onToggleVisibility={() => console.log('Alternar visibilidade do saldo')}
          />
          <IncomeExpenseSummary income={1500} expense={1300} />
        </GlobalHeaderContainer>

        <Text style={styles.label}>Contas</Text>
        <AccountList accounts={userData.accounts} />

        <Text style={styles.label}>Despesas por categoria</Text>
        <ExpensesByCategoryCard title="Despesas por categoria" data={data} />

        <Text style={styles.label}>Pendencias</Text>
        <PendingCard
          incomes={userData.accounts[0].incomes}
          expenses={userData.accounts[0].expenses}
        />
      </ScrollView>
      <View style={styles.container}>
        <ExpandableFloatingButton buttons={buttons} />
      </View>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  container: {
    position: 'absolute', // Fixa o botão na tela
    bottom: 0, // Distância da parte inferior
    right: 0, // Distância da borda direita
    backgroundColor: '#37618E', // Cor de fundo do botão
  },
});
