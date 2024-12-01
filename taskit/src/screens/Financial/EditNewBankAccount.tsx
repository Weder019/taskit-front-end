import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import EditableAmountInput from './components/EditableAmountInput';
import SelectItem from './components/SelectItem';
import Container from '../../components/Container';
import CustomBottomSheet from '../../components/CustomBottomSheet';

import { BackButton } from '~/components/BackButton';
import GlobalInput from '~/components/GlobalInput';
import { ScreenContent } from '~/components/ScreenContent';
import TrashButton from '~/components/TrashButton';
import { useUser } from '~/context/UserContext';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import OpenModalButton from '~/screens/Financial/components/OpenModalButton';
import { deleteAccount, updateAccount } from '~/services/accountService';
import { useGlobalStyles } from '~/styles/globalStyles';
import { Account } from '~/types';
import { accountTypeList, getIcon } from '~/utils/accountTypeList';
import { bankList, getBankImageUri } from '~/utils/bankList';

type EditNewBankAccountScreenNavigationProp = NavigationProp<
  FinancialStackParamList,
  'EditNewBankAccount'
>;
type EditNewBankAccountScreenRouteProp = RouteProp<FinancialStackParamList, 'EditNewBankAccount'>;

export default function EditNewBankAccount() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  const navigation = useNavigation<EditNewBankAccountScreenNavigationProp>();
  const route = useRoute<EditNewBankAccountScreenRouteProp>();
  const { account_id } = route.params;

  // Filtrar a conta com base no account_id
  const selectedAccount = userData.accounts.find((acc: Account) => acc.id === account_id);

  // Estados iniciais baseados na conta filtrada
  const [description, setDescription] = useState(selectedAccount?.acc_name || '');
  const [amount, setAmount] = useState(selectedAccount?.balance || 0);
  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    imageUri: string | undefined;
  }>({
    name: selectedAccount?.bank || '',
    imageUri: selectedAccount ? getBankImageUri(selectedAccount.bank) : undefined,
  });
  const [selectedAccountIcon, setSelectedAccountIcon] = useState(
    selectedAccount ? getIcon(selectedAccount.acc_type) : undefined
  );
  const [selectedAccountType, setSelectedAccountType] = useState(selectedAccount?.acc_type || '');

  useEffect(() => {
    if (!selectedAccount) {
      // Redirecionar ou mostrar uma mensagem de erro se a conta não for encontrada
      console.warn('Conta não encontrada');
      navigation.goBack(); // Ou exiba uma mensagem de erro apropriada
    }
  }, [selectedAccount, navigation]);
  const back = () => {
    navigation.goBack();
  };
  const handleRedirect = () => {
    navigation.navigate('FinancialHome');
  };

  const handleUpdate = async () => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const accountId = selectedAccount.id; // Supondo que estamos editando a primeira conta
    if (!accountId) {
      Alert.alert('Erro', 'Conta não encontrada.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Erro', 'A descrição não pode estar vazia.');
      return;
    }

    try {
      const updatedAccount = {
        acc_name: description,
        balance: parseFloat(amount.toString().replace(',', '.')), // Converte para número
        bank: selectedBank?.name,
        acc_type: selectedAccountType,
      };
      // Chama o serviço para atualizar a conta
      await updateAccount(accountId, updatedAccount);

      // Atualiza os dados do usuário no contexto
      await refreshUserData(user.uid);

      Alert.alert('Sucesso', 'Conta atualizada com sucesso!');
      navigation.goBack(); // Retorna à tela anterior
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a conta.');
    }
  };
  const handleDelete = async () => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const accountId = selectedAccount.id; // Supondo que estamos editando a primeira conta
    if (!accountId) {
      Alert.alert('Erro', 'Conta não encontrada.');
      return;
    }

    // Exibe o alerta de confirmação
    Alert.alert('Confirmação', 'Tem certeza de que deseja excluir esta conta?', [
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
            await deleteAccount(accountId);

            // Atualiza os dados do usuário no contexto
            await refreshUserData(user.uid);

            handleRedirect(); // Retorna à tela anterior
            Alert.alert('Sucesso', 'Conta excluída com sucesso!');
          } catch (error) {
            console.error('Erro ao excluir conta:', error);
            Alert.alert('Erro', 'Não foi possível excluir a conta.');
          }
        },
      },
    ]);
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

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ScreenContent>
            <View style={styles.containerTitle}>
              <BackButton onPress={back} />
              <View style={{ flex: 1, alignItems: 'center', marginLeft: 50 }}>
                <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
                  Editar Conta
                </Text>
              </View>
              <TrashButton onPress={handleDelete} size={35} />
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
                onPress={handleUpdate}
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
  BottomSheetTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 285, // Espaço acima do botão
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
    minHeight: 700,
  },
});
