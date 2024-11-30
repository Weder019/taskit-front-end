import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useGlobalStyles } from '~/styles/globalStyles';
import { TransactionDropdown } from './components/TransactionDropdown';
import { expenseCategories, incomeCategories } from '~/utils/categoriesList';
import { useUser } from '~/context/UserContext';

import moment from 'moment';
import 'moment/locale/pt-br';
import { Account, Expense, Income } from '~/types';

moment.locale('pt-br');

const screenHeight = Dimensions.get('window').height;

type Transaction = Expense | Income;

export default function TransactionsScreen() {
  const style = useGlobalStyles();

  const { user, userData, refreshUserData } = useUser();

  const [selectedOption, setSelectedOption] = useState<'expenses' | 'income' | 'transactions'>(
    'expenses'
  );
  const [currentMonth, setCurrentMonth] = useState(moment());

  // Obter transações conforme o tipo selecionado
  const transactions = userData.accounts.flatMap((account: Account) => {
    if (selectedOption === 'expenses') {
      return account.expenses
        .filter((exp: Expense) => moment(exp.date).isSame(currentMonth, 'month'))
        .map((exp: Expense) => ({ ...exp, acc_name: account.acc_name }));
    }
    if (selectedOption === 'income') {
      return account.incomes
        .filter((inc: Income) => moment(inc.date).isSame(currentMonth, 'month'))
        .map((inc: Income) => ({ ...inc, acc_name: account.acc_name }));
    }
    // Caso "transações", combina despesas e receitas filtradas por data
    return [...account.expenses, ...account.incomes]
      .filter((tran: Transaction) => moment(tran.date).isSame(currentMonth, 'month'))
      .map((tran: Transaction) => ({ ...tran, acc_name: account.acc_name }));
  });

  const sortedTransactions = transactions.sort((a: Transaction, b: Transaction) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);
    return dateB.diff(dateA); // Decrescente
  });

  const groupedTransactions = sortedTransactions.reduce(
    (acc: Record<string, Transaction[]>, transaction: Transaction) => {
      const formattedDate = moment(transaction.date).format('dddd, DD');
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(transaction);
      return acc;
    },
    {} as Record<string, typeof sortedTransactions>
  );

  const getCategoryIcon = (transaction: Transaction) => {
    const isExpense = 'exp_name' in transaction;
    const categories = isExpense ? expenseCategories : incomeCategories;
    const categoryItem = categories.find((item) => item.name === transaction.category);
    return categoryItem ? categoryItem.icon : 'dots-horizontal';
  };

  const renderTransaction = ({ item }: { item: (typeof transactions)[0] }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        {/* Passamos a transação inteira para determinar o ícone */}
        <IconButton icon={getCategoryIcon(item)} size={24} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>
          {'exp_name' in item ? item.exp_name : item.inc_name}
        </Text>
        <Text style={styles.transactionCategory}>
          {item.category} | {item.acc_name}
        </Text>
      </View>
      <View style={styles.transactionValueContainer}>
        <Text
          style={[styles.transactionValue, { color: 'exp_name' in item ? '#c44c4e' : '#639e64' }]}>
          R$ {item.value.toFixed(2)}
        </Text>
        <IconButton
          icon={item.paid ? 'check-circle' : 'pin-off'}
          size={18}
          iconColor={item.paid ? '#639e64' : '#c44c4e'}
        />
      </View>
    </View>
  );

  const dataForFlatList = Object.keys(groupedTransactions).map((date) => ({
    date,
    transactions: groupedTransactions[date],
  }));

  const back = () => {
    console.log('back');
  };

  const calculateExpenseTotals = (): { totalPending: number; totalPaid: number } => {
    const totalPending = transactions
      .filter((t: Transaction) => 'exp_name' in t && !t.paid)
      .reduce((sum: number, t: Expense) => sum + t.value, 0);

    const totalPaid = transactions
      .filter((t: Transaction) => 'exp_name' in t && t.paid)
      .reduce((sum: number, t: Expense) => sum + t.value, 0);

    return { totalPending, totalPaid };
  };

  const calculateIncomeTotals = (): { totalPending: number; totalReceived: number } => {
    const totalPending = transactions
      .filter((t: Transaction) => 'inc_name' in t && !t.paid)
      .reduce((sum: number, t: Income) => sum + t.value, 0);

    const totalReceived = transactions
      .filter((t: Transaction) => 'inc_name' in t && t.paid)
      .reduce((sum: number, t: Income) => sum + t.value, 0);

    return { totalPending, totalReceived };
  };

  const calculateTransactionTotals = () => {
    const allAccounts = userData.accounts;

    let totalBalance = 0; // Saldo total acumulado até o mês de referência
    let balanceMonthly = 0; // Balanço do mês de referência (receitas - despesas)

    allAccounts.forEach((account: Account) => {
      // Transações até o último dia do mês de referência
      const pastTransactions = [...account.expenses, ...account.incomes].filter(
        (tran) => moment(tran.date).isSameOrBefore(currentMonth, 'month') && tran.paid
      );

      // Transações específicas do mês de referência
      const monthlyTransactions = [...account.expenses, ...account.incomes].filter((tran) =>
        moment(tran.date).isSame(currentMonth, 'month')
      );

      // Saldo final do mês (acumulado até o último dia do mês de referência)
      const pastExpenses = pastTransactions
        .filter((tran) => 'exp_name' in tran)
        .reduce((sum, tran) => sum + tran.value, 0);

      const pastIncomes = pastTransactions
        .filter((tran) => 'inc_name' in tran)
        .reduce((sum, tran) => sum + tran.value, 0);

      totalBalance += pastIncomes - pastExpenses;

      // Balanço mensal (receitas - despesas do mês de referência)
      const monthlyExpenses = monthlyTransactions
        .filter((tran) => 'exp_name' in tran)
        .reduce((sum, tran) => sum + tran.value, 0);

      const monthlyIncomes = monthlyTransactions
        .filter((tran) => 'inc_name' in tran)
        .reduce((sum, tran) => sum + tran.value, 0);

      balanceMonthly += monthlyIncomes - monthlyExpenses;
    });

    return { totalBalance, balanceMonthly };
  };

  const calculateProjectedBalance = () => {
    const allAccounts = userData.accounts;

    let totalBalance = 0; // Saldo acumulado até o mês atual + previsões do mês selecionado
    let balanceMonthly = 0; // Balanço mensal do mês selecionado

    allAccounts.forEach((account: Account) => {
      // Considera todas as transações passadas como pagas
      const pastTransactions = [...account.expenses, ...account.incomes].filter((tran) =>
        moment(tran.date).isBefore(currentMonth, 'month')
      );

      // Transações do mês selecionado
      const monthlyTransactions = [...account.expenses, ...account.incomes].filter((tran) =>
        moment(tran.date).isSame(currentMonth, 'month')
      );

      // Saldo acumulado com todas as transações passadas (tratando-as como pagas)
      const pastExpenses = pastTransactions
        .filter((tran) => 'exp_name' in tran)
        .reduce((sum, tran: Expense) => sum + tran.value, 0);

      const pastIncomes = pastTransactions
        .filter((tran) => 'inc_name' in tran)
        .reduce((sum, tran: Income) => sum + tran.value, 0);

      totalBalance += pastIncomes - pastExpenses;

      // Balanço mensal do mês selecionado
      const monthlyExpenses = monthlyTransactions
        .filter((tran) => 'exp_name' in tran)
        .reduce((sum, tran: Expense) => sum + tran.value, 0);

      const monthlyIncomes = monthlyTransactions
        .filter((tran) => 'inc_name' in tran)
        .reduce((sum, tran: Income) => sum + tran.value, 0);

      balanceMonthly += monthlyIncomes - monthlyExpenses;
    });

    return { totalBalance, balanceMonthly };
  };

  const renderCards = () => {
    if (selectedOption === 'expenses') {
      const { totalPending, totalPaid } = calculateExpenseTotals();
      return (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pendente:</Text>
            <Text style={[styles.cardValue, { color: '#c44c4e' }]}>
              R$ {totalPending.toFixed(2)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pago:</Text>
            <Text style={[styles.cardValue, { color: '#c44c4e' }]}>R$ {totalPaid.toFixed(2)}</Text>
          </View>
        </View>
      );
    }

    if (selectedOption === 'income') {
      const { totalPending, totalReceived } = calculateIncomeTotals();
      return (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pendente:</Text>
            <Text style={[styles.cardValue, { color: '#639e64' }]}>
              R$ {totalPending.toFixed(2)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Recebido:</Text>
            <Text style={[styles.cardValue, { color: '#639e64' }]}>
              R$ {totalReceived.toFixed(2)}
            </Text>
          </View>
        </View>
      );
    }

    if (selectedOption === 'transactions') {
      const isFutureMonth = currentMonth.isAfter(moment(), 'month');

      const { totalBalance, balanceMonthly } = isFutureMonth
        ? calculateProjectedBalance() // Usa a nova função para meses futuros
        : calculateTransactionTotals(); // Usa a lógica atual para meses passados e o mês atual

      const label1 = isFutureMonth
        ? 'Saldo Previsto'
        : currentMonth.isBefore(moment(), 'month')
          ? 'Final do Mês'
          : 'Saldo Atual';
      const label2 = 'Balanço Mensal';

      // Cores dinâmicas
      const balanceColor = totalBalance >= 0 ? '#639e64' : '#c44c4e';
      const monthlyColor = balanceMonthly >= 0 ? '#639e64' : '#c44c4e';

      return (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{label1}:</Text>
            <Text style={[styles.cardValue, { color: balanceColor }]}>
              R$ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{label2}:</Text>
            <Text style={[styles.cardValue, { color: monthlyColor }]}>
              R$ {balanceMonthly.toFixed(2)}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: style.container.backgroundColor }}
        data={[]} // A lista principal não tem dados
        keyExtractor={() => 'dummy'}
        renderItem={null}
        ListHeaderComponent={
          <ScreenContent>
            <View style={styles.containerTitle}>
              <BackButton onPress={back} />
              <TransactionDropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </View>

            <View style={styles.monthNavigator}>
              <IconButton
                icon="chevron-left"
                size={22}
                onPress={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}
                iconColor="#fff" // Cor baseada no tema
              />
              <Text style={styles.monthNavigatorText}>{currentMonth.format('MMMM YYYY')}</Text>
              <IconButton
                icon="chevron-right"
                size={22}
                onPress={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}
                iconColor="#fff" // Cor baseada no tema
              />
            </View>
          </ScreenContent>
        }
        ListFooterComponent={
          <Container
            rounded
            style={{
              flex: 1,
              minHeight: screenHeight * 0.8,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              overflow: 'hidden',
            }}>
            {/* Cards de totais */}
            {renderCards()}

            {/* Lista de transações */}
            {dataForFlatList.map((section) => (
              <View key={section.date}>
                <Text style={styles.sectionHeader}>{section.date}</Text>
                {section.transactions.map((transaction: Transaction) => (
                  <TouchableOpacity key={transaction.id}>
                    {renderTransaction({ item: transaction })}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </Container>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
  },
  toggleContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 3,
  },
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  monthNavigatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize', // Para formatar o nome do mês
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  transactionIcon: {
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  transactionCategory: {
    fontSize: 16,
    color: '#666',
  },
  transactionValueContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  transactionValue: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Ajuste conforme o tema
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
