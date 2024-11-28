import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';

import { RootStackParamList } from '.';
import FinancialNavigator from './finacial-navigator';
import { TabBarIcon } from '../components/TabBarIcon';
import NewExpenseScreen from '../screens/Financial/NewExpense';
import Three from '../screens/three';

import AccountDetails from '~/screens/Financial/AccountDetails';
import CategoriesScreen from '~/screens/Financial/CategoriesScreen';
import { useUser } from '../context/UserContext';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  const { refreshUserData } = useUser();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          console.log('Atualizando dados do usuário...');
          await refreshUserData();
          console.log('Dados do usuário atualizados com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar os dados do usuário:', error);
        }
      };

      fetchData();
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'FinancialHome';

        return {
          tabBarStyle: {
            display: routeName === 'FinancialHome' ? 'flex' : 'none', // Exibe somente na FinancialHome
          },
          headerShown: false, // Oculta o header de navegação
          tabBarActiveTintColor: 'black',
        };
      }}>
      <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tab.Screen
        name="Two"
        component={AccountDetails}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tab.Screen
        name="Financial"
        component={FinancialNavigator}
        options={{
          title: 'Financial',
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />, // ícone representativo
        }}
      />
    </Tab.Navigator>
  );
}
