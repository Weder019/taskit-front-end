import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface EditButtonProps {
  onPress?: () => void; // Função chamada ao pressionar o botão
  size?: number; // Tamanho do botão
  style?: ViewStyle; // Estilo personalizado para o botão
  iconColor?: string; // Cor do ícone (padrão: #FFFFFF)
}

const EditButton: React.FC<EditButtonProps> = ({
  onPress,
  size = 30,
  style,
  iconColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <IconButton
        icon="pencil" // Ícone de lixeira do React Native Paper
        size={size}
        iconColor={iconColor} // Cor branca
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
    alignSelf: 'flex-start',
  },
  icon: {
    margin: 5, // Remove margens extras
  },
});

export default EditButton;
