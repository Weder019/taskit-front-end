import { Feather } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Feather name="chevron-left" size={37} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 10,
    position:'absolute',
    left:0,
  },

});

