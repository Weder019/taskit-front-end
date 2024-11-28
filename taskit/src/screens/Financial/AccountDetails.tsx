import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon, Button, Text } from 'react-native-paper';

import IconDetails from './components/IconDetails';
import SelectItem from './components/SelectItem';
import SelectorAccount from './components/SelectorAccount';
import StaticSelectItem from './components/StaticSelectItem';
import Container from '../../components/Container';

import { BackButton } from '~/components/BackButton';
import CircularButton from '~/components/CircularButton';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import { ScreenContent } from '~/components/ScreenContent';
import { useGlobalStyles } from '~/styles/globalStyles';
import { Account } from '~/types/financial.types';
import { accountTypeList } from '~/utils/accountTypeList';
import { getBankImageUri } from '~/utils/bankList';
export default function AccountDetails() {
  const Globalstyles = useGlobalStyles();

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
      bank: 'Caixa Econômica Federal',
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

  const back = () => {
    console.log('back');
  };

  const handleDelete = () => {
    console.log('deletar');
  };
  const [selectedAccount, setSelectedAccount] = useState(userAccounts[0]);

  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [inputBalance, setInputBalance] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const bankIconUri = getBankImageUri(selectedAccount.bank);

  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetBalance = useRef<BottomSheet>(null);

  const handleSnapPressAccount = () => {
    bottomSheetAccount.current?.snapToIndex(0);
  };

  const handleAccountChange = (accountId: string) => {
    const account = userAccounts.find((acc) => acc.id === accountId);
    if (account) {
      setSelectedAccount(account);
    }
    bottomSheetAccount.current?.close();
  };

  const handleEditBalance = () => {
    setInputBalance(selectedAccount.balance.toFixed(2).replace('.', ','));
    setIsEditingBalance(true);
    setIsConfirmed(false); // Reseta a confirmação
  };

  const handleBlur = () => {
    if (isConfirmed) {
      bottomSheetBalance.current?.snapToIndex(0); // Abre o BottomSheet
    }
    setIsEditingBalance(false);
  };

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/[^\d]/g, '');
    const formattedText = (parseInt(numericText, 10) / 100).toFixed(2).replace('.', ',');
    setInputBalance(formattedText);
  };

  const handleSubmitEditing = () => {
    setIsConfirmed(true); // Marca como confirmado
  };

  const handleConfirmBalance = () => {
    const updatedBalance = parseFloat(inputBalance.replace(',', '.'));
    if (!isNaN(updatedBalance)) {
      setUserAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.id === selectedAccount.id ? { ...acc, balance: updatedBalance } : acc
        )
      );
      setSelectedAccount((prev) => ({ ...prev, balance: updatedBalance }));
    }
    bottomSheetBalance.current?.close(); // Fecha o BottomSheet
  };

  const handleDiscardBalance = () => {
    bottomSheetBalance.current?.close(); // Fecha o BottomSheet
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
              <View style={{ flex: 1, alignItems: 'center', marginLeft:50 }}>
                <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
                  Detalhes
                </Text>
              </View>
            </View>
            <View>
              <SelectorAccount
                value={selectedAccount.acc_name}
                onPress={handleSnapPressAccount}
                style={styles.buttonAccountName}
              />
            </View>
            <Container rounded>
              <View>
                <Text style={styles.subtitle}>Saldo atual</Text>
                {isEditingBalance ? (
                  <TextInput
                    style={[styles.currency, styles.input]}
                    keyboardType="numeric"
                    value={inputBalance}
                    onChangeText={handleChangeText}
                    onBlur={handleBlur} // Ação ao clicar fora
                    onSubmitEditing={handleSubmitEditing} // Ação ao pressionar "OK"
                    autoFocus
                  />
                ) : (
                  <Text style={styles.currency}>R$ {selectedAccount.balance.toFixed(2)}</Text>
                )}
                <Button
                  mode="contained"
                  onPress={handleEditBalance}
                  style={styles.button}
                  labelStyle={styles.labelStyle}>
                  Reajustar Saldo
                </Button>
                <View style={styles.line} />
              </View>
              <View>
                <StaticSelectItem
                  bankName={selectedAccount.bank || 'Banco não informado'}
                  bankIconUri={bankIconUri}
                />
                <IconDetails
                  iconName="wallet"
                  title="Tipo da conta"
                  subtitle={selectedAccount.acc_type}
                  iconColor="#FFFFFF"
                  iconSize={32}
                />
                <IconDetails
                  iconName="cart-outline"
                  title="Qtd. de despesas"
                  subtitle={`${selectedAccount.expenses}`}
                  iconColor="#FFFFFF"
                  iconSize={32}
                />
                <IconDetails
                  iconName="cash-plus"
                  title="Qtd. de receitas"
                  subtitle={`${selectedAccount.incomes}`}
                  iconColor="#FFFFFF"
                  iconSize={32}
                />

                <View style={styles.detailsContainer}>
                  <IconDetails
                    iconName="swap-horizontal"
                    title="Qtd. de transferências"
                    subtitle="Carteira"
                    iconColor="#FFFFFF"
                    iconSize={32}
                    style={styles.iconDetails} // Adicione um estilo consistente
                  />
                  <CircularButton onPress={back} iconName="pencil" size={48} />
                </View>
              </View>
            </Container>
            <CustomBottomSheet
              ref={bottomSheetBalance}
              snapPoints={['29%']}
              children={
                <BottomSheetView style={styles.bottomSheetContent}>
                  <Text style={styles.bottomSheetText}>Alterar o saldo para</Text>
                  <Text style={styles.currencyBottomSheet}>R$ {inputBalance}</Text>
                  <View style={styles.bottomSheetButtons}>
                    <Button mode="outlined" onPress={handleDiscardBalance}>
                      Descartar
                    </Button>
                    <Button mode="contained" onPress={handleConfirmBalance}>
                      Confirmar
                    </Button>
                  </View>
                </BottomSheetView>
              }
            />

            <CustomBottomSheet
              ref={bottomSheetAccount}
              snapPoints={['65%']}
              children={
                <>
                  <BottomSheetView>
                    <Text style={styles.BottomSheetTitle}>Selecione a conta</Text>
                    {userAccounts.map((account) => {
                      const icon =
                        accountTypeList.find((item) => item.name === account.acc_type)?.iconName ||
                        'wallet';
                      return (
                        <SelectItem
                          key={account.id}
                          label={account.acc_name}
                          type="categoria"
                          value={{ name: account.acc_name, imageUri: '' }}
                          selectedValue={selectedAccount.acc_name}
                          onChange={() => handleAccountChange(account.id)}
                          iconName={icon}
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
    alignSelf: 'center',
  },
  currency: {
    fontSize: 32,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonAccountName: {
    width: '60%',
    alignSelf: 'center',
    padding: 2,
    marginTop: 10,
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    padding: 2,
    marginTop: 10,
  },
  labelStyle: {
    fontSize: 18,
    color: '#fff',
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

  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderStyle: 'dashed', // Linha pontilhada
    marginVertical: 20,
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
  editContainer: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomSheetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
  },
  currencyBottomSheet: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 0, // Espaçamento nas laterais
  },
  iconDetails: {
    flex: 1, // Permite que o IconDetails ocupe espaço uniformemente
    marginRight: 16, // Espaçamento do lado direito para o CircularButton
  },
});
