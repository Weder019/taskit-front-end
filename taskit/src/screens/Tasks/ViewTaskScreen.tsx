import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import SubtaskComponent from './components/SubtaskComponent';

import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useUser } from '~/context/UserContext';
import { TaskStackParamList } from '~/navigation/task-navigator';
import { toggleSubTaskStatus, toggleTaskStatus } from '~/services/taskService';
import { useGlobalStyles } from '~/styles/globalStyles';
import { SubTask, Task } from '~/types';
import EditButton from './components/EditButton';

type ViewTaskNavigationProp = NavigationProp<TaskStackParamList, 'ViewTask'>;
type ViewTasRouteProp = RouteProp<TaskStackParamList, 'ViewTask'>;

export default function TaskDetails() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  const route = useRoute<ViewTasRouteProp>();
  const { task_id } = route.params;
  const navigation = useNavigation<ViewTaskNavigationProp>();

  //const task: Task | undefined = userData.tasks?.[0];
  const [task, setTask] = useState<Task>();
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  useEffect(() => {
    if (userData?.tasks?.length > 0) {
      // Filtra a conta com base no ID recebido pela rota
      const task = userData.tasks.find((acc: Task) => acc.id === task_id);
      if (task) {
        setTask(task); // Define a conta encontrada como selecionada
        setSubtasks(task.subTask);
      } else {
        console.warn('Conta não encontrada para o ID fornecido.');
      }
    }
  }, [userData, task_id]);

  const toggleSubtask = (index: number) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask, i) =>
        i === index ? { ...subtask, done: !subtask.done } : subtask
      )
    );
  };

  const back = () => {
    navigation.goBack();
  };
  const editScreen = () => {

  }

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

  const handleSave = async () => {
    if (!task || !user) {
      Alert.alert('Erro', 'Tarefa ou usuário não encontrados.');
      return;
    }

    try {
      // Filtra apenas as subtarefas que tiveram o status alterado
      const changedSubtasks = subtasks.filter((subtask) => {
        const original = task.subTask.find((t) => t.title === subtask.title);
        return original?.done !== subtask.done;
      });

      if (changedSubtasks.length > 0) {
        // Obtém os títulos das subtarefas alteradas
        const changedSubtaskTitles = changedSubtasks.map((subtask) => subtask.title);

        // Chama o serviço para alternar o status das subtarefas
        await toggleSubTaskStatus(task.id, changedSubtaskTitles);

        // Atualiza os dados do usuário
        await refreshUserData(user.uid);

        Alert.alert('Sucesso', 'Subtarefas salvas com sucesso!');
      } else {
        Alert.alert('Nenhuma alteração', 'Nenhuma subtarefa foi alterada.');
      }
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
      // Obtém os títulos das subtarefas que ainda não foram concluídas
      const incompleteSubtasks = subtasks
        .filter((subtask) => !subtask.done)
        .map((subtask) => subtask.title);

      if (incompleteSubtasks.length > 0) {
        // Marca todas as subtarefas como concluídas
        await toggleSubTaskStatus(task.id, incompleteSubtasks);
      }

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
          {task ? (
            <>
              <View style={styles.containerTitle}>
                <BackButton onPress={back} />
                <View style={{ flex: 1, alignItems: 'center', marginLeft: 50 }}>
                  <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
                    {task.title}
                  </Text>
                </View>
                <EditButton onPress={editScreen} size={35} />
              </View>

              <Container rounded style={styles.container}>
                {/* Informações da tarefa */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    Prioridade: <Text style={styles.data}>{getPriority(task.priority)}</Text>
                  </Text>

                  <Text style={styles.infoText}>
                    Prazo: <Text style={styles.data}>{task.data}</Text>
                  </Text>
                </View>

                <Text style={styles.description}>
                  Descrição da Tarefa:{'\n'}
                  <Text style={styles.data}>{task.description}</Text>
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
                      priority={getPriority(subtask.priority)}
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
            </>
          ) : null}
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
    minHeight: '88%',
    maxHeight: '88%',
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
    width: '57%',
  },
  data: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
