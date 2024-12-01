import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { login, signUp, logout, getStoredUser } from '../services/authService';
import { saveUserData, getUserData, clearUserData } from '../storage/userStorage';

import { getUser } from '~/services/userService';

interface UserContextProps {
  user: User | null;
  userData: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, additionalData: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: (uid: string) => Promise<void>; // Nova função
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuthState = async () => {
      setLoading(true);
      const auth = getAuth();
      onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const cachedData = await getUserData(currentUser.uid);
          setUserData(cachedData);

          const data = await getStoredUser(currentUser.uid);
          if (data) {
            await saveUserData(currentUser.uid, data);
            setUserData(data);
            await refreshUserData(currentUser.uid);
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
    };

    initializeAuthState();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);

      const data = await getStoredUser(loggedInUser.uid);

      if (data) {
        await saveUserData(loggedInUser.uid, data);
        setUserData(data);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, additionalData: any) => {
    setLoading(true);
    try {
      const newUser = await signUp(email, password, additionalData);
      setUser(newUser);

      const data = await getUserData(newUser.uid);
      await saveUserData(newUser.uid, data);
      setUserData(data);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      if (user) {
        await clearUserData(user.uid);
      }
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Erro ao sair:', error);
      throw error;
    }
  };

  const refreshUserData = async (uid: string) => {
    setLoading(true);
    try {
      if (!uid) {
        throw new Error('UID não fornecido');
      }

      // Busca os dados atualizados do Firestore usando o UID fornecido
      const updatedData = await getUser(uid);
      console.log('vai corinthians');

      if (updatedData) {
        // Salva os dados no AsyncStorage
        await saveUserData(uid, updatedData);

        // Atualiza o estado global
        setUserData(updatedData);
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      throw error; // Caso precise tratar o erro no componente
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        loading,
        login: handleLogin,
        signUp: handleSignUp,
        logout: handleLogout,
        refreshUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
