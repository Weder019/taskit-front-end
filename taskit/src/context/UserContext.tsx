import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import authService from '../services/authService'; // Certifique-se de importar corretamente

interface UserContextProps {
  user: User | null;
  userData: any;
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

  useEffect(() => {
    const auth = getAuth(); // Acesse diretamente o auth do Firebase aqui
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await authService.getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
    const data = await authService.getUserData(user.uid);
    setUserData(data);
  };

  const signUp = async (email: string, password: string, additionalData: any) => {
    const user = await authService.signUp(email, password, additionalData);
    setUser(user);
    setUserData(additionalData); // Aqui salvamos os dados fornecidos no Firestore
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ user, userData, login, signUp, logout }}>
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
