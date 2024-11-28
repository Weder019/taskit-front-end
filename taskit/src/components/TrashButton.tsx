import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface TrashButtonProps {
  onPress: () => void; // Função chamada ao pressionar o botão
  size?: number; // Tamanho do botão
  style?: ViewStyle; // Estilo personalizado para o botão
}

const TrashButton: React.FC<TrashButtonProps> = ({ onPress, size = 32, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <IconButton
        icon="trash-can-outline" // Ícone de lixeira do React Native Paper
        size={size}
        iconColor="#FFFFFF" // Cor branca
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Fundo transparente
    borderRadius: 50, // Torna o botão circular
  },
  icon: {
    margin: 0, // Remove margens extras
  },
});

export default TrashButton;
