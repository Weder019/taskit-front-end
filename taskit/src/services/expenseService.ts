import { httpsCallable } from 'firebase/functions';
import { functions } from '../utils/firebase'; // Certifique-se de ajustar o caminho
import { Expense } from '../types/models'; // Ajuste o caminho conforme necessário

// Interfaces para respostas
interface CreateExpenseResponse {
  message: string;
  expenses: Expense[];
}

interface DeleteExpenseResponse {
  message: string;
}

interface UpdateExpenseResponse {
  message: string;
}

interface GetExpenseResponse {
  expense: Expense;
  accountId: string;
}

interface GetAllExpensesResponse {
  expensesByAccount: {
    accountId: string;
    accountName: string;
    expenses: Expense[];
  }[];
}

// Função para criar uma nova despesa
export const createExpense = async (
  accountId: string,
  expenses: Omit<Expense, 'id' | 'startDate'>[] & { startDate?: string }[]
): Promise<Expense[]> => {
  try {
    const createExpenseCallable = httpsCallable<
      { accountId: string; expenses: Omit<Expense, 'id'>[] },
      CreateExpenseResponse
    >(functions, 'account-createExpense');

    const response = await createExpenseCallable({ accountId, expenses });
    console.log('Despesas criadas:', response.data.expenses);
    return response.data.expenses;
  } catch (error) {
    console.error('Erro ao criar despesas:', error);
    throw error;
  }
};

// Função para remover uma despesa
export const deleteExpense = async (accountId: string, expenseIds: string[]): Promise<string> => {
  try {
    const deleteExpenseCallable = httpsCallable<
      { accountId: string; expenseIds: string[] },
      DeleteExpenseResponse
    >(functions, 'account-deleteExpense');

    const response = await deleteExpenseCallable({ accountId, expenseIds });

    return response.data.message;
  } catch (error) {
    console.error('Erro ao remover despesas:', error);
    throw error;
  }
};

// Função para atualizar uma despesa
export const updateExpense = async (
  newAccountId: string,
  expense: Expense,
  oldAccountId?: string
): Promise<string> => {
  try {
    const updateExpenseCallable = httpsCallable<
      {
        oldAccountId?: string;
        newAccountId: string;
        expense: Expense;
      },
      UpdateExpenseResponse
    >(functions, 'account-updateExpense');

    const response = await updateExpenseCallable({
      oldAccountId,
      newAccountId,
      expense,
    });
    return response.data.message;
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    throw error;
  }
};

// Função para obter uma despesa específica
export const getExpense = async (expenseId: string): Promise<Expense> => {
  try {
    const getExpenseCallable = httpsCallable<{ expenseId: string }, GetExpenseResponse>(
      functions,
      'account-getExpense'
    );

    const response = await getExpenseCallable({ expenseId });
    return response.data.expense;
  } catch (error) {
    console.error('Erro ao obter despesa:', error);
    throw error;
  }
};

// Função para obter todas as despesas
export const getAllExpenses = async (): Promise<
  { accountId: string; accountName: string; expenses: Expense[] }[]
> => {
  try {
    const getAllExpensesCallable = httpsCallable<null, GetAllExpensesResponse>(
      functions,
      'account-getAllExpenses'
    );

    const response = await getAllExpensesCallable(null);
    return response.data.expensesByAccount;
  } catch (error) {
    console.error('Erro ao obter todas as despesas:', error);
    throw error;
  }
};
