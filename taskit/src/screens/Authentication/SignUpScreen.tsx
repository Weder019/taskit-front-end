import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';
import { useUser } from '../../context/UserContext';
import { AuthStackParamList } from '../../navigation/auth-navigator';

import GlobalInput from '~/components/GlobalInput';
import { useGlobalStyles } from '~/styles/globalStyles';
import { useFormValidation } from '~/hooks/useFormValidation';

type SignUpScreenNavigationProp = NavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const Globalstyles = useGlobalStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const { signUp } = useUser();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { errors, validateForm } = useFormValidation();

  // Apenas ajuste a função handleSignUp para passar os campos adequados
  const handleSignUp = async () => {
    if (validateForm({ email, password, confirmPassword, name, cell })) {
      try {
        await signUp(email, password, { name, cell });
        // Redirecionar ou mostrar mensagem de sucesso
      } catch (error) {
        console.log('Erro ao registrar:', error);
        // Tratar erro (exibir mensagem, etc.)
      }
    } else {
      console.log('Erro na validação do formulário.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login'); // Navega para a tela de login
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
              error={!!errors.name}
              errorMessage={errors.name}
              style={styles.input}
            />

            <GlobalInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
              prefixIcon="email"
              error={!!errors.email} // Exibe erro se houver
              errorMessage={errors.email} // Exibe a mensagem de erro
              style={styles.input}
            />

            <GlobalInput
              label="Celular"
              value={cell}
              onChangeText={setCell}
              placeholder="Digite seu celular"
              keyboardType="phone-pad"
              prefixIcon="cellphone"
              error={!!errors.cell}
              errorMessage={errors.cell}
              style={styles.input}
            />

            <GlobalInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              secureTextEntry
              prefixIcon="lock"
              error={!!errors.password} // Exibe erro se houver
              errorMessage={errors.password} // Exibe a mensagem de erro
              style={styles.input}
            />

            <GlobalInput
              label="Confirme Sua Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry
              prefixIcon="lock"
              suffixIcon="eye"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleSignUp}
              style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
              ENTRAR
            </Button>

            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
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
  title: {
    marginTop: 17,
    marginBottom: 27, // Espaço abaixo do título
  },
  input: {
    marginBottom: 25, // Espaço entre os inputs
  },
  button: {
    marginTop: 17,
    marginBottom: 20, // Espaço acima do botão
  },
  loginText: {
    color: '#007bff', // Estilo de link
    textAlign: 'center',
    textDecorationLine: 'underline', // Adiciona sublinhado
  },
});
