import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { useUser } from '~/context/UserContext';
import * as TaskScreens from '~/screens/Tasks';

export type TaskStackParamList = {
  TaskHome: undefined;
  AddTask: undefined;
  ViewTask: { task_id: string };
  EditTask: { tesk_id: string };
};

const TaskStack = createStackNavigator<TaskStackParamList>();

export default function TaskNavigator() {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <TaskStack.Navigator initialRouteName="TaskHome">
      <TaskStack.Screen
        name="TaskHome"
        component={TaskScreens.TaskHomeScreen}
        options={{ headerShown: false }}
      />
      <TaskStack.Screen
        name="AddTask"
        component={TaskScreens.AddTaskScreen}
        options={{ headerShown: false }}
      />
      <TaskStack.Screen
        name="ViewTask"
        component={TaskScreens.ViewTaskScreen}
        options={{ headerShown: false }}
      />
      <TaskStack.Screen
        name="EditTask"
        component={TaskScreens.EditTaskScreen}
        options={{ headerShown: false }}
      />
    </TaskStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
