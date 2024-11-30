import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import EditableAmountInput from './components/EditableAmountInput';
import Container from '../../components/Container';
import CustomBottomSheet from '../../components/CustomBottomSheet';

import { BackButton } from '~/components/BackButton';
import GlobalInput from '~/components/GlobalInput';
import GlobalSwitch from '~/components/GlobalSwitch';
import { ScreenContent } from '~/components/ScreenContent';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import OpenModalButton from '~/screens/Financial/components/OpenModalButton';
import { useGlobalStyles } from '~/styles/globalStyles';
import SelectItem from './components/SelectItem';
import { bankList } from '~/utils/bankList';
import { accountTypeList } from '~/utils/accountTypeList';
import { useUser } from '~/context/UserContext';
import { createAccount } from '~/services/accountService';

type NewBankAccountScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewBankAccount'>;

export default function NewBankAccount() {
  const Globalstyles = useGlobalStyles();

  const navigation = useNavigation<NewBankAccountScreenNavigationProp>();

  const { user, refreshUserData } = useUser();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('00,00');
  const [selectedBank, setSelectedBank] = useState<{ name: string; imageUri: string | undefined }>({
    name: 'Selecione o banco',
    imageUri: '',
  });
  const [selectedAccountIcon, setSelectedAccountIcon] = useState('wallet');
  const [selectedAccountType, setSelectedAccountType] = useState('Selecione o tipo da conta');

  const back = () => {
    navigation.goBack();
  };

  //Modal
  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetAccountType = useRef<BottomSheet>(null);

  // callbacks

  const handleSnapPressAccount = (index: number) => {
    bottomSheetAccount.current?.snapToIndex(index);
  };
  const closeAccount = (value: { name: string; imageUri: string }) => {
    setSelectedBank(value);

    bottomSheetAccount.current?.close();
  };
  const handleBankChange = (bank: { name: string; imageUri: string | undefined }) => {
    setSelectedBank(bank);
  };

  const handleSnapPressAccountType = (index: number) => {
    bottomSheetAccountType.current?.snapToIndex(index);
  };

  const handleAccountTypeChange = (accountType: { name: string; iconName: string }) => {
    setSelectedAccountType(accountType.name);
    setSelectedAccountIcon(accountType.iconName);
    bottomSheetAccountType.current?.close();
  };

  const handleSave = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!selectedBank || selectedAccountType === 'Selecione o tipo da conta') {
      Alert.alert('Erro', 'Selecione um banco e um tipo de conta antes de salvar.');
      return;
    }

    try {
      const accountData = {
        acc_name: description,
        acc_type: selectedAccountType,
        bank: selectedBank.name,
        balance: parseFloat(amount.replace(',', '.')) || 0,
      };
      console.log(accountData);
      await createAccount(accountData); // Cria a conta no backend
      await refreshUserData(user.uid); // Atualiza os dados do usuário globalmente

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
    }
  };

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ScreenContent>
            <View style={styles.containerTitle}>
              <BackButton onPress={back} />
              <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
                Nova Conta
              </Text>
            </View>
            <View style={styles.containerSubtitle}>
              <Text variant="headlineMedium" style={[Globalstyles.title, styles.subtitle]}>
                Saldo Da Conta
              </Text>
              <EditableAmountInput
                value={amount}
                onChangeValue={setAmount}
                style={Globalstyles.title}
              />
            </View>
            <Container rounded style={styles.container}>
              <SelectItem
                label={selectedBank ? selectedBank.name : 'Selecionar Banco'}
                type="banco"
                value={selectedBank}
                selectedValue={selectedBank?.name || ''}
                onChange={setSelectedBank}
                onPress={() => handleSnapPressAccount(0)}
                iconName="help-outline" // Ícone de interrogação
                showArrow // Oculta a seta
                style={styles.SelectItemOpenModal}
              />

              <GlobalInput
                label="Descrição"
                value={description}
                onChangeText={setDescription}
                prefixIcon="pencil"
                style={styles.input}
              />
              <OpenModalButton
                label=""
                selectedLabel={selectedAccountType}
                onPress={() => handleSnapPressAccountType(0)}
                prefixIcon={selectedAccountIcon}
                error={false}
                errorMessage=""
                style={styles.openModal}
              />

              <Button
                mode="contained"
                onPress={handleSave}
                style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
                Salvar
              </Button>
            </Container>

            <CustomBottomSheet
              ref={bottomSheetAccount}
              snapPoints={['65%', '90%']}
              children={
                <>
                  <BottomSheetScrollView>
                    {bankList.map((bank) => (
                      <SelectItem
                        key={bank.name} // Usa o nome como chave
                        label={bank.name}
                        type="banco"
                        value={bank} // Passa o objeto completo com name e imageUri
                        selectedValue={selectedBank?.name || ''}
                        onChange={handleBankChange}
                        onPress={() => closeAccount(bank)} // Fecha o BottomSheet e seleciona o banco
                        showArrow={false}
                        style={styles.SelectItemInsideModal}
                      />
                    ))}
                  </BottomSheetScrollView>
                </>
              }
            />

            <CustomBottomSheet
              ref={bottomSheetAccountType}
              snapPoints={['49%']}
              children={
                <>
                  <BottomSheetView>
                    <Text style={styles.BottomSheetTitle}>Tipo da Conta</Text>
                    {accountTypeList.map((accountType) => (
                      <SelectItem
                        key={accountType.name}
                        label={accountType.name}
                        type="categoria"
                        value={{ name: accountType.name, imageUri: '' }}
                        selectedValue={selectedAccountType}
                        onChange={() => handleAccountTypeChange(accountType)}
                        iconName={accountType.iconName}
                        style={styles.SelectItemInsideModalCAccountType}
                      />
                    ))}
                  </BottomSheetView>
                </>
              }
            />
          </ScreenContent>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
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
    marginTop: 20,
  },
  BottomSheetTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 200, // Espaço acima do botão
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
  SelectItemOpenModal: {
    marginBottom: 25,
    padding: 3.5,
    paddingVertical: 5,
  },
  SelectItemInsideModal: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  SelectItemInsideModalCAccountType: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 15,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
    minHeight: 580,
    maxHeight: 580,
  },
});
