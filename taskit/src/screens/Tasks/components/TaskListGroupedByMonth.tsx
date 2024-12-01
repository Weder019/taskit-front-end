import { NavigationProp } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';

import TaskCard from './TaskCard';

import { TaskStackParamList } from '~/navigation/task-navigator';
import { Task } from '~/types';

type TaskHomeScreenNavigateprop = NavigationProp<TaskStackParamList, 'TaskHome'>;
interface TaskListGroupedByMonthProps {
  tasks: Task[];
  navigate: TaskHomeScreenNavigateprop;
}

const TaskListGroupedByMonth: React.FC<TaskListGroupedByMonthProps> = ({ tasks, navigate }) => {
  // Agrupar tarefas por mês e ano
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const monthYear = moment(task.data).format('MMMM YYYY');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(task);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  // Transformar em um array de objetos para renderização
  const groupedArray = Object.entries(groupedTasks).map(([monthYear, tasks]) => ({
    monthYear,
    tasks,
  }));

  return (
    <FlatList
      style={{ width: '100%' }}
      data={groupedArray}
      keyExtractor={(item) => item.monthYear}
      renderItem={({ item }) => (
        <View style={styles.groupContainer}>
          {/* Mês e Ano */}
          <Text variant="titleLarge" style={styles.monthHeader}>
            {item.monthYear.charAt(0).toUpperCase() + item.monthYear.slice(1).toLowerCase()}
          </Text>

          {/* Lista de TaskCards */}
          {item.tasks.map((task, index) => (
            <TaskCard key={index} task={task} navigation={navigate} />
          ))}

          {/* Linha Divisória */}
          <Divider style={styles.divider} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  monthHeader: {
    margin: 8,
    fontWeight: '200',
    alignSelf: 'flex-start',
    fontFamily: 'Outfit-Regular',
    color: '#FFF',
  },
  divider: {
    marginVertical: 8,
    color: '#FFF',
    width: '100%',
  },
});

export default TaskListGroupedByMonth;
