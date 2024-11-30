import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, Divider } from 'react-native-paper';

import GlobalCard from '~/components/GlobalCard';
import { Expense, Income } from '~/types'; // Tipos para despesas e receitas

interface PendingCardProps {
  expenses: Expense[]; // Lista de despesas
  incomes: Income[]; // Lista de receitas
}

const PendingCard: React.FC<PendingCardProps> = ({ expenses, incomes }) => {
  // Calculando o total pendente de despesas (paid == false)
  const totalPendingExpenses = expenses.reduce(
    (sum, expense) => (expense.paid === false ? sum + expense.value : sum),
    0
  );

  // Calculando o total pendente de receitas (paid == false)
  const totalPendingIncomes = incomes.reduce(
    (sum, income) => (income.paid === false ? sum + income.value : sum),
    0
  );

  // Total pendente combinado (despesas + receitas)
  const totalPending = totalPendingIncomes - totalPendingExpenses;

  return (
    <GlobalCard style={{ marginHorizontal: 20 }}>
      {/* Total Fixo no Rodapé */}
      <View style={styles.totalContainer}>
        <Text variant="bodyLarge" style={styles.totalLabel}>
          Total Pendente
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.totalAmount, totalPending >= 0 ? styles.positive : styles.negative]}>
          R$ {totalPending.toFixed(2)}
        </Text>
      </View>

      {/* Linha divisória */}
      <Divider style={styles.divider} />

      {/* Exibindo Total Pendentes de Despesas */}
      <View style={styles.sectionContainer}>
        <Text variant="bodyMedium" style={styles.sectionLabel}>
          Despesas Pendentes
        </Text>
        <Text variant="bodyLarge" style={[styles.amountText, styles.negative]}>
          R$ {totalPendingExpenses.toFixed(2)}
        </Text>
      </View>

      {/* Exibindo Total Pendentes de Receitas */}
      <View style={styles.sectionContainer}>
        <Text variant="bodyMedium" style={styles.sectionLabel}>
          Receitas Pendentes
        </Text>
        <Text variant="bodyLarge" style={[styles.amountText, styles.positive]}>
          R$ {totalPendingIncomes.toFixed(2)}
        </Text>
      </View>
    </GlobalCard>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  totalLabel: {
    fontFamily: 'Outfit-Regular',
    color: '#000',
  },
  totalAmount: {
    fontFamily: 'Outfit-Regular',
    fontWeight: 'bold', // Destaque para o total
  },
  sectionContainer: {
    marginVertical: 8,
  },
  sectionLabel: {
    fontFamily: 'Outfit-Regular',
    color: '#000',
  },
  amountText: {
    fontFamily: 'Outfit-Regular',
    fontWeight: 'bold',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  divider: {
    marginVertical: 8, // Espaçamento entre a lista e o total
  },
});

export default PendingCard;
