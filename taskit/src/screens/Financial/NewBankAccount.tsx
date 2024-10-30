import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';

import Container from '../../components/Container';

import GlobalInput from '~/components/GlobalInput';
import { useGlobalStyles } from '~/styles/globalStyles';
import { ScreenContent } from '~/components/ScreenContent';
import GlobalSwitch from '~/components/GlobalSwitch';
import OpenModalButton from '~/components/OpenModalButton';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export default function NewBankAccount() {
  const Globalstyles = useGlobalStyles();
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState('');
  const [accountType, setAccountType] = useState('');
  const [switch1, setSwitch1] = useState(false);

  const back = () => {
    console.log('back');
  };

  //Modal
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(100)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ['55%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  return (
    <GestureHandlerRootView styles={styles.gesture}>
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
              <Text variant="headlineMedium" style={[Globalstyles.title, styles.balance]}>
                R$ 0,00
              </Text>
            </View>
            <Container rounded>
              <OpenModalButton
                label="Conta"
                value={account}
                placeholder="Escolha..."
                onPress={() => handleSnapPress(0)}
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
                value={accountType}
                placeholder="Escolha..."
                onPress={back}
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
            <BottomSheet
              ref={sheetRef}
              index={-1}
              snapPoints={snapPoints}
              enableDynamicSizing={false}
              onChange={handleSheetChange}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
              backgroundStyle={{ backgroundColor: '#37618E' }}
              handleIndicatorStyle={{ backgroundColor: '#FFF' }}>
              <View >
                <Text style={[Globalstyles.title, styles.title]}>text</Text>
              </View>
              <BottomSheetScrollView>{data.map(renderItem)}</BottomSheetScrollView>
            </BottomSheet>
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
  titleModal:{
    justifyContent: 'center'
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
    fontSize: 15,
  },
  balance: {
    fontSize: 25,
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
    marginBottom: 120,
  },
  gesture: {
    flex: 1,
  },
});
