import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import TaskList from './TaskList';
import { useGlobalStyles } from '~/styles/globalStyles';
import { ScreenContent } from '~/components/ScreenContent';

export default function TaskDetails() {
  const Globalstyles = useGlobalStyles();

  // Estado das subtarefas
  const [subtasks, setSubtasks] = useState([
    { id: '1', title: 'Subtarefa 1', priority: 'ALTA', completed: true },
    { id: '2', title: 'Subtarefa 2', priority: 'MÉDIA', completed: false },
  ]);

  // Função para alternar o estado "completed" de uma subtarefa
  const toggleSubtask = (id: string) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
      )
    );
  };

  const back = () => {
    console.log('Voltar para a tela anterior');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScreenContent>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
              Título da Tarefa
            </Text>
          </View>

          <Container rounded style={styles.container}>
            {/* Informações da tarefa */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>PRIORIDADE:</Text>
              <Text style={styles.infoText}>PRAZO:</Text>
            </View>

            <Text style={styles.description}>DESCRIÇÃO DA TAREFA</Text>

            <View style={styles.divider} />

            {/* Subtarefas */}
            <Text style={styles.subtaskTitle}>SUBTAREFAS</Text>
            <TaskList subtasks={subtasks} onToggle={toggleSubtask} />

            {/* Botão de salvar */}
            <Button
              mode="contained"
              onPress={() => console.log('Tarefa salva')}
              style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
              Salvar
            </Button>
          </Container>
        </ScrollView>
      </ScreenContent>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerTitle: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    minHeight: 750,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  subtaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
