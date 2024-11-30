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
import { bankList, getBankImageUri } from '~/utils/bankList';
import TrashButton from '~/components/TrashButton';
import { useUser } from '~/context/UserContext';
import { accountTypeList, getIcon } from '~/utils/accountTypeList';
import { deleteAccount, updateAccount } from '~/services/accountService';

type EditNewBankAccountScreenNavigationProp = NavigationProp<
  FinancialStackParamList,
  'EditNewBankAccount'
  

>;

export default function EditNewBankAccount() {
  const Globalstyles = useGlobalStyles();

  const { user, userData, refreshUserData } = useUser();
  

  const navigation = useNavigation<EditNewBankAccountScreenNavigationProp>();
  const [description, setDescription] = useState(userData.accounts[0].acc_name);
  const [amount, setAmount] = useState(userData.accounts[0].balance);

  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    imageUri: string | undefined;
  }>({
    name: userData.accounts[0].bank,
    imageUri: getBankImageUri(userData.accounts[0].bank),
  });
  const [selectedBankName, setSelectedBankName] = useState(userData.accounts[0].bank)
  const [selectedBankImg, setSelectedBankImg] = useState<string|undefined>(getBankImageUri(userData.accounts[0].bank))

  const [selectedAccountIcon, setSelectedAccountIcon] = useState(
    getIcon(userData.accounts[0].acc_type)
  );
  const [selectedAccountType, setSelectedAccountType] = useState(userData.accounts[0].acc_type);

  const back = () => {
    navigation.goBack();
  };
  const handleRedirect = () => {
    navigation.navigate('FinancialHome'); 
  };


  const handleSelectBank = (name: string, imageUri: string|undefined) => {
    setSelectedBankName(name);
    setSelectedBankImg(imageUri);
    setSelectedBank({name, imageUri});
  };

  const handleUpdate = async () => {
    if (!user || !userData) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const accountId = userData.accounts[0]?.id; // Supondo que estamos editando a primeira conta
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
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }
  
    const accountId = userData.accounts[0]?.id; // Supondo que estamos editando a primeira conta
    if (!accountId) {
      Alert.alert("Erro", "Conta não encontrada.");
      return;
    }
  
    // Exibe o alerta de confirmação
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja excluir esta conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              // Chama o serviço para deletar a conta
              const response = await deleteAccount(accountId);
  
              // Atualiza os dados do usuário no contexto
              await refreshUserData(user.uid);
  
              handleRedirect(); // Retorna à tela anterior
              Alert.alert("Sucesso", "Conta excluída com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir conta:", error);
              Alert.alert("Erro", "Não foi possível excluir a conta.");
            }
          },
        },
      ]
    );
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
  const handleBankChange = (bank: { name: string; imageUri: string|undefined }) => {
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
