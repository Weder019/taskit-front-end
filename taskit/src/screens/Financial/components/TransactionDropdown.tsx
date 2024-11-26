import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Text, IconButton } from 'react-native-paper';

interface TransactionDropdownProps {
  selectedOption: 'expenses' | 'income' | 'transactions';
  setSelectedOption: (value: 'expenses' | 'income' | 'transactions') => void;
}

export const TransactionDropdown: React.FC<TransactionDropdownProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const options = [
    { label: 'Despesas', value: 'expenses' },
    { label: 'Receitas', value: 'income' },
    { label: 'Transações', value: 'transactions' },
  ];

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.anchor}>
            <Text style={styles.text}>
              {options.find((option) => option.value === selectedOption)?.label || 'Selecione'}
            </Text>
            <IconButton icon="chevron-down" size={24} style={styles.icon} iconColor="#FFFFFF" />
          </TouchableOpacity>
        }>
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              setSelectedOption(option.value as 'expenses' | 'income' | 'transactions');
              closeMenu();
            }}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  anchor: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Ajuste para o tema
  },
  icon: {
    margin: 0,
  },
});
