import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface SubtaskComponentProps {
  title: string; // Título da subtarefa
  subtitle: string; // Subtítulo da subtarefa
  priority: string; // Prioridade da subtarefa
  checked: boolean; // Estado da checkbox
  onToggle: () => void; // Função para alternar o estado da checkbox
  style?: ViewStyle; // Estilo opcional
  maxSubtitleLength?: number; // Limite de caracteres para o subtítulo
}

const SubtaskComponent: React.FC<SubtaskComponentProps> = ({
  title,
  subtitle,
  priority,
  checked,
  onToggle,
  style,
  maxSubtitleLength = 15, // Limite padrão de 15 caracteres
}) => {
  const displayText =
    subtitle.trim()
      ? subtitle.length > maxSubtitleLength
        ? `${subtitle.substring(0, maxSubtitleLength)}...`
        : subtitle
      : `Prioridade: ${priority}`;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{displayText}</Text>
          {subtitle.trim() && (
            <Text style={styles.priority}>
              {' '}| Prioridade: {priority}
            </Text>
          )}
        </View>
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
  subtitleContainer: {
    flexDirection: 'row', // Alinha o subtítulo e a prioridade na mesma linha
    alignItems: 'center',
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
  priority: {
    fontSize: 16,
    color: '#555', // Cor para destacar a prioridade
    marginLeft: 8, // Espaçamento entre o subtítulo e a prioridade
  },
});

export default SubtaskComponent;
