import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'appSettings';

export const saveAppSettings = async (settings: any) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações do app:', error);
  }
};

export const getAppSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Erro ao recuperar configurações do app:', error);
    return null;
  }
};

export const deleteAppSettings = async () => {
  try {
    await AsyncStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error('Erro ao remover configurações do app:', error);
  }
};
