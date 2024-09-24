import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { lightColors, darkColors } from './colors';

export const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme, // Integra o tema do Paper
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    ...lightColors,
  },
};

export const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme, // Integra o tema do Paper
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    ...darkColors,
  },
};
