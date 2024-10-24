import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';

import { useGlobalStyles } from '~/styles/globalStyles';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { BackButton } from '~/components/BackButton';
import GlobalInput from '~/components/GlobalInput';
import React, { useState } from 'react';
import DropdownInput from '../../components/DropdownInput';
import GlobalSwitch from '~/components/GlobalSwitch';

export default function NewExpenseScreen() {
  const style = useGlobalStyles();
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [account, setAccount] = useState('');
  const [fixed, setFix] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [remind, setRemind] = useState('');

  const back = () => {
    console.log('back');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ScreenContent>
          <View></View>
          <BackButton onPress={back}></BackButton>
          <Text variant="headlineMedium" style={[style.title, styles.title]}>
            Despesa
          </Text>
          <Text variant="headlineMedium" style={[style.title, styles.title]}>
            Valor da despesa
          </Text>
          <Text variant="headlineMedium" style={[style.title, styles.title]}>
            R$ 150, 00
          </Text>
          <Text variant="headlineMedium" style={[style.title, styles.title]}>
            Despesa
          </Text>
          <Container rounded>
            <GlobalInput
              label="Descrição"
              value={name}
              onChangeText={setName}
              placeholder="Descrição de Despesa"
              prefixIcon="pencil"
              style={styles.input}
            />
            <DropdownInput
              label="Tags"
              value={tag}
              onSelect={setTag}
              options={['Tag 1', 'Tag 2', 'Tag 3']}
              placeholder="Selecione uma tag"
              prefixIcon="tag"
              style={styles.input}
            />
            <DropdownInput
              label="Conta"
              value={account}
              onSelect={setAccount}
              options={['Conta 1', 'Conta 2', 'Conta 3']}
              placeholder="Selecione uma Conta"
              prefixIcon="wallet"
              style={styles.input}
            />
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
  switch: {
    marginBottom: 0,
  },
});
