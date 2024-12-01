import { NavigationProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Checkbox, IconButton, useTheme } from 'react-native-paper';

import GlobalCard from '~/components/GlobalCard';
import { TaskStackParamList } from '~/navigation/task-navigator';
import { Task } from '~/types';

type TaskHomeScreenNavigateprop = NavigationProp<TaskStackParamList, 'TaskHome'>;

interface TaskCardProps {
  task: Task;
  navigation: TaskHomeScreenNavigateprop;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, navigation }) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleNavigateToViewTask = (taskId: string) => {
    console.log(taskId);
    navigation.navigate('ViewTask', { task_id: taskId });
  };

  return (
    <GlobalCard style={styles.card}>
      {/* Cabeçalho com Título, Checkbox e Botão de Expansão */}
      <View style={styles.header}>
        <Checkbox
          status={task.done ? 'checked' : 'unchecked'}
          onPress={() => {
            handleNavigateToViewTask(task.id);
          }}
          color={colors.primary}
        />
        <Text variant="titleLarge" style={styles.title}>
          {task.title + ' | Dia: ' + moment(task.data).format('DD')}
        </Text>
        <IconButton
          icon={expanded ? 'chevron-up' : 'chevron-down'}
          onPress={() => setExpanded(!expanded)}
          size={20}
          iconColor={colors.primary}
        />
      </View>

      {/* Detalhes exibidos apenas quando expandido */}
      {expanded && (
        <>
          {/* Descrição */}
          <Text variant="bodyMedium" style={styles.description}>
            {task.description}
          </Text>

          {/* Lista de Subtarefas */}
          {task.subTask && task.subTask.length > 0 && (
            <View style={styles.subtaskContainer}>
              <Text variant="titleMedium" style={styles.subtaskTitle}>
                Subtarefas
              </Text>
              <ScrollView
                style={styles.subtaskScroll}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                {task.subTask.map((subtask, index) => (
                  <View key={index} style={styles.subtaskItem}>
                    <Checkbox
                      status={subtask.done ? 'checked' : 'unchecked'}
                      onPress={() => {
                        // Lógica para alterar o status da subtarefa
                      }}
                      color={colors.primary}
                    />
                    <Text
                      variant="bodySmall"
                      style={[styles.subtaskText, subtask.done && styles.subtaskDone]}>
                      {subtask.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      )}
    </GlobalCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',
  },
  description: {
    color: '#666',
    marginVertical: 8,
    fontFamily: 'Outfit-Regular',
  },
  subtaskContainer: {
    marginTop: 8,
  },
  subtaskTitle: {
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',
  },
  subtaskScroll: {
    maxHeight: 80,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtaskText: {
    marginLeft: 8,
    fontFamily: 'Outfit-Regular',
  },
  subtaskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default TaskCard;
