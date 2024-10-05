import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';

import GlobalInput from '~/components/GlobalInput';
import { useGlobalStyles } from '~/styles/globalStyles';

export default function LoginScreen() {
  const Globalstyles = useGlobalStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  return (
    <ScreenContent isAuthenticationScreen>
      <Container rounded>
        <Text
          variant="headlineMedium"
          style={[Globalstyles.screenHeadLineDefalutStyle, styles.title]}>
          Login
        </Text>

        <GlobalInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          prefixIcon="email"
          error={!email.includes('@')}
          style={styles.input}
        />

        <GlobalInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          prefixIcon="lock"
          suffixIcon="eye"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
          ENTRAR
        </Button>
      </Container>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 27,
    marginBottom: 48, // Espaço abaixo do título
  },
  input: {
    marginBottom: 38, // Espaço entre os inputs
  },
  button: {
    marginTop: 47,
    marginBottom: 150, // Espaço acima do botão
  },
});
