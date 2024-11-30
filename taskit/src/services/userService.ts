import { httpsCallable } from 'firebase/functions';

import { User } from '../types/models'; // Certifique-se de ajustar o caminho para o modelo User
import { functions } from '../utils/firebase'; // Certifique-se de ajustar o caminho para sua configuração Firebase

// Tipos auxiliares para os retornos das funções
interface CreateUserResponse {
  user: User;
}

interface GetUserResponse {
  user: User;
}

interface UpdateUserResponse {
  message: string;
}

interface DeleteUserResponse {
  message: string;
}

// Função para criar um novo usuário
export const createUser = async (data: User): Promise<User> => {
  try {
    const createUserCallable = httpsCallable<User, CreateUserResponse>(
      functions,
      'user-createUser'
    );

    const response = await createUserCallable(data);
    return response.data.user;
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    throw error;
  }
};

// Função para buscar as informações de um usuário
export const getUser = async (uid: string): Promise<User> => {
  try {
    const getUserCallable = httpsCallable<{ uid: string }, GetUserResponse>(
      functions,
      'user-getUser'
    );
    const response = await getUserCallable({ uid });
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    throw error;
  }
};

// Função para atualizar as informações de um usuário
export const updateUser = async (data: Partial<User>): Promise<string> => {
  try {
    const updateUserCallable = httpsCallable<Partial<User>, UpdateUserResponse>(
      functions,
      'user-updateUser'
    );
    const response = await updateUserCallable(data);
    return response.data.message;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw error;
  }
};

// Função para excluir um usuário
export const deleteUser = async (uid: string): Promise<string> => {
  try {
    const deleteUserCallable = httpsCallable<{ uid: string }, DeleteUserResponse>(
      functions,
      'user-deleteUser'
    );
    const response = await deleteUserCallable({ uid });
    return response.data.message;
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    throw error;
  }
};
