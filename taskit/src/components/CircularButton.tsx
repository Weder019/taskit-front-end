import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface CircularButtonProps {
  onPress: () => void; // Função chamada ao pressionar o botão
  iconName: string; // Nome do ícone
  size?: number; // Tamanho do botão (largura e altura)
  iconSize?: number; // Tamanho do ícone dentro do botão
  iconColor?: string; // Cor do ícone
  backgroundColor?: string; // Cor de fundo do botão
  style?: ViewStyle; // Estilo adicional para o botão
}

const CircularButton: React.FC<CircularButtonProps> = ({
  onPress,
  iconName,
  size = 48, // Tamanho padrão do botão (mesmo da imagem)
  iconSize = 24, // Tamanho padrão do ícone
  iconColor = '#FFFFFF', // Cor padrão do ícone
  backgroundColor = '#37618E', // Cor padrão do fundo
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2, // Circular
          backgroundColor,
        },
        style,
      ]}>
      <IconButton
        icon={iconName}
        size={iconSize}
        iconColor={iconColor}
        style={[styles.icon, { margin: 0 }]} // Remove margens extras
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Sombra para destaque
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default CircularButton;
