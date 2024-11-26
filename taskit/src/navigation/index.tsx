import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

import AuthNavigator from './auth-navigator'; // Importa o AuthNavigator
import TabNavigator from './tab-navigator';
import { useUser } from '../context/UserContext';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  AuthTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      {user ? (
        // Se o usuário estiver autenticado, exibe o Stack principal
        <Stack.Navigator initialRouteName="TabNavigator">
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        // Se não estiver autenticado, exibe o Stack de autenticação
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
