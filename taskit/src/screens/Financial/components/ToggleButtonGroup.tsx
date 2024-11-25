import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ToggleButtonGroupProps {
  options: string[]; // Opções (ex: ["Despesas", "Receitas"])
  onChange: (selectedOption: string) => void; // Função chamada ao alternar
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState(options[0]); // Estado inicial

  const handlePress = (option: string) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option && styles.activeButton, // Botão ativo
            index === 0 ? styles.leftButton : {}, // Estilo do botão esquerdo
            index === options.length - 1 ? styles.rightButton : {}, // Estilo do botão direito
          ]}
          onPress={() => handlePress(option)}>
          <Text
            style={[
              styles.text,
              selected === option && styles.activeText, // Texto ativo
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
    borderRadius: 15, // Ajuste proporcional para bordas menores
    overflow: 'hidden',
    backgroundColor: '#e0e0e0', // Cor de fundo padrão
    alignSelf: 'center', // Centraliza o grupo
    width: 300, // Define a largura total do grupo
  },
  button: {
    flex: 1, // Remove isso para botões mais compactos
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6, // Reduz a altura
    backgroundColor: '#e0e0e0', // Fundo padrão do botão
  },
  activeButton: {
    backgroundColor: '#37618E', // Fundo do botão ativo
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
    fontSize: 18, // Reduz o tamanho do texto
    color: '#555', // Cor do texto padrão
  },
  activeText: {
    color: '#fff', // Cor do texto ativo
  },
});


export default ToggleButtonGroup;
