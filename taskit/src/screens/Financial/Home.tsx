import { useNavigation, NavigationProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import AccountList from './components/AccountList';
import BalanceSummary from './components/BalanceSummary';
import ExpandableFloatingButton from './components/ExpandableFloatingButton';
import ExpensesByCategoryCard from './components/ExpenseByCategoryChart';
import IncomeExpenseSummary from './components/IncomeExpenseSummary';
import MonthSelector from './components/MonthSelector';
import PendingCard from './components/PendingCard';
import { useUser } from '../../context/UserContext';

import GlobalHeaderContainer from '~/components/GlobalHeaderContainer';
import { ScreenContent } from '~/components/ScreenContent';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import { Account, Expense, Income } from '~/types/models';

type FinancialHomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'FinancialHome'>;

export default function FinancialHome() {
  const { user, userData, refreshUserData } = useUser();
  const navigation = useNavigation<FinancialHomeScreenNavigationProp>();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<Expense[] | []>([]);
  const [currentMonthIncomes, setCurrentMonthIncomes] = useState<Income[] | null>(null);
  const [accountsBalance, setAccountsBalance] = useState<number>(0);
  const [filteredExpensesTotal, setFilteredExpensesTotal] = useState<number>(0);
  const [filteredIncomesTotal, setFilteredIncomesTotal] = useState<number>(0);

  useEffect(() => {
    if (userData?.accounts) {
      setAccounts(userData.accounts);
    }
  }, [userData]);

  useEffect(() => {
    if (!accounts) return;

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    setAccountsBalance(totalBalance);
    // Filtrando despesas e receitas com base no mês atual
    const filteredExpenses = accounts.flatMap((account) =>
      account.expenses.filter((expense) => moment(expense.date).isSame(currentMonth, 'month'))
    );

    const filteredIncomes = accounts.flatMap((account) =>
      account.incomes.filter((income) => moment(income.date).isSame(currentMonth, 'month'))
    );

    setCurrentMonthExpenses(filteredExpenses || []);
    setCurrentMonthIncomes(filteredIncomes || []);

    // Calculando a soma dos valores de despesas filtradas
    const expensesTotal = filteredExpenses.reduce((sum, expense) => sum + expense.value, 0);
    setFilteredExpensesTotal(expensesTotal);

    // Calculando a soma dos valores de receitas filtradas
    const incomesTotal = filteredIncomes.reduce((sum, income) => sum + income.value, 0);
    setFilteredIncomesTotal(incomesTotal);
  }, [currentMonth, accounts]);

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

  const teste = async () => {
    user?.uid ? await refreshUserData(user.uid) : null;
  };
  return (
    <ScreenContent style={{ justifyContent: 'flex-start' }}>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollContainer}>
        <GlobalHeaderContainer>
          <MonthSelector
            selectedMonth={`${currentMonth.format('MMMM')}`}
            onChangeMonth={(month) =>
              setCurrentMonth(moment(month, 'MMMM').year(new Date().getFullYear()))
            }
          />
          <BalanceSummary
            balance={accountsBalance}
            onToggleVisibility={() => console.log('Alternar visibilidade do saldo')}
          />
          <IncomeExpenseSummary income={filteredIncomesTotal} expense={filteredExpensesTotal} />
        </GlobalHeaderContainer>

        <Text style={styles.label}>Contas</Text>
        <AccountList accounts={userData.accounts} navigation={navigation} />

        {currentMonthExpenses.length > 0 ? (
          <>
            <Text style={styles.label}>Despesas por categoria</Text>
            <ExpensesByCategoryCard
              title="Despesas por categoria"
              currentMonthExpenses={currentMonthExpenses}
            />
          </>
        ) : null}

        {currentMonthExpenses && currentMonthIncomes ? (
          <>
            <Text style={styles.label}>Pendencias</Text>
            <PendingCard incomes={currentMonthIncomes} expenses={currentMonthExpenses} />
          </>
        ) : null}
      </ScrollView>
      <View style={styles.container}>
        <ExpandableFloatingButton buttons={buttons} />
      </View>
      <Button mode="contained" onPress={teste}>
        Teste
      </Button>
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
