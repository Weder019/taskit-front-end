import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
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

type NewBankAccountScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewBankAccount'>;

export default function NewBankAccount() {
  const Globalstyles = useGlobalStyles();
  const navigation = useNavigation<NewBankAccountScreenNavigationProp>();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('00,00');
  const [selectedBank, setSelectedBank] = useState<{ name: string; imageUri: string } | null>(null);
  const [selectedAccountIcon, setSelectedAccountIcon] = useState('wallet');
  const [selectedAccountType, setSelectedAccountType] = useState('Selecione o tipo da conta');

  const bankList = [
    { name: 'Nubank', imageUri: 'https://logopng.com.br/logos/nubank-95.png' },
    {
      name: 'Banco do Brasil',
      imageUri: 'https://assets.hgbrasil.com/finance/companies/big/banco-do-brasil.png',
    },
    {
      name: 'Itaú',
      imageUri:
        'https://upload.wikimedia.org/wikipedia/commons/2/2d/2023_Ita%C3%BA_Unibanco_Logo.png',
    },
    {
      name: 'Bradesco',
      imageUri: 'https://logospng.org/download/bradesco/logo-bradesco-escudo-1024.png',
    },
    {
      name: 'Caixa Econômica Federal',
      imageUri:
        'https://www.clipartmax.com/png/small/97-972438_reforma-trabalhista-acaba-com-incorpora%C3%A7%C3%A3o-de-fun%C3%A7%C3%A3o-caixa-econ%C3%B4mica-federal.png',
    },
    {
      name: 'Santander',
      imageUri:
        'https://w7.pngwing.com/pngs/181/292/png-transparent-santander-group-santander-bank-logo-quiz-ultimate-bank-text-hand-logo.png',
    },
    {
      name: 'Banco Safra',
      imageUri: 'https://logospng.org/download/banco-safra/logo-banco-safra-icon-4096.png',
    },
    {
      name: 'BTG Pactual',
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrGLKgEY6wZE4qsTYuCe2nHn947_jdCPTkQ&s',
    },
    {
      name: 'Banco Votorantim',
      imageUri: 'https://logospng.org/wp-content/uploads/bv-financeira.png',
    },
    {
      name: 'Banco Inter',
      imageUri: 'https://i.pinimg.com/474x/ab/2a/a1/ab2aa12174248670698405c4ca454a48.jpg',
    },
    {
      name: 'Banco Original',
      imageUri: 'https://pbs.twimg.com/profile_images/1381393729790091266/OpNx3ruq_400x400.png',
    },
    {
      name: 'Banco Pan',
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUVDb5OEnUXCGg3CNTS9s3ljyDbKpta8om-w&s',
    },
    {
      name: 'Banco Modal',
      imageUri: 'https://logowik.com/content/uploads/images/banco-modal7606.logowik.com.webp',
    },
    {
      name: 'XP Investimentos',
      imageUri: 'https://www.logoscapital.com.br/wp-content/uploads/2020/12/icone-XP.png',
    },

    {
      name: 'C6 Bank',
      imageUri:
        'https://cdn.adtechpanda.com/33879e54-e00d-4c8d-9e13-c061b0e9d7ef/-/format/jpeg/-/quality/lightest/',
    },
    {
      name: 'Banco Next',
      imageUri: 'https://logospng.org/wp-content/uploads/banco-next.png',
    },
    {
      name: 'Agibank',
      imageUri:
        'https://kolor360.com/agibank/lojaconceito/uploads/vr/5f1b5cd0ffd0e15531a5bf5d/asset/1595885365-1.png',
    },
    {
      name: 'PagBank (PagSeguro)',
      imageUri: 'https://seeklogo.com/images/P/pagseguro-logo-B23BF76524-seeklogo.com.png',
    },
    {
      name: 'Banco ABC Brasil',
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YH2vh2gGgRBLENVC_SlpMyITarbzQs6xpg&s',
    },

    {
      name: 'Goldman Sachs',
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2OVdEFL3Chjmni3eyiKJYiS7rjZMqOL7ZQ&s',
    },
    {
      name: 'J.P. Morgan',
      imageUri:
        'https://e7.pngegg.com/pngimages/751/120/png-clipart-jpmorgan-chase-logo-jpmorgan-corporate-challenge-j-p-morgan-co-others-miscellaneous-text.png',
    },
    {
      name: 'Morgan Stanley',
      imageUri: 'https://i.pinimg.com/originals/e9/6c/0a/e96c0a272b688696826189822221b6f9.png',
    },
  ];

  const accountTypeList = [
    { name: 'Carteira', iconName: 'wallet' },
    { name: 'Conta Corrente', iconName: 'bank' },
    { name: 'Poupança', iconName: 'download' },
    { name: 'Investimentos', iconName: 'trending-up' },
    { name: 'Outros', iconName: 'dots-horizontal' },
  ];

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
  const handleBankChange = (bank: { name: string; imageUri: string } | null) => {
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
            <Container rounded>
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
                onPress={back}
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
    marginTop: 305,
    marginBottom: 30, // Espaço acima do botão
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
});
