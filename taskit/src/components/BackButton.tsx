import { Feather } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.backButton}>
      <Feather name="chevron-left" size={16} color="#FFFFFF" />
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
});
