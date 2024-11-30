import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ToggleButtonGroupProps<T> {
  options: T[]; // Opções genéricas
  onChange: (selectedOption: T) => void; // Função chamada ao alternar
  value: T; // Valor atual selecionado
}

const ToggleButtonGroup = <T extends string>({
  options,
  onChange,
  value,
}: ToggleButtonGroupProps<T>) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            value === option && styles.activeButton, // Botão ativo
            index === 0 ? styles.leftButton : {}, // Estilo do botão esquerdo
            index === options.length - 1 ? styles.rightButton : {}, // Estilo do botão direito
          ]}
          onPress={() => onChange(option)}>
          <Text
            style={[
              styles.text,
              value === option && styles.activeText, // Texto ativo
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    width: 300,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#37618E',
  },
  leftButton: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rightButton: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
  activeText: {
    color: '#fff',
  },
});

export default ToggleButtonGroup;
