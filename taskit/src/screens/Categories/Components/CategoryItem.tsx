import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

interface CategoryItemProps {
  label: string;
  icon: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ label, icon }) => {
  return (
    <TouchableOpacity style={styles.categoryButton}>
      <View style={styles.iconContainer}>
        <Icon name={icon} type="material" color="#fff" size={20} />
      </View>
      <Text style={styles.categoryText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#37618E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
