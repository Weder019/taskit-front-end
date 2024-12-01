import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import EditableAmountInput from './components/EditableAmountInput';
import Container from '../../components/Container';
import DropdownInput from '../../components/DropdownInput';
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
import QuantitySelector from './components/QuantitySelector';
import SelectItem from './components/SelectItem';
import { Account, Category, Income } from '~/types/models';
import { useUser } from '~/context/UserContext';
import { createIncome } from '~/services/incomeService';
import { incomeCategories } from '~/utils/categoriesList';
import { accountTypeList } from '~/utils/accountTypeList';

moment.locale('pt-br');

type NewIncomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewIncome'>;

type FixedIncome = Omit<Income, 'id'> & { startDate: string };
type GeneralIncome = Omit<Income, 'id'>; // Tipo normal para despesas

type IncomeInput = GeneralIncome | FixedIncome; // União dos dois tipos

export default function NewIncomeScreen() {
  const { user, userData, refreshUserData } = useUser();
  console.log(userData);

  const [loading, setLoading] = useState(false);
  const style = useGlobalStyles();
  const navigation = useNavigation<NewIncomeScreenNavigationProp>();
  const [amount, setAmount] = useState('00,00');
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('');
  const [fixed, setFix] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [period, setPeriod] = useState('Mensal');
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));

  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState('tag');
  const [selectedAccountIcon, setSelectedAccountIcon] = useState('wallet');

  const [selectedCategory, setSelectedCategory] = useState('Selecione a categoria desejada');
  const [selectedAccount, setSelectedAccountType] = useState('Selecione a conta desejada');

  const back = () => {
    navigation.goBack();
  };

  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetCategory = useRef<BottomSheet>(null);
  const bottomSheetRepeat = useRef<BottomSheet>(null);

  const handleSnapPressAccount = (index: number) => {
    bottomSheetAccount.current?.snapToIndex(index);
  };

  const handleSnapPressCategory = (index: number) => {
    bottomSheetCategory.current?.snapToIndex(index);
  };

  const handleSnapPressRepeat = (index: number) => {
    bottomSheetRepeat.current?.snapToIndex(index);
  };

  const handleRepeatChange = (value: boolean) => {
    if (value) {
      handleSnapPressRepeat(0);
    } else {
      setRepeat(false);
    }
  };

  const handleAccountChange = (account: { name: string; iconName: string }) => {
    setSelectedAccountType(account.name);
    setSelectedAccountIcon(account.iconName);
    bottomSheetAccount.current?.close();
  };

  const handleCategoryChange = (category: { name: string; icon?: string }) => {
    setSelectedCategory(category.name);
    setSelectedCategoryIcon(category.icon || 'dots-horizontal'); // Define um ícone padrão
    bottomSheetCategory.current?.close();
  };

  const generateRepeatedIncomes = (
    baseIncome: Omit<Income, 'id'>,
    quantity: number,
    period: string
  ): Omit<Income, 'id'>[] => {
    const momentDate = moment(baseIncome.date, 'YYYY-MM-DD');
    const incomes: Omit<Income, 'id'>[] = [];

    const periodMapping: { [key: string]: moment.unitOfTime.DurationConstructor } = {
      Diário: 'days',
      Semanal: 'weeks',
      Mensal: 'months',
      Anual: 'years',
    };

    const newPeriod = periodMapping[period];

    for (let i = 1; i < quantity; i++) {
      const newDate = momentDate.clone().add(i, newPeriod).format('YYYY-MM-DD');
      incomes.push({
        ...baseIncome,
        date: newDate,
        paid: false,
      });
    }
    return incomes;
  };

  const handleSaveIncome = async () => {
    if (fixed && repeat) {
      alert('Uma receita não pode ser marcada como fixa e repetível ao mesmo tempo.');
      return;
    }

    if (!name.trim()) {
      alert('Por favor, insira o nome da receita.');
      return;
    }

    if (!amount || parseFloat(amount.replace(',', '.')) <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    if (!selectedCategory || selectedCategory === 'Selecione a categoria desejada') {
      alert('Por favor, selecione uma categoria.');
      return;
    }

    if (!selectedAccount || selectedAccount === 'Selecione a conta desejada') {
      alert('Por favor, selecione uma conta.');
      return;
    }

    const selectedAccountId = userData.accounts.find(
      (account: Account) => account.acc_name === selectedAccount
    )?.id;

    if (!selectedAccountId) {
      alert('Conta selecionada não encontrada.');
      return;
    }

    const formattedDate = moment(selectedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

    let baseIncome: IncomeInput = {
      inc_name: name,
      category: selectedCategory,
      value: parseFloat(amount.replace(',', '.')),
      date: formattedDate,
      fixed,
      paid,
    };

    if (fixed) {
      baseIncome = {
        ...baseIncome,
        startDate: formattedDate,
      } as FixedIncome;
    }

    let incomes: IncomeInput[] = [baseIncome];

    if (repeat) {
      const repeatedIncomes = generateRepeatedIncomes(
        baseIncome as GeneralIncome,
        quantity,
        period
      );
      incomes = incomes.concat(repeatedIncomes);
    }

    setLoading(true);
    try {
      await createIncome(selectedAccountId, incomes);

      await refreshUserData(user?.uid || '');

      Alert.alert('Sucesso', 'Receita criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Erro ao criar a receita:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a receita. Tente novamente.');
    } finally {
      setLoading(false);
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
            <Text variant="headlineMedium" style={[style.title, styles.title]}>
              Receita
            </Text>
          </View>
          <View style={styles.containerSubtitle}>
            <Text variant="headlineMedium" style={[style.title, styles.subtitle]}>
              Valor da Receita
            </Text>
            <EditableAmountInput value={amount} onChangeValue={setAmount} style={style.title} />
          </View>
          <Container rounded>
            <GlobalSwitch
              value={paid}
              onValueChange={(value) => setPaid(value)}
              label="Recebido"
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
              placeholder="Descrição da Receita"
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
            <GlobalSwitch
              value={fixed}
              onValueChange={(value) => setFix(value)}
              label="Receita Fixa"
              color="#37618E" // cor personalizada
              icon="pin"
              style={styles.switch}
            />
            <GlobalSwitch
              value={repeat}
              onValueChange={handleRepeatChange}
              label="Repetir"
              color="#37618E" // cor personalizada
              icon="repeat"
              style={styles.switch}
            />
            <Button
              mode="contained"
              onPress={handleSaveIncome}
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
                    ...incomeCategories.map((category) => ({
                      ...category,
                      type: 'income',
                    })),
                    ...userData.categories
                      .filter((category: Category) => category.type === 'income')
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

          <CustomBottomSheet
            ref={bottomSheetRepeat}
            snapPoints={['35%']}
            children={
              <BottomSheetView style={styles.repeatContent}>
                <Text style={styles.containerHeadline}>Como sua transação se repete?</Text>
                <View style={styles.repeatOption}>
                  <Text style={styles.optionLabel}>Quantidade</Text>
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </View>
                <View style={styles.repeatOption}>
                  <Text style={styles.optionLabel}>Período</Text>
                  <DropdownInput
                    value={period}
                    options={['Diário', 'Semanal', 'Mensal', 'Anual']}
                    onSelect={(value) => setPeriod(value)}
                  />
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    setRepeat(true);
                    bottomSheetRepeat.current?.close();
                  }}>
                  Concluído
                </Button>
              </BottomSheetView>
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center', // Centraliza os itens ao longo do eixo principal
    position: 'relative',
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
});
