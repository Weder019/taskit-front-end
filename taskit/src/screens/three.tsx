import { Text } from 'react-native';
import React, { useState } from 'react';
import Container from '../components/Container';
import { ScreenContent } from '../components/ScreenContent';
import { TextInput } from 'react-native-paper';

import { useGlobalStyles } from '~/styles/globalStyles';
import GlobalInput from '~/components/GlobalInput';

export default function TabTrheeScreen() {
  const Globalstyles = useGlobalStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  return (
    <ScreenContent title="Tab Three">
      <Container rounded>
        <GlobalInput
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          prefixIcon="account"
        />

        <GlobalInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          prefixIcon="email"
          error={!email.includes('@')} // Exibe erro se o e-mail não tiver '@'
        />

        <GlobalInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          prefixIcon="lock"
          suffixIcon="eye"
        />
      </Container>
    </ScreenContent>
  );
}
