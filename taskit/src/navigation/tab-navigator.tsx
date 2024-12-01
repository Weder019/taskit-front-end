import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { RootStackParamList } from '.';
import FinancialNavigator from './finacial-navigator';
import TaskNavigator from './task-navigator';
import { TabBarIcon } from '../components/TabBarIcon';
import TransactionsScreen from '../screens/Financial/TransactionScreen';

import { useUser } from '~/context/UserContext';
import LoginScreen from '~/screens/Authentication/LoginScreen';
import {
  AccountDeatilsScreen,
  CategoriesScreen,
  EditExpenseScreen,
  EditIncomeScreen,
  EditNewBankAccountScreen,
  NewBankAccountScreen,
  NewExpenseScreen,
  NewIncomeScreen,
} from '~/screens/Financial';
import AccountDetails from '~/screens/Financial/AccountDetails';
import AddTaskScreen from '~/screens/Tasks/AddTask';
import TaskDetails from '~/screens/Tasks/ViewTaskScreen';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'FinancialHome';

        return {
          tabBarStyle: {
            display: routeName === 'FinancialHome' || routeName === 'TaskHome' ? 'flex' : 'none', // Exibe somente na FinancialHome
          },
          headerShown: false, // Oculta o header de navegação
          tabBarActiveTintColor: 'black',
        };
      }}>
      <Tab.Screen
        name="Financial"
        component={FinancialNavigator}
        options={{
          title: 'Financial',
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />, // Ícone representativo
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskNavigator}
        options={{
          title: 'Task',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
    </Tab.Navigator>
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
