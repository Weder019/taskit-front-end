import { StyleSheet, Text, View } from 'react-native';

import { useGlobalStyles } from '~/styles/globalStyles';

type ScreenContentProps = {
  title: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, children }: ScreenContentProps) => {
  const styles = useGlobalStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};