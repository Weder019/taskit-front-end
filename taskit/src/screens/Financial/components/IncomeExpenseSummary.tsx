import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Certifique-se de que esta biblioteca está instalada

interface IncomeExpenseSummaryProps {
  income: number; // Valor de receitas
  expense: number; // Valor de despesas
}

const IncomeExpenseSummary: React.FC<IncomeExpenseSummaryProps> = ({ income, expense }) => {
  return (
    <View style={styles.container}>
      {/* Receita */}
      <View style={styles.item}>
        <View style={[styles.iconBackground, { backgroundColor: '#43D272' }]}>
          <MaterialCommunityIcons name="arrow-up-bold" size={24} color="#1C1B1F" />
        </View>
        <Text variant="bodyMedium" style={styles.incomeText}>
          Receitas
        </Text>
        <Text variant="bodyLarge" style={styles.incomeValue}>
          R$ {income.toFixed(2)}
        </Text>
      </View>

      {/* Espaçamento entre receitas e despesas */}
      <View style={styles.spacer} />

      {/* Despesa */}
      <View style={styles.item}>
        <View style={[styles.iconBackground, { backgroundColor: '#EC4C4C' }]}>
          <MaterialCommunityIcons name="arrow-down-bold" size={24} color="#1C1B1F" />
        </View>
        <Text variant="bodyMedium" style={styles.expenseText}>
          Despesas
        </Text>
        <Text variant="bodyLarge" style={styles.expenseValue}>
          R$ {expense.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  item: {
    alignItems: 'center',
    flex: 1, // Garante que receitas e despesas ocupem espaço proporcional
  },
  iconBackground: {
    width: 50, // Largura da bolinha
    height: 50, // Altura da bolinha
    borderRadius: 25, // Torna a View circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Espaço entre o ícone e o texto
  },
  incomeText: {
    color: '#3F4652',
    fontFamily: 'Outfit-Regular',
    marginBottom: 2,
  },
  incomeValue: {
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',
    color: '#43D272',
  },
  expenseText: {
    color: '#3F4652',
    marginBottom: 2,
  },
  expenseValue: {
    fontWeight: 'bold',
    color: '#EC4C4C',
  },
  spacer: {
    width: 16, // Espaçamento entre receitas e despesas
  },
});

export default IncomeExpenseSummary;
