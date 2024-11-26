import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { getUser, createUser as createFirestoreUser } from './userService'; // userService lida com Firestore
import { saveUserData, getUserData, clearUserData } from '../storage/userStorage'; // Armazenamento local
import { auth } from '../utils/firebase'; // Configuração do Firebase
import { User as UserType } from "../types/models";

// Login do usuário
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = userCredential.user;

    // Busca dados no Firestore
    const userData = await getUser(loggedInUser.uid);

    // Salva os dados localmente
    if (userData) {
      await saveUserData(loggedInUser.uid, userData);
    }

    return loggedInUser;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Cadastro do usuário
export const signUp = async (
  email: string,
  password: string,
  additionalData: Partial<UserType>
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    console.log(newUser);
    // Cria dados no Firestore
    const userData: UserType = {
      id: newUser.uid,
      email,
      name: additionalData.name || 'Nome Padrão', // Valor padrão para 'name'
      cell: additionalData.cell || 'Sem telefone', // Valor padrão para 'cell'
    };
    const newUserData = await createFirestoreUser(userData);
    console.log(newUserData);

    // Salva os dados localmente
    await saveUserData(newUser.uid, newUserData);

    return newUser;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
};

// Logout do usuário
export const logout = async (): Promise<void> => {
  try {
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      // Limpa os dados localmente
      await clearUserData(currentUser.uid);
    }

    // Faz logout no Firebase
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

// Recupera os dados do usuário localmente
export const getStoredUser = async (uid: string): Promise<any | null> => {
  try {
    return await getUserData(uid);
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário localmente:', error);
    throw error;
  }
};
