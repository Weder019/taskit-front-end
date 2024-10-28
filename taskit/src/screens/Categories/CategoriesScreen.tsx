import { Text } from 'react-native';
import { ScreenContent } from '../../components/ScreenContent';
import { BackButton } from '~/components/BackButton';
import Container from '../../components/Container';
import { useGlobalStyles } from '~/styles/globalStyles';
import CategoryItem from '../../screens/Categories/Components/CategoryItem';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-paper';



export default function CategoriesScreen() {
  const categories = [
    { label: 'Investimento', prefixIcon: 'trending-up' },
    { label: 'Presente', prefixIcon: 'present' },
    { label: 'Salário', prefixIcon: 'attach-money' },
    { label: 'Prêmio', prefixIcon: 'emoji-events' },
    { label: 'Outros', prefixIcon: 'more-horizontal' },
  ];
  const back = () => {
    console.log('back');
  };
  const ToggleButton = () => {
    const [selected, setSelected] = useState('despesas');
  
    const handleClick = (type: 'despesas' | 'receitas') => {
      setSelected(type);
    };

  return(
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ScreenContent>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <BackButton onPress={back}></BackButton>
          <Text style={[styles.title]}>
            Categorias
          </Text>
        </View>
        
        {/* Botão despesa e receita */}
        <View style={styles.switchContainer}>
          <div className='toggle-button'>
            <button>
              
            </button>
          </div>
        </View>

        <Container rounded>
        {/* Lista de categorias */}
        <View style={styles.container}>
          {categories.map((category, index) => (
            <CategoryItem key={index} label={category.label} icon={category.prefixIcon}></CategoryItem>
          ))}
        </View>
        </Container>
      </ScreenContent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centralizar o conteúdo
  },
  container: {
    backgroundColor: '#f0f0f5',
    borderRadius: 16,
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  expensesButton: {
    backgroundColor: '#ddd',
    marginRight: 4,
  },
  incomeButton: {
    backgroundColor: '#37618E',
  },
  switchButtonText: {
    fontSize: 16,
    color: '#1a1a2e',
  },
  incomeButtonText: {
    color: '#fff',
  },
  categoriesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#37618E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})};
