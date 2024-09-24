// styles/globalStyles.ts
import { StyleSheet } from 'react-native';

import { useTheme } from '~/context/ThemeContext';

export const useGlobalStyles = () => {
  const { theme } = useTheme(); // Pega o tema atual

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    text: {
      color: theme.colors.onSurface,
      fontFamily: 'Outfit-Regular',
      fontSize: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    separator: {
      backgroundColor: '#d1d5db',
      height: 1,
      marginVertical: 30,
      width: '80%',
    },
    title: {
      color: theme.colors.onPrimary,
      fontSize: 20,
      fontFamily: 'Outfit-Bold',
    },
    surface: {
      width: '100%',
      padding: 20,
      backgroundColor: theme.colors.surface,
    },
    inputDefaultStyle: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
  });
};
