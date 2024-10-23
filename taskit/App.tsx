import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext'; // Importe o UserProvider
import RootStack from './src/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Outfit-Regular': require('./assets/fonts/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit/static/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Enquanto as fontes carregam, a tela fica em branco
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <StatusBar hidden />
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme(); // Pega o tema do contexto

  return (
    <PaperProvider theme={theme}>
      <RootStack />
    </PaperProvider>
  );
}
