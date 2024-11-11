import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <View style={styles.quantitySelector}>
      <TouchableOpacity onPress={decrement} style={styles.arrowButton}>
        <IconButton icon={'chevron-down'} size={24} />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={increment} style={styles.arrowButton}>
        <IconButton icon={'chevron-up'} size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {},
  arrowText: {
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 12,
  },
  icon: {},
});

export default QuantitySelector;
