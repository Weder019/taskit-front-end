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
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const screenHeight = Dimensions.get('window').height;

const userData = {
  id: 'TT0oxDgcrRG5IJR8GDpRvqjXZ9HZ',
  name: 'Fernando',
  email: 'fernando@teste.com',
  cell: '19974164543',
  categories: [],
  tasks: [],
  accounts: [
    {
      id: '28CwZ2VMHyeP490pUeNh',
      acc_name: 'Carteira Nubank',
      acc_type: 'Conta Corrente',
      bank: 'nubank',
      expenses: [
        { exp_name: 'Placa mãe', category: 'Eletrônicos', value: 704, date: '2024-11-20', paid: false, id: '1' },
        { exp_name: 'Aluguel', category: 'Casa', value: 500, date: '2024-09-10', paid: false, id: '2' },
        { exp_name: 'Camisetas', category: 'Vestuário', value: 600, date: '2024-11-10', paid: true, id: '3' },
        { exp_name: 'Supermercado', category: 'Supermercado', value: 250, date: '2024-11-05', paid: true, id: '4' },
        { exp_name: 'Netflix', category: 'Lazer', value: 40, date: '2024-11-01', paid: true, id: '5' },
        { exp_name: 'Restaurante', category: 'Restaurantes', value: 180, date: '2024-11-18', paid: false, id: '6' },
        { exp_name: 'Internet', category: 'Serviços', value: 120, date: '2024-11-15', paid: true, id: '7' },
        { exp_name: 'Uber', category: 'Transporte', value: 45, date: '2024-11-22', paid: false, id: '8' },
        { exp_name: 'Academia', category: 'Saúde', value: 99, date: '2024-11-07', paid: true, id: '9' },
        { exp_name: 'Cafeteria', category: 'Lazer', value: 20, date: '2024-11-03', paid: true, id: '10' },
        { exp_name: 'Conta de Luz', category: 'Casa', value: 180, date: '2024-11-25', paid: false, id: '11' },
      ],
      incomes: [
        { inc_name: 'Salário', category: 'Salário', value: 5000, date: '2024-11-05', paid: true, id: '21' },
        { inc_name: 'Freelance', category: 'Outros', value: 700, date: '2024-11-08', paid: false, id: '22' },
        { inc_name: 'Aluguel de Imóvel', category: 'Investimentos', value: 1200, date: '2024-11-15', paid: true, id: '23' },
        { inc_name: 'Pix de Amigo', category: 'Outros', value: 50, date: '2024-11-19', paid: true, id: '24' },
        { inc_name: 'Cashback', category: 'Outros', value: 30, date: '2024-11-11', paid: true, id: '25' },
        { inc_name: 'Venda Online', category: 'Outros', value: 500, date: '2024-11-20', paid: false, id: '26' },
        { inc_name: 'Prêmio', category: 'Prêmio', value: 100, date: '2024-11-03', paid: true, id: '27' },
      ],
      balance: 6901,
    },
    {
      id: 'YoaY1noPZFtZ6hIDEWwK',
      acc_name: 'Conta XP',
      acc_type: 'Investimento',
      bank: 'xp',
      expenses: [
        {
          exp_name: 'Compra de Ethereum',
          category: 'Outros',
          value: 200,
          date: '2024-11-25',
          fixed: false,
          paid: true,
          id: 'b9RXsRcenU3X0z7QR8WE',
        },
      ],
      incomes: [
        {
          inc_name: 'Dividendos',
          category: 'Investimentos',
          value: 350,
          date: '2024-10-03',
          fixed: false,
          paid: true,
          id: 'Sb5PYXIoTWh7M3VF7TOt',
        },
      ],
      balance: 1800,
    },
  ],
};

