import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'userData';

export const saveUserData = async (uid: string, data: any) => {
  try {
    await AsyncStorage.setItem(`${USER_KEY}-${uid}`, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

export const getUserData = async (uid: string) => {
  try {
    const data = await AsyncStorage.getItem(`${USER_KEY}-${uid}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

export const clearUserData = async (uid: string) => {
  try {
    await AsyncStorage.removeItem(`${USER_KEY}-${uid}`);
  } catch (error) {
    console.error('Erro ao remover dados do usuário:', error);
  }
};
