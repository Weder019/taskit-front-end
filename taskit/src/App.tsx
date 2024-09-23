import 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import RootStack from './navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
