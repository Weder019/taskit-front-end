import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

interface BalanceSummaryProps {
  balance: number; // Saldo atual
  onToggleVisibility: () => void; // Função para alternar a visibilidade do saldo
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ balance, onToggleVisibility }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    onToggleVisibility();
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.label}>
        Saldo em contas
      </Text>
      <View style={styles.row}>
        <Text variant="headlineLarge" style={styles.balance}>
          {isVisible ? `R$ ${balance.toFixed(2)}` : '••••'}
        </Text>
        <IconButton
          icon={isVisible ? 'eye' : 'eye-off'}
          size={24}
          onPress={handleToggleVisibility}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    color: '#3F4652',
    fontWeight: '700',
    fontFamily: 'Outfit-Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    marginRight: 8,
    fontWeight: '800',
    fontFamily: 'Outfit-Regular',
  },
});

export default BalanceSummary;
