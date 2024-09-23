// styles/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { lightTheme, darkTheme } from '../styles/theme'; // Importa temas definidos

// Defina o tipo para o tema
interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    onPrimary: string;
    background: string;
    surface: string;
    onSurface: string;
    onSurfaceVariant: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
  };
}

// Defina o tipo para o contexto
interface ThemeContextType {
  theme: Theme;
  isDarkTheme: boolean;
  setIsDarkTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  console.log(scheme);
  const [isDarkTheme, setIsDarkTheme] = useState(scheme === 'dark');

  useEffect(() => {
    setIsDarkTheme(scheme === 'dark');
  }, [scheme]);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
