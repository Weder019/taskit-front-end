import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Text, IconButton } from 'react-native-paper';

interface MonthSelectorProps {
  selectedMonth: string; // Mês atual selecionado
  onChangeMonth: (month: string) => void; // Função para alterar o mês
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onChangeMonth }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']; // Exemplo

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.anchor}>
            <Text variant="titleMedium" style={styles.text}>
              {selectedMonth}
            </Text>
            <IconButton icon="chevron-down" size={24} onPress={openMenu} />
          </View>
        }>
        {months.map((month) => (
          <Menu.Item
            key={month}
            onPress={() => {
              onChangeMonth(month);
              closeMenu();
            }}
            title={month}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 4,
  },
  anchor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Outfit-Regular',
  },
});

export default MonthSelector;
