import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import authService from '../services/authService'; // Certifique-se de importar corretamente
import { auth, firestore } from '../utils/firebase';

interface UserContextProps {
  user: User | null;
  userData: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, additionalData: any) => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode; // Definimos explicitamente o tipo de children
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth(); // Acesse diretamente o auth do Firebase aqui
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        const cachedData = await AsyncStorage.getItem(`userData-${currentUser.uid}`);
        if (cachedData) {
          setUserData(JSON.parse(cachedData)); // Carrega dados do cache
        }
        const data = await getUserData(currentUser.uid);
        setUserData(data);
        setLoading(false);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        await AsyncStorage.setItem(`userData-${uid}`, JSON.stringify(data)); // Cachear dados localmente
        const value = await AsyncStorage.getItem(`userData-${uid}`);
        console.log(value);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Erro ao buscar dados do Firestore:', error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      const data = await getUserData(userCredential.user.uid);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, additionalData: any) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Cria uma referência ao documento no Firestore
      const userDocRef = doc(firestore, 'users', user.uid);

      // Salva os dados no Firestore
      await setDoc(userDocRef, {
        email,
        ...additionalData,
      });

      const data = { email, ...additionalData };
      setUser(user);
      setUserData(data);
      await AsyncStorage.setItem(`userData-${user.uid}`, JSON.stringify(data)); // Cacheia os dados localmente
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setUserData(null);
    await AsyncStorage.removeItem(`userData-${user?.uid}`); // Limpa o cache local
  };

  return (
    <UserContext.Provider value={{ user, userData, loading, login, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
