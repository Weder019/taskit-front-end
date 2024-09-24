import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'; // Importe o StatusBar

import { ThemeProvider } from './context/ThemeContext';
import RootStack from './navigation';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar hidden />
      <RootStack />
    </ThemeProvider>
  );
}