export default function TransactionsScreen() {
  const style = useGlobalStyles();
  const [selectedOption, setSelectedOption] = useState<'expenses' | 'income' | 'transactions'>(
    'expenses'
  );
  const [currentMonth, setCurrentMonth] = useState(moment());

  // Obter transações conforme o tipo selecionado
  const transactions = userData.accounts.flatMap((account) => {
    if (selectedOption === 'expenses') {
      return account.expenses
        .filter((exp) => moment(exp.date).isSame(currentMonth, 'month'))
        .map((exp) => ({ ...exp, acc_name: account.acc_name }));
    }
    if (selectedOption === 'income') {
      return account.incomes
        .filter((inc) => moment(inc.date).isSame(currentMonth, 'month'))
        .map((inc) => ({ ...inc, acc_name: account.acc_name }));
    }
    // Caso "transações", combina despesas e receitas filtradas por data
    return [...account.expenses, ...account.incomes]
      .filter((tran) => moment(tran.date).isSame(currentMonth, 'month'))
      .map((tran) => ({ ...tran, acc_name: account.acc_name }));
  });

  const sortedTransactions = transactions.sort((a, b) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);
    return dateB.diff(dateA); // Decrescente
  });

  const groupedTransactions = sortedTransactions.reduce(
    (acc, transaction) => {
      const formattedDate = moment(transaction.date).format('dddd, DD');
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(transaction);
      return acc;
    },
    {} as Record<string, typeof sortedTransactions>
  );

  const getCategoryIcon = (transaction: {
    category: string;
    exp_name?: string;
    inc_name?: string;
  }) => {
    // Determina se é uma despesa ou receita com base na presença de "exp_name" ou "inc_name"
    const isExpense = 'exp_name' in transaction;

    // Seleciona o conjunto de categorias correto
    const categories = isExpense ? expenseCategories : incomeCategories;

    // Busca o ícone com base na categoria
    const categoryItem = categories.find((item) => item.name === transaction.category);
    return categoryItem ? categoryItem.icon : 'dots-horizontal'; // Ícone padrão caso não encontre
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
        <Text style={[styles.transactionValue, { color: 'exp_name' in item ? 'red' : 'green' }]}>
          R$ {item.value.toFixed(2)}
        </Text>
        <IconButton
          icon={item.paid ? 'check-circle' : 'pin-off'}
          size={18}
          iconColor={item.paid ? 'green' : 'red'}
        />
      </View>
    </View>
  );

  const renderSection = ({
    item,
  }: {
    item: { date: string; transactions: typeof sortedTransactions };
  }) => (
    <View>
      <Text style={styles.sectionHeader}>{item.date}</Text>
      {item.transactions.map((transaction) => (
        <TouchableOpacity key={transaction.id}>
          {renderTransaction({ item: transaction })}
        </TouchableOpacity>
      ))}
    </View>
  );

  const dataForFlatList = Object.keys(groupedTransactions).map((date) => ({
    date,
    transactions: groupedTransactions[date],
  }));

  const back = () => {
    console.log('back');
  };

  const calculateExpenseTotals = () => {
    const totalPending = transactions
      .filter((t) => 'exp_name' in t && !t.paid)
      .reduce((sum, t) => sum + t.value, 0);

    const totalPaid = transactions
      .filter((t) => 'exp_name' in t && t.paid)
      .reduce((sum, t) => sum + t.value, 0);

    return { totalPending, totalPaid };
  };

  const calculateIncomeTotals = () => {
    const totalPending = transactions
      .filter((t) => 'inc_name' in t && !t.paid)
      .reduce((sum, t) => sum + t.value, 0);

    const totalReceived = transactions
      .filter((t) => 'inc_name' in t && t.paid)
      .reduce((sum, t) => sum + t.value, 0);

    return { totalPending, totalReceived };
  };

  const calculateTransactionTotals = () => {
    const totalBalance = userData.accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const balanceMonthly = transactions.reduce((sum, t) => sum + t.value, 0);

    if (currentMonth.isBefore(moment(), 'month')) {
      // Mês Passado
      const endOfMonth =
        transactions.filter((t) => t.paid).reduce((sum, t) => sum + t.value, 0) + totalBalance;

      return { totalBalance: endOfMonth, balanceMonthly };
    } else if (currentMonth.isAfter(moment(), 'month')) {
      // Mês Futuro
      const forecastedBalance =
        totalBalance + transactions.reduce((sum, t) => (t.paid ? 0 : sum + t.value), 0);

      return { totalBalance: forecastedBalance, balanceMonthly };
    } else {
      // Mês Atual
      return { totalBalance, balanceMonthly };
    }
  };

  const renderCards = () => {
    if (selectedOption === 'expenses') {
      const { totalPending, totalPaid } = calculateExpenseTotals();
      return (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pendente:</Text>
            <Text style={styles.cardValue}>R$ {totalPending.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pago:</Text>
            <Text style={styles.cardValue}>R$ {totalPaid.toFixed(2)}</Text>
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
            <Text style={styles.cardValue}>R$ {totalPending.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Recebido:</Text>
            <Text style={styles.cardValue}>R$ {totalReceived.toFixed(2)}</Text>
          </View>
        </View>
      );
    }

    if (selectedOption === 'transactions') {
      const { totalBalance, balanceMonthly } = calculateTransactionTotals();
      const label1 = currentMonth.isBefore(moment(), 'month')
        ? 'Final do Mês'
        : currentMonth.isAfter(moment(), 'month')
          ? 'Saldo Previsto'
          : 'Saldo Atual';
      const label2 = 'Balanço Mensal';
      return (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{label1}:</Text>
            <Text style={styles.cardValue}>R$ {totalBalance.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{label2}:</Text>
            <Text style={styles.cardValue}>R$ {balanceMonthly.toFixed(2)}</Text>
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
              <Text variant="headlineMedium" style={[style.title, styles.title]}>
                Transações
              </Text>
            </View>
            <View style={styles.toggleContainer}>
              <TransactionDropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </View>
            <View style={styles.monthNavigator}>
              <IconButton
                icon="chevron-left"
                size={24}
                onPress={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}
                iconColor="#fff" // Cor baseada no tema
              />
              <Text style={styles.monthNavigatorText}>{currentMonth.format('MMMM YYYY')}</Text>
              <IconButton
                icon="chevron-right"
                size={24}
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
              minHeight: screenHeight * 0.75,
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
                {section.transactions.map((transaction) => (
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
    marginBottom: 16,
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
