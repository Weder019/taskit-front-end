import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface CategoryItemComponentProps {
  categoryName: string; // Nome da categoria
  categoryIconName: string; // Nome do ícone para a categoria
  style?: ViewStyle; // Estilo adicional para o container
}

const CategoryItemComponent: React.FC<CategoryItemComponentProps> = ({ categoryName, categoryIconName, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <IconButton
          icon={categoryIconName}
          size={32}
          iconColor="#FFFFFF"
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryName}>{categoryName || 'Sem Categoria'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    margin: 0, // Remove margens extras do ícone
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    
    color: '#000',
  },
});

export default CategoryItemComponent;
