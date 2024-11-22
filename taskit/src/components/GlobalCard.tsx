import React from 'react';
import { StyleSheet, View, ViewStyle, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

interface GlobalCardProps {
  children: React.ReactNode; // Conteúdo do card
  style?: ViewStyle; // Estilo customizável para o card
}

const GlobalCard: React.FC<GlobalCardProps> = ({ children, style }) => {
  const { colors } = useTheme(); // Acessa o tema atual

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }, style]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, // Bordas arredondadas
    padding: 16, // Espaçamento interno
    shadowColor: '#000', // Sombra para destaque
    shadowOffset: { width: 0, height: 2 },
    width: '95%',
    maxHeight: '28%',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevação para Android
    marginVertical: 8, // Margem vertical para espaçamento entre cards
  },
  scrollContainer: {
    flexGrow: 1, // Garante que o conteúdo seja scrollável apenas quando necessário
  },
});

export default GlobalCard;
