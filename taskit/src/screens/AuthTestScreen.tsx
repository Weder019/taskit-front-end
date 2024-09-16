import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';

import firebase from '../utils/firebase'; // Sua configuração do Firebase

const AuthTestScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Define o tipo de erro como string ou null
  const [user, setUser] = useState<User | null>(null); // Define o tipo do usuário como User ou null

  const handleLogin = async () => {
    const auth = getAuth(firebase);
    console.log(auth);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      setUser(userCredential.user);
    } catch (err: any) {
      // Especifica que 'err' pode ser de qualquer tipo
      if (err instanceof Error) {
        setError(err.message); // Acessa a mensagem de erro se o erro for uma instância de Error
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      {user && <Text>Logged in as: {user.email}</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default AuthTestScreen;
