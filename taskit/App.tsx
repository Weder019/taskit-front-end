import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native'; // Importe o StatusBar
import { Provider as PaperProvider } from 'react-native-paper';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
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
      <StatusBar hidden />
      <AppContent />
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
