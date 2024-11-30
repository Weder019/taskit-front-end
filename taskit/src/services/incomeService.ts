import { httpsCallable } from 'firebase/functions';
import { functions } from '../utils/firebase'; // Certifique-se de ajustar o caminho
import { Income } from '../types/models'; // Ajuste o caminho conforme necessário

// Interfaces para respostas
interface CreateIncomeResponse {
  message: string;
  incomes: Income[];
}

interface DeleteIncomeResponse {
  message: string;
}

interface UpdateIncomeResponse {
  message: string;
}

interface GetIncomeResponse {
  income: Income;
  accountId: string;
}

interface GetAllIncomesResponse {
  incomesByAccount: {
    accountId: string;
    accountName: string;
    incomes: Income[];
  }[];
}

// Função para criar uma nova receita
export const createIncome = async (
  accountId: string,
  incomes: Omit<Income, 'id' | 'startDate'>[] & { startDate?: string }[]
): Promise<Income[]> => {
  try {
    const createIncomeCallable = httpsCallable<
      { accountId: string; incomes: Omit<Income, 'id'>[] },
      CreateIncomeResponse
    >(functions, 'account-createIncome');

    const response = await createIncomeCallable({ accountId, incomes });
    console.log('Receitas criadas:', response.data.incomes);
    return response.data.incomes;
  } catch (error) {
    console.error('Erro ao criar receitas:', error);
    throw error;
  }
};

// Função para remover uma receita
// Função para remover uma ou múltiplas receitas
export const deleteIncome = async (accountId: string, incomeIds: string[]): Promise<string> => {
  try {
    const deleteIncomeCallable = httpsCallable<
      { accountId: string; incomeIds: string[] },
      DeleteIncomeResponse
    >(functions, 'account-deleteIncome');

    const response = await deleteIncomeCallable({ accountId, incomeIds });

    return response.data.message;
  } catch (error) {
    console.error('Erro ao remover receitas:', error);
    throw error;
  }
};

// Função para atualizar uma receita
export const updateIncome = async (
  newAccountId: string,
  income: Income,
  oldAccountId?: string
): Promise<string> => {
  try {
    const updateIncomeCallable = httpsCallable<
      {
        oldAccountId?: string;
        newAccountId: string;
        income: Income;
      },
      UpdateIncomeResponse
    >(functions, 'account-updateIncome');

    const response = await updateIncomeCallable({
      oldAccountId,
      newAccountId,
      income,
    });
    return response.data.message;
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    throw error;
  }
};

// Função para obter uma receita específica
export const getIncome = async (incomeId: string): Promise<Income> => {
  try {
    const getIncomeCallable = httpsCallable<{ incomeId: string }, GetIncomeResponse>(
      functions,
      'account-getIncome'
    );

    const response = await getIncomeCallable({ incomeId });
    return response.data.income;
  } catch (error) {
    console.error('Erro ao obter receita:', error);
    throw error;
  }
};

// Função para obter todas as receitas
export const getAllIncomes = async (): Promise<
  { accountId: string; accountName: string; incomes: Income[] }[]
> => {
  try {
    const getAllIncomesCallable = httpsCallable<null, GetAllIncomesResponse>(
      functions,
      'account-getAllIncomes'
    );

    const response = await getAllIncomesCallable(null);
    return response.data.incomesByAccount;
  } catch (error) {
    console.error('Erro ao obter todas as receitas:', error);
    throw error;
  }
};
