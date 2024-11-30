import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import GlobalCard from '~/components/GlobalCard';
import { Expense } from '~/types/models';

interface CategoryData {
  name: string; // Nome da categoria
  value: number; // Valor da despesa
  color: string; // Cor para o gráfico
}

interface ExpensesByCategoryCardProps {
  title: string; // Título do card
  currentMonthExpenses: Expense[]; // Despesas do mês atual
}

const screenWidth = Dimensions.get('window').width;

// Função para gerar cores automaticamente
const generateColor = (index: number): string => {
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FFCD56',
    '#C9CBCF',
    '#A8B3C5',
    '#8DD3C7',
  ];
  return colors[index % colors.length];
};

const ExpensesByCategoryCard: React.FC<ExpensesByCategoryCardProps> = ({
  title,
  currentMonthExpenses,
}) => {
  // Agrupar despesas por categoria e somar os valores
  const dataByCategory = currentMonthExpenses.reduce(
    (acc, expense) => {
      const category = acc[expense.category] || { name: expense.category, value: 0 };
      category.value += expense.value;
      acc[expense.category] = category;
      return acc;
    },
    {} as Record<string, { name: string; value: number }>
  );

  // Transformar dados para o formato do gráfico
  const data = Object.values(dataByCategory).map((item, index) => ({
    name: item.name,
    value: item.value,
    color: generateColor(index),
  }));

  // Transformar dados para o formato do PieChart
  const chartData = data.map((item) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  return (
    <GlobalCard style={styles.card}>
      {/* Gráfico e Legenda */}
      <View style={styles.content}>
        {/* Gráfico Circular */}
        <PieChart
          data={chartData}
          width={screenWidth * 0.4} // Largura do gráfico
          height={100} // Altura do gráfico
          chartConfig={{
            color: () => `rgba(0, 0, 0, 1)`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={false}
        />

        {/* Legenda */}
        <View style={styles.legend}>
          {data.map((category, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: category.color }]} />
              <Text variant="bodyMedium" style={styles.legendText}>
                {category.name}
              </Text>
              <Text variant="bodyMedium" style={styles.legendValue}>
                R$ {category.value.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </GlobalCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend: {
    marginLeft: 16,
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontFamily: 'Outfit-Regular',
    color: '#000',
  },
  legendValue: {
    fontFamily: 'Outfit-Regular',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ExpensesByCategoryCard;
