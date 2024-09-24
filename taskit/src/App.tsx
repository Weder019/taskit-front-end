import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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
      <RootStack />
    </ThemeProvider>
  );
}
