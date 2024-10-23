import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { BackButton } from '~/components/BackButton';
import { ScreenContainer } from 'react-native-screens';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';

import Container from '../../components/Container';

import GlobalInput from '~/components/GlobalInput';
import { useGlobalStyles } from '~/styles/globalStyles';
import { ScreenContent } from '~/components/ScreenContent';
import GlobalSwitch from '~/components/GlobalSwitch';

export default function NewBankAccount() {
  const Globalstyles = useGlobalStyles();
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState('');
  const [accountType, setAccountType] = useState('');
  const [switch1, setSwitch1] = useState(false);

  const back = () => {
    console.log('back');
  };
  return (
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
            <GlobalInput
              label="Conta"
              value={account}
              onChangeText={setAccount}
              prefixIcon="wallet"
              style={styles.input}
            />
            <GlobalInput
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              prefixIcon="pencil"
              style={styles.input}
            />
            <GlobalInput
              label="Tipo da conta"
              value={accountType}
              onChangeText={setAccountType}
              prefixIcon="credit-card"
              style={styles.input}
            />
            <GlobalSwitch
              value={switch1}
              onValueChange={(value) => setSwitch1(value)}
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
        </ScreenContent>
      </ScrollView>
    </KeyboardAvoidingView>
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
  switch:{
    marginBottom: 120, 
  },
});
