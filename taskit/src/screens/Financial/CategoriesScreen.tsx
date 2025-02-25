import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
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
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import GlobalInput from '~/components/GlobalInput';
import GlobalInputBottomSheet from './components/GlobalInputBottomSheet';
import { Button } from 'react-native-paper';
import { useGlobalStyles } from '~/styles/globalStyles';
import { useUser } from '~/context/UserContext';
import { createCategory, deleteCategory } from '~/services/categoryService';
import { Category } from '~/types/models';

export default function CategoriesScreen() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  const back = () => {
    console.log('back');
  };

  const [selectedType, setSelectedType] = useState<'Despesas' | 'Receitas'>('Despesas');
  const [nameCategory, setNameCategory] = useState('');
  const [userCategories, setUserCategories] = useState<Category[]>([]); // Apenas categorias criadas pelo usuário
  const [userCategoriesBd, setUserCategoriesBd] = useState<Category[]>(userData?.categories);
  const bottomSheetCreateCategory = useRef<BottomSheet>(null);

  const [newCategoryType, setNewCategoryType] = useState<'Despesas' | 'Receitas'>('Despesas');

  const handleSnapPressCreateCategory = () => {
    bottomSheetCreateCategory.current?.snapToIndex(0);
  };

  const handleCreateCategory = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!nameCategory.trim()) {
      Alert.alert('Erro', 'O nome da categoria não pode estar vazio.');
      return;
    }
    try {
      const newCategory: Category = {
        name: nameCategory.trim(),
        type: newCategoryType,
      };
      await createCategory(newCategory);

      refreshUserData(user.uid);
      const updatedCategories = userData?.categories || [];
      setUserCategoriesBd(updatedCategories);

      Alert.alert('Sucesso', 'Categoria criada com sucesso!', [
        { text: 'OK', onPress: () => bottomSheetCreateCategory.current?.close() },
      ]);
      setNameCategory('');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
    }

    // setUserCategories((prev) => [...prev, newCategory]); // Adiciona a nova categoria criada pelo usuário
  };

  const handleDeleteCategory = async (categoryName: string) => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    Alert.alert('Confirmação', 'Tem certeza de que deseja excluir está categoria?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            // Chama o serviço para deletar a conta
            const response = await deleteCategory(categoryName);

            // Atualiza os dados do usuário no contexto
            await refreshUserData(user.uid);

            // Retorna à tela anterior
            Alert.alert('Sucesso', 'Categoria excluída com sucesso!');
          } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            Alert.alert('Erro', 'Não foi possível excluir a categoria.');
          }
        },
      },
    ]);
  };
  React.useEffect(() => {
    if (userData?.categories) {
      setUserCategoriesBd(userData.categories);
    }
  }, [userData]);

  // Categorias exibidas na interface (fixas + criadas pelo usuário)
  const filteredCategories = [
    ...userCategoriesBd.filter((cat) => cat.type === selectedType), // Categorias criadas pelo usuário
    ...(selectedType === 'Despesas' ? expenseCategories : incomeCategories), // Categorias fixas
  ];

  const getCategoryIcon = (categoryName: string) => {
    // Busca o ícone das categorias fixas ou retorna o ícone padrão
    const list = selectedType === 'Despesas' ? expenseCategories : incomeCategories;
    const category = list.find((cat) => cat.name === categoryName);
    return category?.icon || 'dots-horizontal'; // Ícone padrão para categorias criadas pelo usuário
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ScreenContent>
            <View style={styles.containerTitle}>
              <BackButton onPress={back} />
              <Text style={[Globalstyles.title, styles.title]}>Categorias</Text>
            </View>
            <ToggleButtonGroup
              options={['Despesas', 'Receitas']}
              value={selectedType} // Passa o estado atual
              onChange={setSelectedType} // Atualiza o estado
            />
            <Container rounded style={styles.container}>
              {/* Lista de Categorias */}
              <ScrollView contentContainerStyle={styles.categoriesContainer}>
                {filteredCategories.map((category, index) => (
                  <CategoryItemComponent
                    key={`${category.name}-${index}`}
                    categoryName={category.name}
                    categoryIconName={getCategoryIcon(category.name)}
                    type={
                      userCategoriesBd.some((userCat) => userCat.name === category.name)
                        ? 'bd'
                        : undefined
                    }
                    onDelete={
                      userCategoriesBd.some((userCat) => userCat.name === category.name)
                        ? () => handleDeleteCategory(category.name)
                        : undefined
                    }
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
              snapPoints={['40%', '60%']}
              children={
                <>
                  <BottomSheetView>
                    <View>
                      <Text style={styles.BottomSheetTitle}>Criar nova categoria</Text>
                    </View>
                    <View>
                      <GlobalInputBottomSheet
                        label=""
                        value={nameCategory}
                        onChangeText={(text) => setNameCategory(text)}
                        placeholder="Digite o nome da categoria"
                        prefixIcon="category"
                        error={false}
                        errorMessage=""
                        style={styles.input}
                      />
                    </View>
                    <View>
                      <ToggleButtonGroup
                        options={['Despesas', 'Receitas']}
                        onChange={setNewCategoryType} // Sem necessidade de usar `as`
                        value={newCategoryType}
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.createButton} onPress={handleCreateCategory}>
                        <Text style={styles.buttonText}>Criar</Text>
                      </TouchableOpacity>
                    </View>
                  </BottomSheetView>
                </>
              }
            />
          </ScreenContent>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  BottomSheetTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
    width: '80%',
    alignSelf: 'center',
    marginTop: 25,
  },
  keyboardAvoidingView: {
    flex: 1, // Ocupar o espaço inteiro
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#37618E',
    padding: 10,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
});
