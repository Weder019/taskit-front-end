import React from 'react';
import { StyleSheet, View, ViewStyle, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

interface GlobalHeaderContainerProps {
  children: React.ReactNode; // Conteúdo que será renderizado dentro do header
  style?: ViewStyle; // Estilo customizável para o container
}

const GlobalHeaderContainer: React.FC<GlobalHeaderContainerProps> = ({ children, style }) => {
  const { colors } = useTheme(); // Tema para acessar cores globais

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.surface }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%', // Ocupa toda a largura da tela
    paddingVertical: 16, // Espaçamento interno vertical
    paddingHorizontal: 24, // Espaçamento interno horizontal
    borderBottomLeftRadius: 54, // Bordas arredondadas para design moderno
    borderBottomRightRadius: 54,
    elevation: 4, // Elevação para criar um efeito de sombra
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Posição da sombra
    shadowOpacity: 0.1, // Transparência da sombra
    shadowRadius: 6, // Difusão da sombra
  },
});

export default GlobalHeaderContainer;
