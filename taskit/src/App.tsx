import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native'; // Importe o StatusBar

import { ThemeProvider } from './context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Outfit-Regular': require('../assets/fonts/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit/static/Outfit-Bold.ttf'),
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
      <NavigationContainer >
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
