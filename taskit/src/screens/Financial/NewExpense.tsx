import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
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

moment.locale('pt-br');

type NewExpensesScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewExpense'>;

export default function NewExpenseScreen() {
  const style = useGlobalStyles();
  const navigation = useNavigation<NewExpensesScreenNavigationProp>();
  const [amount, setAmount] = useState('00,00');
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('');
  // const [tag, setTag] = useState('');
  // const [account, setAccount] = useState('');
  const [fixed, setFix] = useState(false);
  const [repeat, setRepeat] = useState(false);
  // const [remind, setRemind] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment().format('DD/MM/YYYY'));

  const back = () => {
    navigation.goBack();
  };

  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetCategory = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const tags = [
    'Casa',
    'Educação',
    'Eletrônicos',
    'Lazer',
    'Restaurantes',
    'Saúde',
    'Serviços',
    'Supermercado',
    'Transporte1',
    'Transporte2',
    'Transporte3',
    'Transporte4',
    'Transporte',
  ];

  const handleSnapPressAccount = (index: number) => {
    bottomSheetAccount.current?.snapToIndex(index);
  };

  const handleSnapPressCategory = (index: number) => {
    bottomSheetCategory.current?.snapToIndex(index);
  };

  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text variant="headlineMedium" style={[style.title, styles.title]}>
              Despesa
            </Text>
          </View>
          <View style={styles.containerSubtitle}>
            <Text variant="headlineMedium" style={[style.title, styles.subtitle]}>
              Valor da despesa
            </Text>
            <EditableAmountInput value={amount} onChangeValue={setAmount} style={style.title} />
          </View>
          <Container rounded>
            <GlobalSwitch
              value={paid}
              onValueChange={(value) => setPaid(value)}
              label="Pago"
              color="#37618E" // cor personalizada
              icon="check-circle"
              style={styles.switch}
            />
            <CalendarDatePicker
              initialDate={selectedDate}
              onDateChange={setSelectedDate} // Callback para atualizar a data
            />
            <GlobalInput
              label="Descrição"
              value={name}
              onChangeText={setName}
              placeholder="Descrição da Despesa"
              prefixIcon="pencil"
              style={styles.input}
            />
            <OpenModalButton
              label="Tags"
              onPress={() => handleSnapPressCategory(0)}
              prefixIcon="tag"
              error={false}
              errorMessage=""
              style={styles.openModal}
            />
            <OpenModalButton
              label="Conta"
              onPress={() => handleSnapPressAccount(0)}
              prefixIcon="wallet"
              error={false}
              errorMessage=""
              style={styles.openModal}
            />
            {/* <DropdownInput
              label="Conta"
              value={account}
              onSelect={setAccount}
              options={['Conta 1', 'Conta 2', 'Conta 3']}
              placeholder="Selecione uma Conta"
              prefixIcon="wallet"
              style={styles.input}
            /> */}
            <GlobalSwitch
              value={fixed}
              onValueChange={(value) => setFix(value)}
              label="Despesa Fixa"
              color="#37618E" // cor personalizada
              icon="pin"
              style={styles.switch}
            />
            <GlobalSwitch
              value={repeat}
              onValueChange={(value) => setRepeat(value)}
              label="Repetir"
              color="#37618E" // cor personalizada
              icon="repeat"
              style={styles.switch}
            />
            <Button
              mode="contained"
              onPress={back}
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
                  <View style={styles.contentContainer}>
                    <Text style={styles.containerHeadline}>Teste</Text>
                  </View>
                  {tags.map(renderItem)}
                </BottomSheetScrollView>
              </>
            }
          />

          <CustomBottomSheet
            ref={bottomSheetAccount}
            snapPoints={['20%', '90%']}
            children={
              <>
                <BottomSheetView>{data.map(renderItem)}</BottomSheetView>
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
    marginTop: 37,
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
});
