import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';

import TaskListGroupedByMonth from './components/TaskListGroupedByMonth';
import ExpandableFloatingButton from '../Financial/components/ExpandableFloatingButton';

import { ScreenContent } from '~/components/ScreenContent';
import { useUser } from '~/context/UserContext';
import { TaskStackParamList } from '~/navigation/task-navigator';
import { Task } from '~/types';

type TaskHomeScreenNavigateprop = NavigationProp<TaskStackParamList, 'TaskHome'>;

const task = [
  {
    title: 'Task 1',
    description: 'Description 1',
    done: false,
    date: '2024-11-01',
    subtasks: [
      { title: 'Subtarefa 1', done: true },
      { title: 'Subtarefa 2', done: false },
      { title: 'Subtarefa 1', done: true },
      { title: 'Subtarefa 2', done: false },
      { title: 'Subtarefa 1', done: true },
      { title: 'Subtarefa 2', done: false },
    ],
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    done: true,
    date: '2024-11-15',
  },
  {
    title: 'Task 3',
    description: 'Description 3',
    done: false,
    date: '2024-12-02',
  },
  {
    title: 'Task 1',
    description: 'Description 1',
    done: false,
    date: '2024-11-01',
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    done: true,
    date: '2024-11-15',
  },
  {
    title: 'Task 3',
    description: 'Description 3',
    done: false,
    date: '2024-12-02',
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    done: true,
    date: '2024-11-15',
  },
  {
    title: 'Task 3',
    description: 'Description 3',
    done: false,
    date: '2024-12-02',
  },
  {
    title: 'Task 1',
    description: 'Description 1',
    done: false,
    date: '2024-11-01',
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    done: true,
    date: '2024-11-15',
  },
  {
    title: 'Task 3',
    description: 'Description 3',
    done: false,
    date: '2024-12-02',
  },
];

export default function TaskHome() {
  const { user, userData, refreshUserData } = useUser();
  const navigation = useNavigation<TaskHomeScreenNavigateprop>();
  const [tasks, setTasks] = useState<Task[] | null>();

  useEffect(() => {
    if (userData?.tasks) {
      setTasks(userData.tasks);
    }
  }, [userData]);

  const handleNavigateToNewTask = () => {
    navigation.navigate('AddTask');
  };

  const buttons = [
    {
      icon: 'trending-up',
      label: 'Receita',
      onPress: () => handleNavigateToNewTask(),
    },
  ];

  return (
    <ScreenContent style={{ justifyContent: 'flex-start' }}>
      {tasks ? (
        <>
          <Text variant="bodyLarge" style={styles.title}>
            Minhas Tarefas:
          </Text>
          <TaskListGroupedByMonth tasks={tasks} navigate={navigation} />
        </>
      ) : null}
      <View style={styles.container}>
        <ExpandableFloatingButton buttons={buttons} />
      </View>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Fixa o botão na tela
    bottom: 0, // Distância da parte inferior
    right: 0, // Distância da borda direita
    backgroundColor: '#37618E', // Cor de fundo do botão
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    margin: 20,
    fontWeight: '500',
    fontFamily: 'Outfit-Regular',
    fontSize: 25,
    color: '#FFF',
  },
  button: {
    marginVertical: 8,
    width: '80%',
  },
});
