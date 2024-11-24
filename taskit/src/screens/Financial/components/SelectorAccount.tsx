import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {Text} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SelectorAccountProps {
  label?: string; // Texto que descreve o componente
  value: string; // Valor atual selecionado
  onPress: () => void; // Função chamada ao pressionar o componente
  onChange?: (newValue: string) => void; // Função opcional para atualizar o valor selecionado
  style?: ViewStyle;
}

const SelectorAccount: React.FC<SelectorAccountProps> = ({
  label,
  value,
  onPress,
  onChange,
  style
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
        if (onChange) {
          // Simulação de uma mudança (se necessário)
          onChange('Novo Valor');
        }
      }}>
      <View style={[styles.labelContainer, style]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={20}
          color="#FFF"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    
    borderRadius: 8,
    marginBottom: 10,
  },
  labelContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 23,
    fontWeight: 'bold',
    color:"#FFF",
    marginRight: 5,
  },
  icon: {
    marginLeft: 5,
  },
});

export default SelectorAccount;
