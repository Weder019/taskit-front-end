import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenContent } from '~/components/ScreenContent';
import React, { useRef, useState } from 'react';
import Container from '~/components/Container';
import { Icon } from 'react-native-elements';
import { BackButton } from '~/components/BackButton';
import CircularButton from '~/components/CircularButton';
import SelectItem from './components/SelectItem';
import CategoryItemComponent from './components/CategoryItemComponent';
import ToggleButtonGroup from './components/ToggleButtonGroup';
import { expenseCategories, incomeCategories } from '~/utils/categoriesList';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBottomSheet from '~/components/CustomBottomSheet';

export default function CategoriesScreen() {
  const back = () => {
    console.log('Back');
  };

  const [selectedType, setSelectedType] = useState<'Despesas' | 'Receitas'>('Despesas');

  const bottomSheetCreateCategory = useRef<BottomSheet>(null);

  const handleSnapPressCreateCategory = () => {
    bottomSheetCreateCategory.current?.snapToIndex(0);
  };

  const handleToggleChange = (selectedOption: string) => {
    setSelectedType(selectedOption as 'Despesas' | 'Receitas'); // Atualiza o estado com a opção selecionada
  };

  // Categorias exibidas com base no estado
  const categories = selectedType === 'Despesas' ? expenseCategories : incomeCategories;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text style={styles.title}>Categorias</Text>
          </View>
          <ToggleButtonGroup options={['Despesas', 'Receitas']} onChange={handleToggleChange} />
          <Container rounded style={styles.container}>
            {/* Lista de Categorias */}
            <ScrollView contentContainerStyle={styles.categoriesContainer}>
              {categories.map((category) => (
                <CategoryItemComponent
                  key={category.name} // Chave única
                  categoryName={category.name} // Nome da categoria
                  categoryIconName={category.icon} // Nome do ícone
                />
              ))}
            </ScrollView>
            <CircularButton
              onPress={() => handleSnapPressCreateCategory()}
              iconName="plus"
              size={48}
              style={styles.circularButton}
            />
          </Container>

          <CustomBottomSheet
            ref={bottomSheetCreateCategory}
            snapPoints={['40%']}
            children={
              <>
                <BottomSheetView>
                  <View>
                    <Text>Titulo</Text>
                  </View>
                </BottomSheetView>
              </>
            }
          />
        </ScreenContent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#001d36',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    marginLeft: 20,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
    minHeight: 580,
    maxHeight: 580,
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
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center', // Centraliza os itens ao longo do eixo principal
    position: 'relative',
  },
  screen: {
    flex: 1,
    backgroundColor: '#001d36',
  },
  circularButton: {
    position: 'absolute', // Fixa o botão na tela
    bottom: 20, // Distância da parte inferior
    right: 20, // Distância da borda direita
    backgroundColor: '#37618E', // Cor de fundo do botão
  },
});
