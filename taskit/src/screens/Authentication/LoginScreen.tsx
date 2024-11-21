import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button, Text, ActivityIndicator, Snackbar } from 'react-native-paper';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';
import { useUser } from '../../context/UserContext';
import { AuthStackParamList } from '../../navigation/auth-navigator'; // Importe o tipo de parâmetro de navegação

import GlobalInput from '~/components/GlobalInput';
import { useFormValidation } from '~/hooks/useFormValidation'; // Importa o hook de validação
import { useGlobalStyles } from '~/styles/globalStyles';

type LoginScreenNavigationProp = NavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const Globalstyles = useGlobalStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login, loading } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Tipagem de navegação
  const { errors, validateForm } = useFormValidation(); // Hook de validação

  const handleLogin = async () => {
    if (validateForm({ email, password })) {
      try {
        await login(email, password);
        console.log('VAI CURINTIA');
        // Redirecionar ou mostrar mensagem de sucesso
      } catch (error) {
        console.log(error);
        setErrorMessage('Erro ao fazer login. Verifique suas informações.');
        // Tratar erro (exibir mensagem, etc.)
      }
    } else {
      console.log('Erro na validação do formulário.');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('SignUp'); // Navega para a tela de registro (verifique o nome correto da rota)
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
              Login
            </Text>

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

            {loading ? (
              <ActivityIndicator animating size="large" />
            ) : (
              <Button
                mode="contained"
                onPress={handleLogin}
                style={[Globalstyles.containedButtonDefaultStyle, styles.button]}>
                ENTRAR
              </Button>
            )}

            <TouchableOpacity onPress={handleRegisterRedirect}>
              <Text style={styles.registerText}>Não tem conta? Registre-se</Text>
            </TouchableOpacity>
          </Container>
        </ScreenContent>
      </ScrollView>
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage('')}
        action={{
          label: 'Fechar',
          onPress: () => {
            setErrorMessage('');
          },
        }}>
        {errorMessage}
      </Snackbar>
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
  registerText: {
    color: '#007bff', // Estilo de link (você pode ajustar a cor)
    textAlign: 'center',
    textDecorationLine: 'underline', // Adiciona sublinhado
  },
});
