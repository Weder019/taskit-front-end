import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, firestore } from '../utils/firebase'; // Importe o auth e firestore configurados

// Função para registrar um novo usuário
const signUp = async (email: string, password: string, additionalData: any) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Após criar o usuário, salvar os dados no Firestore
  await setDoc(doc(firestore, 'users', user.uid), {
    email,
    ...additionalData,
  });

  return user;
};

// Função para fazer login
const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Função para fazer logout
const logout = async () => {
  await signOut(auth);
};

// Função para buscar os dados do usuário no Firestore
const getUserData = async (uid: string) => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Exportando todas as funções como parte do authService
const authService = {
  signUp,
  login,
  logout,
  getUserData,
};

export default authService;
