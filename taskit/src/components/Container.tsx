import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { useGlobalStyles } from '~/styles/globalStyles';

interface ContainerProps {
  children: React.ReactNode;
  rounded?: boolean;
  style?: ViewStyle; // Caso você queira passar estilos adicionais
}

const Container: React.FC<ContainerProps> = ({ children, rounded = false, style }) => {
  const Globalstyles = useGlobalStyles();
  return <View style={[Globalstyles.surface, rounded && styles.rounded, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  rounded: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Container;
