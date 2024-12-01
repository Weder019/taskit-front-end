import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface SubtaskComponentProps {
  title: string; // Título da subtarefa
  subtitle: string; // Subtítulo da subtarefa
  checked: boolean; // Estado da checkbox
  onToggle: () => void; // Função para alternar o estado da checkbox
  style?: ViewStyle; // Estilo opcional
}

const SubtaskComponent: React.FC<SubtaskComponentProps> = ({
  title,
  subtitle,
  checked,
  onToggle,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onToggle}
        color="#37618E" // Cor da checkbox quando marcada
        uncheckedColor="#ccc" // Cor da checkbox quando desmarcada
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1, // Ocupa o máximo de espaço disponível
    marginRight: 10, // Espaçamento entre o texto e a checkbox
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});

export default SubtaskComponent;
