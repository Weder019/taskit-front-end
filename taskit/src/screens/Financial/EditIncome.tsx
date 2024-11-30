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
import { Account } from '~/types/financial.types';
import TrashButton from '~/components/TrashButton';
moment.locale('pt-br');

type EditIncomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'EditIncome'>;

export default function EditIncomeScreen() {
  const style = useGlobalStyles();
  const navigation = useNavigation<EditIncomeScreenNavigationProp>();

  const [userAccounts, setUserAccounts] = useState<Account[]>([
    {
      id: 'HTFTDk51MRMbxddpSz6g',
      acc_name: 'Minha Conta Nubank', // Nome escolhido pelo usuário
      acc_type: 'Conta Corrente', // Relacionado ao accountList
      bank: 'Nubank',
      expenses: [],
      incomes: [],
      balance: 1000,
    },
    {
      id: '2',
      acc_name: 'Poupança da Caixa',
      acc_type: 'Poupança',
      bank: 'Caixa Econômica',
      expenses: [],
      incomes: [],
      balance: 500,
    },
    {
      id: '3',
      acc_name: 'Minha Carteira',
      acc_type: 'Carteira',
      bank: '',
      expenses: [],
      incomes: [],
      balance: 250,
    },
  ]);

  const accountId = 'HTFTDk51MRMbxddpSz6g';
  const acc_type = 'Conta Corrente';
  const [income, setIncome] = useState({
    id: 'U6KqFx8UmO8rEs20tKJE',
    inc_name: 'Dividendos CPX022',
    category: 'Investimento',
    value: 330,
    date: '2024-11-07',
    fixed: true,
    received: true,
  });

  const [amount, setAmount] = useState(income.value.toFixed(2).replace('.', ','));
  const [received, setReceived] = useState(income.received);
  const [name, setName] = useState(income.inc_name);
  const [fixed, setFix] = useState(income.fixed);
  const [repeat, setRepeat] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [period, setPeriod] = useState('Mensal');
  const [selectedDate, setSelectedDate] = useState(
    moment(income.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
  );

  const [selectedCategory, setSelectedCategory] = useState(income.category);
  const [selectedAccount, setSelectedAccountType] = useState(
    userAccounts.find((account) => account.id === accountId)?.acc_name || 'wallet'
  );

  const back = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    console.log('deletar');
  };

  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetCategory = useRef<BottomSheet>(null);
  const bottomSheetRepeat = useRef<BottomSheet>(null);

  const accountList = [
    { name: 'Carteira', iconName: 'wallet' },
    { name: 'Conta Corrente', iconName: 'bank' },
    { name: 'Poupança', iconName: 'download' },
    { name: 'Investimentos', iconName: 'trending-up' },
    { name: 'Outros', iconName: 'dots-horizontal' },
  ];

  const categoryList = [
    { name: 'Casa', iconName: 'home' },
    { name: 'Educação', iconName: 'school' },
    { name: 'Eletrônicos', iconName: 'devices' },
    { name: 'Lazer', iconName: 'gamepad' },
    { name: 'Outros', iconName: 'dots-horizontal' },
    { name: 'Restaurantes', iconName: 'food' },
    { name: 'Saúde', iconName: 'heart' },
    { name: 'Serviços', iconName: 'cog' },
    { name: 'Supermercado', iconName: 'cart' },
    { name: 'Transporte', iconName: 'car' },
    { name: 'Investimento', iconName: 'cash' },
    { name: 'Presente', iconName: 'gift' },
    { name: 'Salário', iconName: 'cash-multiple' },
    { name: 'Prêmio', iconName: 'trophy' },
  ];

  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState(
    categoryList.find((categories) => categories.name === income.category)?.iconName || 'tag'
  );
  const [selectedAccountIcon, setSelectedAccountIcon] = useState(
    accountList.find((account) => account.name === acc_type)?.iconName || 'wallet'
  );

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

  const handleCategoryChange = (category: { name: string; iconName: string }) => {
    setSelectedCategory(category.name);
    setSelectedCategoryIcon(category.iconName);
    bottomSheetCategory.current?.close();
  };

  const handleSaveIncome = () => {
    // Validação dos campos
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome da receita.');
      return;
    }

    if (!amount || parseFloat(amount.replace(',', '.')) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    if (!selectedCategory || selectedCategory === 'Selecione a categoria desejada') {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }

    const selectedAccountData = userAccounts.find(
      (account) => account.acc_name === selectedAccount
    );
    if (!selectedAccountData) {
      Alert.alert('Erro', 'Conta selecionada inválida.');
      return;
    }

    const updatedIncome = {
      id: income.id,
      inc_name: name,
      category: selectedCategory,
      value: parseFloat(amount.replace(',', '.')),
      date: moment(selectedDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      fixed,
      received,
    };

    if (selectedAccountData.id !== accountId) {
      const payload = {
        oldAccountId: accountId,
        newAccountId: selectedAccountData.id,
        income: updatedIncome,
      };
      console.log('Conta alterada, payload:', payload);
      // Mostrar alerta de confirmação
      Alert.alert('Conta Alterada', 'A receita foi movida para outra conta.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      // Caso a conta não tenha sido alterada
      const payload = {
        accountId, // ID da conta atual
        expense: updatedIncome,
      };

      console.log('Conta inalterada, payload:', payload);
      Alert.alert('Sucesso', 'Despesa atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
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
            <View style={{ flex: 1, alignItems: 'center', marginLeft: 55 }}>
              <Text variant="headlineMedium" style={[style.title, styles.title]}>
                Editar Receita
              </Text>
            </View>
            <TrashButton onPress={handleDelete} size={35} />
          </View>
          <View style={styles.containerSubtitle}>
            <Text variant="headlineMedium" style={[style.title, styles.subtitle]}>
              Valor da Receita
            </Text>
            <EditableAmountInput value={amount} onChangeValue={setAmount} style={style.title} />
          </View>
          <Container rounded>
            <GlobalSwitch
              value={received}
              onValueChange={(value) => setReceived(value)}
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
              style={[style.containedButtonDefaultStyle, styles.button]}>
              Salvar
            </Button>
          </Container>

          <CustomBottomSheet
            ref={bottomSheetCategory}
            snapPoints={['65%', '90%']}
            children={
              <>
                <BottomSheetScrollView>
                  <Text style={styles.BottomSheetTitle}>Tags</Text>
                  {categoryList.map((category) => (
                    <SelectItem
                      key={category.name}
                      label={category.name}
                      type="categoria"
                      value={{ name: category.name, imageUri: '' }}
                      selectedValue={selectedCategory}
                      onChange={() => handleCategoryChange(category)}
                      iconName={category.iconName}
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
                  {userAccounts.map((account) => {
                    const icon =
                      accountList.find((item) => item.name === account.acc_type)?.iconName ||
                      'wallet';
                    return (
                      <SelectItem
                        key={account.id}
                        label={account.acc_name}
                        type="categoria"
                        value={{ name: account.acc_name, imageUri: '' }}
                        selectedValue={selectedAccount}
                        onChange={() =>
                          handleAccountChange({ name: account.acc_name, iconName: icon })
                        }
                        iconName={icon}
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
});
