import { httpsCallable } from 'firebase/functions';
import { Account } from '../types/models'; // Ajuste o caminho conforme necessário
import { functions } from '../utils/firebase'; // Certifique-se de que está configurado corretamente

interface CreateAccountResponse {
  account: Account;
}

interface UpdateAccountResponse {
  message: string;
}

interface DeleteAccountResponse {
  message: string;
}

// Cria uma nova conta
export const createAccount = async (
  account: Omit<Account, 'id' | 'expenses' | 'incomes'>
): Promise<Account> => {
  try {
    const createAccountCallable = httpsCallable<
      { account: Omit<Account, 'id' | 'expenses' | 'incomes'> },
      CreateAccountResponse
    >(functions, 'account-createAccount');

    const response = await createAccountCallable({ account });
    console.log('Conta criada:', response.data.account);
    return response.data.account;
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    throw error;
  }
};

// Atualiza uma conta existente
export const updateAccount = async (
  accountId: string,
  account: Omit<Account, 'id' | 'expenses' | 'incomes'>
): Promise<UpdateAccountResponse> => {
  try {
    const updateAccountCallable = httpsCallable<
      { accountId: string; account: Omit<Account, 'id' | 'expenses' | 'incomes'> },
      { message: UpdateAccountResponse }
    >(functions, 'account-updateAccount');

    const response = await updateAccountCallable({
      accountId,
      account,
    });

    return response.data.message;
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    throw error;
  }
};

// Remove uma conta
export const deleteAccount = async (accountId: string): Promise<DeleteAccountResponse> => {
  try {
    const deleteAccountCallable = httpsCallable<
      { accountId: string },
      { message: DeleteAccountResponse }
    >(functions, 'account-deleteAccount');

    const response = await deleteAccountCallable({ accountId });
    console.log('Conta removida:', response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Erro ao remover conta:', error);
    throw error;
  }
};

// // Obtém uma conta específica
// export const getAccount = async (accountId: string): Promise<Account> => {
//   try {
//     const getAccountCallable = httpsCallable<
//       { accountId: string },
//       { message: string; account: Account }
//     >(functions, 'getAccount');

//     const response = await getAccountCallable({ accountId });
//     return response.data.account;
//   } catch (error) {
//     console.error('Erro ao obter conta:', error);
//     throw error;
//   }
// };

// // Obtém todas as contas do usuário
// export const getAllAccounts = async (): Promise<Account[]> => {
//   try {
//     const getAllAccountsCallable = httpsCallable<object, { message: string; accounts: Account[] }>(
//       functions,
//       'getAllAccounts'
//     );

//     const response = await getAllAccountsCallable({});
//     return response.data.accounts;
//   } catch (error) {
//     console.error('Erro ao obter todas as contas:', error);
//     throw error;
//   }
// };

// // Atualiza o saldo de uma conta específica
// export const updateAccountBalance = async (
//   accountId: string,
//   value: number,
//   operation: 'add' | 'subtract'
// ): Promise<string> => {
//   try {
//     const updateAccountBalanceCallable = httpsCallable<
//       { accountId: string; value: number; operation: 'add' | 'subtract' },
//       { message: string }
//     >(functions, 'updateAccountBalance');

//     const response = await updateAccountBalanceCallable({ accountId, value, operation });
//     return response.data.message;
//   } catch (error) {
//     console.error('Erro ao atualizar saldo da conta:', error);
//     throw error;
//   }
// };
