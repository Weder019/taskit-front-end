import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';

import { useGlobalStyles } from '~/styles/globalStyles';
import { ScreenContent } from '~/components/ScreenContent';
import { useUser } from '~/context/UserContext';
import SubtaskComponent from './components/SubtaskComponent';
import { SubTask, Task } from '~/types';
import { toggleSubTaskStatus, toggleTaskStatus } from '~/services/taskService';

export default function TaskDetails() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();

  const task: Task | undefined = userData.tasks?.[0];

  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  useEffect(() => {
    // Carrega as subtarefas da tarefa
    if (task?.subTask) {
      setSubtasks(task.subTask);
    }
  }, [task]);

  const toggleSubtask = (index: number) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask, i) =>
        i === index ? { ...subtask, done: !subtask.done } : subtask
      )
    );
  };
  

  const back = () => {
    console.log('Voltar para a tela anterior');
  };

  const getPriority = (index: number) => {
    switch (index) {
      case 0:
        return 'Baixa';
      case 1:
        return 'Média';
      default:
        return 'Alta';
    }
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-'); // Divide a string da data pelo separador '-'
    return `${day}/${month}/${year}`; // Retorna a data formatada como "DD/MM/YYYY"
  };


  const handleSave = async () => {
    if (!task || !user) {
      Alert.alert('Erro', 'Tarefa ou usuário não encontrados.');
      return;
    }

    try {
      // Atualizar todas as subtarefas alteradas no banco
      await Promise.all(
        subtasks.map(async (subtask) => {
          const original = task.subTask.find((t) => t.title === subtask.title);
          if (original?.done !== subtask.done) {
            // Chama o serviço para alternar o status da subtarefa
            await toggleSubTaskStatus(task.id, subtask.title);
          }
        })
      );

      // Atualiza os dados do usuário
      await refreshUserData(user.uid);
      Alert.alert('Sucesso', 'Subtarefas salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar subtarefas:', error);
      Alert.alert('Erro', 'Não foi possível salvar as subtarefas.');
    }
  };
  const handleCompleteTask = async () => {
    if (!task || !user) {
      Alert.alert('Erro', 'Tarefa ou usuário não encontrados.');
      return;
    }

    try {
      // Garantir que todas as subtarefas estejam marcadas como concluídas
      await Promise.all(
        subtasks.map(async (subtask) => {
          if (!subtask.done) {
            await toggleSubTaskStatus(task.id, subtask.title);
          }
        })
      );

      // Alternar o status da tarefa principal
      await toggleTaskStatus(task.id);

      // Atualiza os dados do usuário
      await refreshUserData(user.uid);
      Alert.alert('Sucesso', 'Tarefa marcada como concluída!');
    } catch (error) {
      console.error('Erro ao completar a tarefa:', error);
      Alert.alert('Erro', 'Não foi possível completar a tarefa.');
    }
  };
  const allSubtasksCompleted = subtasks.every((subtask) => subtask.done);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
              {userData.tasks[0].title}
            </Text>
          </View>

          <Container rounded style={styles.container}>
            {/* Informações da tarefa */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                Prioridade:{' '}
                <Text style={styles.data}>{getPriority(userData.tasks[0].priority)}</Text>
              </Text>

              <Text style={styles.infoText}>
                Prazo: <Text style={styles.data}>{formatDate(userData.tasks[0].data)}</Text>
              </Text>
            </View>

            <Text style={styles.description}>
              Descrição da Tarefa:{'\n'}
              <Text style={styles.data}>{userData.tasks[0].description}</Text>
            </Text>

            <View style={styles.divider} />

            {/* Subtarefas */}
            <Text style={styles.subtaskTitle}>SUBTAREFAS</Text>
            <ScrollView>
              {subtasks.map((subtask, index) => (
                <SubtaskComponent
                  key={index}
                  title={subtask.title}
                  subtitle={subtask.description}
                  checked={subtask.done}
                  onToggle={() => toggleSubtask(index)}
                />
              ))}
            </ScrollView>
            {/* Botões de Ação */}
            <Button
              mode="contained"
              onPress={handleSave}
              style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
              Salvar
            </Button>
            {allSubtasksCompleted && (
              <Button
                mode="contained"
                onPress={handleCompleteTask}
                style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
                Completar Tarefa
              </Button>
            )}
          </Container>
        </ScreenContent>
      </ScrollView>
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center', // Centraliza os itens ao longo do eixo principal
    position: 'relative',
  },
  container: {
    minHeight: "88%",
  },
  title: {
    fontSize: 28,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
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
    width:"57%"
  },
  data: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
