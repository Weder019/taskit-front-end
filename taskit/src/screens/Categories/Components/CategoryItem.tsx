import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useGlobalStyles } from '~/styles/globalStyles';

interface CategoryItemProps {
  label: string;
  icon: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ label, icon }) => {
  const styles = useGlobalStyles();

  return (
    <TouchableOpacity style={styles.categoryButton}>
      <View style={localStyles.iconContainer}>
        <Icon name={icon} type="material" color="#fff" size={20} />
      </View>
      <Text style={[styles.categoryText, localStyles.labelText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1E90FF', // Cor da bola azul
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  labelText: {
    color: '#fff', // Cor do texto, se necessário
  },
});

export default CategoryItem;
