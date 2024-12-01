import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import EditableAmountInput from './components/EditableAmountInput';
import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';

import { BackButton } from '~/components/BackButton';
import CalendarDatePicker from '~/components/CalendarDatePicker';
import GlobalInput from '~/components/GlobalInput';
import GlobalSwitch from '~/components/GlobalSwitch';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import { useGlobalStyles } from '~/styles/globalStyles';

import 'moment/locale/pt-br';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import OpenModalButton from './components/OpenModalButton';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import SelectItem from './components/SelectItem';
import { Account, Category, Expense } from '~/types/models';
import { accountTypeList } from '../../utils/accountTypeList';
import { expenseCategories } from '../../utils/categoriesList';
import TrashButton from '~/components/TrashButton';
import { useUser } from '~/context/UserContext';
import { deleteExpense, updateExpense } from '~/services/expenseService';
moment.locale('pt-br');

type EditExpensesScreenNavigationProp = NavigationProp<FinancialStackParamList, 'EditExpense'>;

export default function EditExpenseScreen() {
  const style = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  console.log(userData.accounts[0].expenses[0]);

  const navigation = useNavigation<EditExpensesScreenNavigationProp>();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(
    userData.accounts[0].expenses[0].value.toFixed(2).replace('.', ',')
  );
  const [paid, setPaid] = useState(userData.accounts[0].expenses[0].paid);
  const [name, setName] = useState(userData.accounts[0].expenses[0].exp_name);
  const [selectedDate, setSelectedDate] = useState(
    moment(userData.accounts[0].expenses[0].date, 'YYYY-MM-DD').format('YYYY-MM-DD')
  );
  const [selectedCategory, setSelectedCategory] = useState(
    userData.accounts[0].expenses[0].category
  );
  const [selectedAccount, setSelectedAccountType] = useState(
    userData.accounts.find((account: Account) => account.id === userData.accounts[0].id)
      ?.acc_name || 'wallet'
  );

  const back = () => {
    navigation.goBack();
  };

  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetCategory = useRef<BottomSheet>(null);

  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState(
    expenseCategories.find(
      (categories) => categories.name === userData.accounts[0].expenses[0].category
    )?.icon || 'tag'
  );
  const [selectedAccountIcon, setSelectedAccountIcon] = useState(
    accountTypeList.find((account) => account.name === userData.accounts[0].acc_type)?.iconName ||
      'wallet'
  );

  const handleSnapPressAccount = (index: number) => {
    bottomSheetAccount.current?.snapToIndex(index);
  };

  const handleSnapPressCategory = (index: number) => {
    bottomSheetCategory.current?.snapToIndex(index);
  };

  const handleAccountChange = (account: { name: string; iconName: string }) => {
    setSelectedAccountType(account.name);
    setSelectedAccountIcon(account.iconName);
    bottomSheetAccount.current?.close();
  };

  const handleCategoryChange = (category: { name: string; icon?: string }) => {
    setSelectedCategory(category.name);
    setSelectedCategoryIcon(category.icon || 'dots-horizontal');
    bottomSheetCategory.current?.close();
  };

  const handleSaveExpense = async () => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    // Validação dos campos
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome da despesa.');
      return;
    }

    const value = parseFloat(amount.replace(',', '.'));
    if (!value || value <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    if (!selectedCategory || selectedCategory === 'Selecione a categoria desejada') {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }

    const newAccount = userData.accounts.find(
      (account: Account) => account.acc_name === selectedAccount
    );

    if (!newAccount) {
      Alert.alert('Erro', 'Conta selecionada inválida.');
      return;
    }

    // Montar o objeto atualizado
    const updatedExpense: Expense = {
      id: userData.accounts[0].expenses[0].id, // ID original
      exp_name: name,
      category: selectedCategory,
      value,
      date: moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      fixed: userData.accounts[0].incomes[0].fixed,
      paid,
    };

    console.log(updatedExpense);
    setLoading(true);
    try {
      // Caso a conta tenha sido alterada
      if (newAccount.id !== userData.accounts[0].id) {
        await updateExpense(newAccount.id, updatedExpense, userData.accounts[0].id);
        Alert.alert('Sucesso', 'Despesa movida para outra conta e atualizada com sucesso!');
      } else {
        // Caso permaneça na mesma conta
        await updateExpense(newAccount.id, updatedExpense);
        Alert.alert('Sucesso', 'Despesa atualizada com sucesso!');
      }

      await refreshUserData(user.uid); // Atualiza os dados do usuário globalmente
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a despesa. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  const handleDelete = async (expense: Expense) => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    // Encontra a conta associada à despesa
    const account = userData.accounts.find((acc: Account) =>
      acc.expenses.some((e) => e.id === expense.id)
    );

    if (!account) {
      Alert.alert('Erro', 'Conta associada à despesa não encontrada.');
      return;
    }

    const isSameExpense = (e: Expense) =>
      e.startDate === expense.startDate &&
      e.exp_name === expense.exp_name &&
      e.category === expense.category &&
      e.value === expense.value;

    const deleteExpenses = async (ids: string[], successMessage: string) => {
      try {
        if (ids.length > 0) {
          await deleteExpense(account.id, ids);
          await refreshUserData(user.uid);
          Alert.alert('Sucesso', successMessage);
        } else {
          Alert.alert('Aviso', 'Nenhuma despesa encontrada para remover.');
        }
      } catch (error) {
        console.error('Erro ao remover despesas:', error);
        Alert.alert('Erro', 'Não foi possível remover as despesas.');
      }
    };

    if (expense.fixed) {
      Alert.alert(
        'Excluir Despesa',
        'Esta despesa é fixa. O que você deseja fazer?',
        [
          {
            text: 'Remover Todas (Efetivadas)',
            onPress: async () => {
              const allExpenses = account.expenses
                .filter((e: Expense) => isSameExpense(e))
                .map((e: Expense) => e.id);
              await deleteExpenses(allExpenses, 'Todas as despesas removidas com sucesso!');
            },
          },
          {
            text: 'Remover Todas Pendentes',
            onPress: async () => {
              const pendingExpenses = account.expenses
                .filter((e: Expense) => isSameExpense(e) && !e.paid)
                .map((e: Expense) => e.id);
              await deleteExpenses(pendingExpenses, 'Despesas pendentes removidas com sucesso!');
            },
          },
          {
            text: 'Remover Somente Essa',
            onPress: async () => {
              await deleteExpenses([expense.id], 'Despesa removida com sucesso!');
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Alerta para despesas não fixas
      Alert.alert(
        'Excluir Despesa',
        'Tem certeza que deseja excluir esta despesa?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: async () => {
              await deleteExpenses([expense.id], 'Despesa removida com sucesso!');
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <View style={{ flex: 1, alignItems: 'center', marginLeft: 65 }}>
              <Text variant="headlineMedium" style={[style.title, styles.title]}>
                Editar Despesa
              </Text>
            </View>
            <TrashButton onPress={() => handleDelete(userData.accounts[0].expenses[0])} size={35} />
          </View>
          <View style={styles.containerSubtitle}>
            <Text variant="headlineMedium" style={[style.title, styles.subtitle]}>
              Valor da despesa
            </Text>
            <EditableAmountInput value={amount} onChangeValue={setAmount} style={style.title} />
          </View>
          <Container rounded style={styles.container}>
            <GlobalSwitch
              value={paid}
              onValueChange={(value) => setPaid(value)}
              label="Pago"
              color="#37618E" // cor personalizada
              icon="check-circle"
              style={styles.switch}
            />
            <View>
              <CalendarDatePicker
                initialDate={selectedDate}
                onDateChange={setSelectedDate} // Callback para atualizar a data
              />
            </View>
            <GlobalInput
              label="Descrição"
              value={name}
              onChangeText={setName}
              placeholder="Descrição da Despesa"
              prefixIcon="pencil"
              style={styles.input}
            />
            <OpenModalButton
              label=""
              selectedLabel={selectedCategory}
              onPress={() => handleSnapPressCategory(0)}
              prefixIcon={selectedCategoryIcon}
              error={false}
              errorMessage=""
              style={styles.openModal}
            />
            <OpenModalButton
              label=""
              selectedLabel={selectedAccount}
              onPress={() => handleSnapPressAccount(0)}
              prefixIcon={selectedAccountIcon}
              error={false}
              errorMessage=""
              style={styles.openModal}
            />
            <Button
              mode="contained"
              onPress={handleSaveExpense}
              style={[style.containedButtonDefaultStyle, styles.button]}
              disabled={loading} // Desativa o botão enquanto está carregando
              loading={loading} // Exibe o indicador de carregamento enquanto está carregando
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Container>

          <CustomBottomSheet
            ref={bottomSheetCategory}
            snapPoints={['65%', '90%']}
            children={
              <>
                <BottomSheetScrollView>
                  <Text style={styles.BottomSheetTitle}>Tags</Text>
                  {[
                    ...expenseCategories.map((category) => ({
                      ...category,
                      type: 'expense',
                    })),
                    ...userData.categories
                      .filter((category: Category) => category.type === 'expense')
                      .map((category: { icon: any }) => ({
                        ...category,
                        icon: category.icon || 'dots-horizontal', // Garante o ícone padrão
                      })),
                  ].map((category: any) => (
                    <SelectItem
                      key={category.name}
                      label={category.name}
                      type="categoria"
                      value={{ name: category.name, imageUri: '' }}
                      selectedValue={selectedCategory}
                      onChange={() => handleCategoryChange(category)}
                      iconName={category.icon || 'dots-horizontal'} // Ícone válido
                      style={styles.SelectItemInsideModal}
                    />
                  ))}
                </BottomSheetScrollView>
              </>
            }
          />

          <CustomBottomSheet
            ref={bottomSheetAccount}
            snapPoints={['49%']}
            children={
              <>
                <BottomSheetView>
                  <Text style={styles.BottomSheetTitle}>Tipo da Conta</Text>
                  {userData.accounts.map((account: Account) => {
                    const accountType = accountTypeList.find(
                      (type) => type.name === account.acc_type
                    );
                    return (
                      <SelectItem
                        key={account.id}
                        label={account.acc_name} // Nome da conta
                        type="categoria"
                        value={{ name: account.acc_name, imageUri: '' }}
                        selectedValue={selectedAccount}
                        onChange={() =>
                          handleAccountChange({
                            name: account.acc_name,
                            iconName: accountType?.iconName || 'help-circle',
                          })
                        }
                        iconName={accountType?.iconName || 'help-circle'} // Ícone baseado no tipo
                        style={styles.SelectItemInsideModal}
                      />
                    );
                  })}
                </BottomSheetView>
              </>
            }
          />
        </ScreenContent>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  openModal: {
    marginBottom: 25,
  },
  titleModal: {
    justifyContent: 'center',
  },
  keyboardAvoidingView: {
    flex: 1, // Ocupar o espaço inteiro
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centralizar o conteúdo
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  containerSubtitle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 18,
  },
  balance: {
    fontSize: 35,
    marginBottom: 20,
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 75,
    marginBottom: 30, // Espaço acima do botão
  },
  switch: {
    marginBottom: 0,
  },
  gesture: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: 600,
    padding: 20,
    color: '#000000',
  },
  itemContainer: {
    marginBottom: 4,
    padding: 10,
  },
  repeatContent: {
    padding: 16,
  },
  repeatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
  },
  BottomSheetTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  SelectItemInsideModal: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 15,
  },
  container: {
    minHeight: 680,
  },
});
