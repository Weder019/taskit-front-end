import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import TrashButton from '~/components/TrashButton';

interface CategoryItemComponentProps {
  categoryName: string; // Nome da categoria
  categoryIconName: string; // Nome do ícone para a categoria
  style?: ViewStyle; // Estilo adicional para o container
  type?: string; // Tipo da categoria (opcional)
  onDelete?: () => void; // Função para o botão de lixeira
}

const CategoryItemComponent: React.FC<CategoryItemComponentProps> = ({
  categoryName,
  categoryIconName,
  style,
  type,
  onDelete,
}) => {
  return (
    <View>
      <View style={[styles.container, style]}>
        <View style={styles.iconContainer}>
          <IconButton icon={categoryIconName} size={32} iconColor="#FFFFFF" style={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.categoryName}>{categoryName || 'Sem Categoria'}</Text>
        </View>
        {/* Lixeira (aparece apenas se o type for "bd") */}
        {type === 'bd' && (
          <View style={styles.trashButtonContainer}>
            <TrashButton onPress={onDelete} size={30} iconColor={'#37618E'} />
          </View>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'dashed', // Linha pontilhada
    marginVertical: 5,
    width:"100%"
  },
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
  trashButtonContainer: {
    marginLeft: 10, // Espaçamento entre o texto e a lixeira
  },
  trashButton: {
    color: '#000',
  },
});

export default CategoryItemComponent;
