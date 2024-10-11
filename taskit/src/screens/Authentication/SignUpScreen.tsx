import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';
import { useUser } from '../../context/UserContext';

import GlobalInput from '~/components/GlobalInput';
import { useGlobalStyles } from '~/styles/globalStyles';

export default function SignUpScreen() {
  const Globalstyles = useGlobalStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const { signUp } = useUser();

  const handleSignUp = async () => {
    try {
      await signUp(email, password, { name, cell }); // Passamos o nome como dado adicional
      // Redirecionar ou mostrar mensagem de sucesso
    } catch (error) {
      console.log('Erro ao registrar:', error);
      // Tratar erro (exibir mensagem, etc.)
    }
  };

  return (
    <ScreenContent isAuthenticationScreen>
      <Container rounded>
        <Text
          variant="headlineMedium"
          style={[Globalstyles.screenHeadLineDefalutStyle, styles.title]}>
          Cadastre-Se
        </Text>

        <GlobalInput
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          prefixIcon="account"
          style={styles.input}
        />

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
          label="Celular"
          value={cell}
          onChangeText={setCell}
          placeholder="Digite seu nome"
          prefixIcon="cellphone"
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

        <GlobalInput
          label="Confirme Sua Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          prefixIcon="lock"
          suffixIcon="eye"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSignUp}
          style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
          ENTRAR
        </Button>
      </Container>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 17,
    marginBottom: 27, // Espaço abaixo do título
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 37,
    marginBottom: 30, // Espaço acima do botão
  },
});
