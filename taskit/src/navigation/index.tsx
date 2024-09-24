import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './tab-navigator';
import Modal from '../screens/modal';

import AuthTestScreen from '~/screens/AuthTestScreen';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  AuthTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Modal"
        component={AuthTestScreen}
        options={{ presentation: 'modal', headerLeft: () => null }}
      />
      <Stack.Screen name="AuthTest" component={AuthTestScreen} />
    </Stack.Navigator>
  );
}
