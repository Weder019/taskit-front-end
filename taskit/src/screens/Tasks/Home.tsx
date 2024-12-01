import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Container from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import TaskCard from './components/TaskCard';
import TaskListGroupedByMonth from './components/TaskListGroupedByMonth';
import ExpandableFloatingButton from '../Financial/components/ExpandableFloatingButton';

const exampleTask = {
  title: 'Exemplo de Tarefa',
  description: 'Essa é uma descrição da tarefa.',
  done: false,
  subtasks: [
    { title: 'Subtarefa 1', done: true },
    { title: 'Subtarefa 2', done: false },
    { title: 'Subtarefa 1', done: true },
    { title: 'Subtarefa 2', done: false },
    { title: 'Subtarefa 1', done: true },
    { title: 'Subtarefa 2', done: false },
  ],
};

const tasks = [
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
  const handleNavigateToScreen1 = () => {
    console.log('aaaa');
  };

  const handleNavigateToScreen2 = () => {
    console.log('aaaa');
  };

  const buttons = [
    {
      icon: 'trending-up',
      label: 'Receita',
      onPress: () => console.log('CORINTHINAS'),
    },
  ];

  return (
    <ScreenContent style={{ justifyContent: 'flex-start' }}>
      <Text variant="bodyLarge" style={styles.title}>
        Minhas Tarefas:
      </Text>
      <TaskListGroupedByMonth tasks={tasks} />
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
