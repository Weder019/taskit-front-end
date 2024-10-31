import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
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
import OpenModalButton from '~/screens/Financial/components/OpenModalButton';
import { useGlobalStyles } from '~/styles/globalStyles';

export default function NewBankAccount() {
  const Globalstyles = useGlobalStyles();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('00,00');
  // const [account, setAccount] = useState('');
  // const [accountType, setAccountType] = useState('');
  const [switch1, setSwitch1] = useState(false);

  const back = () => {
    console.log('back');
  };

  //Modal
  const bottomSheetAccount = useRef<BottomSheet>(null);
  const bottomSheetAccountType = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(6)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  // callbacks

  const handleSnapPressAccount = (index: number) => {
    bottomSheetAccount.current?.snapToIndex(index);
  };

  const handleSnapPressAccountType = (index: number) => {
    bottomSheetAccountType.current?.snapToIndex(index);
  };

  // render
  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

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
                Saldo atual da conta
              </Text>
              <EditableAmountInput
                value={amount}
                onChangeValue={setAmount}
                style={Globalstyles.title}
              />
            </View>
            <Container rounded>
              <OpenModalButton
                label="Conta"
                onPress={() => handleSnapPressAccount(0)}
                prefixIcon="wallet"
                error={false}
                errorMessage=""
                style={styles.openModal}
              />
              <GlobalInput
                label="Descrição"
                value={description}
                onChangeText={setDescription}
                prefixIcon="pencil"
                style={styles.input}
              />
              <OpenModalButton
                label="Tipo da conta"
                onPress={() => handleSnapPressAccountType(0)}
                prefixIcon="credit-card"
                error={false}
                errorMessage=""
                style={styles.openModal}
              />
              <GlobalSwitch
                value={switch1}
                onValueChange={setSwitch1}
                label="Incluir Soma na tela inicial"
                color="#37618E" // cor personalizada
                icon="help"
                style={styles.switch}
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
                    <View style={styles.contentContainer}>
                      <Text style={styles.containerHeadline}>Teste</Text>
                    </View>
                    {data.map(renderItem)}
                  </BottomSheetScrollView>
                </>
              }
            />

            <CustomBottomSheet
              title="Teste 2"
              ref={bottomSheetAccountType}
              snapPoints={['45%']}
              children={
                <>
                  <BottomSheetView>{data.map(renderItem)}</BottomSheetView>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
  },

  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 37,
    marginBottom: 30, // Espaço acima do botão
  },
  switch: {
    marginBottom: 120,
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
