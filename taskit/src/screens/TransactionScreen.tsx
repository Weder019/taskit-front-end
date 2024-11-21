import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Appbar, IconButton, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useGlobalStyles } from '~/styles/globalStyles';

const transactions: {
  [key: string]: {
    id: string;
    date: string;
    description: string;
    category: string;
    account: string;
    amount: string;
  }[];
} = {
  Outubro: [
    {
      id: '1',
      date: 'Terça, 08',
      description: 'Aluguel',
      category: 'Casa',
      account: 'Conta corrente',
      amount: 'R$ 550,00',
    },
    {
      id: '2',
      date: 'Segunda, 07',
      description: 'Sushi',
      category: 'Restaurante',
      account: 'Conta corrente',
      amount: 'R$ 180,00',
    },
    {
      id: '3',
      date: 'Quinta, 03',
      description: 'Aluguel',
      category: 'Casa',
      account: 'Conta corrente',
      amount: 'R$ 180,00',
    },
  ],
  Setembro: [
    {
      id: '4',
      date: 'Sexta, 29',
      description: 'Supermercado',
      category: 'Compras',
      account: 'Cartão de crédito',
      amount: 'R$ 250,00',
    },
  ],
};
export default function TransactionsScreen() {
  const [monthIndex, setMonthIndex] = useState(9);
  const [isExpense, setIsExpense] = useState(true); // Novo estado para alternar entre despesas e receitas
  const style = useGlobalStyles();
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const handleNextMonth = () => {
    setMonthIndex((prevIndex) => (prevIndex + 1) % 12);
  };

  const handlePreviousMonth = () => {
    setMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
  };

  const currentMonth = monthNames[monthIndex];
  const currentTransactions = transactions[currentMonth] || [];

  const back = () => {
    console.log('back');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text variant="headlineMedium" style={[style.title, styles.title]}>
              Transações
            </Text>
          </View>
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={() => setIsExpense(!isExpense)} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleButtonText}>{isExpense ? 'Despesas' : 'Receitas'}</Text>
                <IconButton icon={'arrow-down'} iconColor="#fff" size={24} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
          <Container rounded>
            <View style={styles.monthSelector}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.arrow}>{'<'}</Text>
              </TouchableOpacity>
              <Text style={styles.monthText}>{currentMonth}</Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.header}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalTitle}>Total pendente:</Text>
                <Text style={styles.totalValue}>R$32,00</Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.totalTitle}>Total pago:</Text>
                <Text style={styles.totalValue}>R$162,00</Text>
              </View>
            </View>

            <FlatList
              style={styles.flatlist}
              data={currentTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.transaction}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.details}>
                      {item.category} | {item.account}
                    </Text>
                  </View>
                  <Text style={styles.amount}>{item.amount}</Text>
                </View>
              )}
            />
          </Container>
        </ScreenContent>
      </ScrollView>
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
    marginLeft: 20,
    marginBottom: 3,
  },
  toggleButton: {
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row', // Alinha os blocos lado a lado
    justifyContent: 'space-between', // Espaça os blocos nas extremidades
    padding: 10,
    marginHorizontal: 20,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transaction: {
    flexDirection: 'row', // Alinha o texto e o valor na mesma linha
    justifyContent: 'space-between', // Coloca o valor à direita
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  details: {},
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  flatlist: {
    marginBottom: 250,
  },
  icon: {
    color: '#fff',
    marginRight: 4,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    flexDirection: 'column',
  },
  totalContainer: {
    alignItems: 'center', // Centraliza o texto dentro de cada bloco
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4, // Espaço entre o título e o valor
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
