import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

import AuthNavigator from './auth-navigator'; // Importa o AuthNavigator
import TabNavigator from './tab-navigator';

import AuthTestScreen from '~/screens/AuthTestScreen';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  AuthTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulação de um efeito que busca o status de login
  useEffect(() => {
    // Aqui você pode verificar o token de login ou a sessão do usuário
    const checkAuthentication = async () => {
      // Verifique o status de autenticação
      // Se o usuário estiver autenticado, atualize o estado
      setIsAuthenticated(false); // Simulação de usuário não autenticado
    };
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // Se o usuário estiver autenticado, exibe o Stack principal
        <Stack.Navigator initialRouteName="TabNavigator">
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Modal"
            component={AuthTestScreen}
            options={{ presentation: 'modal', headerLeft: () => null }}
          />
          <Stack.Screen name="AuthTest" component={AuthTestScreen} />
        </Stack.Navigator>
      ) : (
        // Se não estiver autenticado, exibe o Stack de autenticação
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
