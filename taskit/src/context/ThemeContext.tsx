// styles/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { lightTheme, darkTheme } from '../styles/theme'; // Importa temas definidos

// Defina o tipo para o contexto
interface ThemeContextType {
  theme: typeof lightTheme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();

  const [isDarkTheme, setIsDarkTheme] = useState(scheme === 'dark');

  useEffect(() => {
    setIsDarkTheme(scheme === 'dark');
  }, [scheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
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
