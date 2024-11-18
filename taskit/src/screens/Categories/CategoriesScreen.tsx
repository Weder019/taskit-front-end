import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenContent } from '~/components/ScreenContent';
import React, { useState } from 'react';
import Container from '~/components/Container';
import CategoryItem from './Components/CategoryItem';
import { Icon } from 'react-native-elements';

export default function CategoriesScreen() {
  const categories = [
    { label: 'Investimento', prefixIcon: 'trending-up' },
    { label: 'Presente', prefixIcon: 'card-giftcard' },
    { label: 'Salário', prefixIcon: 'attach-money' },
    { label: 'Prêmio', prefixIcon: 'emoji-events' },
    { label: 'Outros', prefixIcon: 'more-horiz' },
  ];

  const ToggleButton = () => {
    const [selected, setSelected] = useState<'despesas' | 'receitas'>('despesas');

    const handleClick = (type: 'despesas' | 'receitas') => {
      setSelected(type);
    };

    return (
      <View style={styles.switchReceitasDespesas}>
        <TouchableOpacity
          style={[styles.toggleOption, selected === 'despesas' ? styles.active : styles.inactive]}
          onPress={() => handleClick('despesas')}
        >
          <Text style={selected === 'despesas' ? styles.activeText : styles.inactiveText}>
            Despesas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleOption, selected === 'receitas' ? styles.active : styles.inactive]}
          onPress={() => handleClick('receitas')}
        >
          <Text style={selected === 'receitas' ? styles.activeText : styles.inactiveText}>
            Receitas
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ScreenContent>
        <View>
          <Text style={styles.title}>Categorias</Text>
        </View>
        <ToggleButton />
        <Container rounded style={styles.container}>
          {/* Lista de Categorias */}
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <CategoryItem key={index} label={category.label} icon={category.prefixIcon} />
            ))}
          </View>

          {/* Botão de adicionar */}
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" color="#fff" size={30} />
          </TouchableOpacity>
        </Container>
      </ScreenContent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#001d36',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    marginLeft: 20,
    marginBottom: 10,
  },
  container: {
    paddingTop: 150,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  switchReceitasDespesas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 6,
  },
  active: {
    backgroundColor: '#37618E',
  },
  inactive: {
    backgroundColor: '#d7e3f8',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#37618E',
  },
  categoriesContainer: {
    paddingTop: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
