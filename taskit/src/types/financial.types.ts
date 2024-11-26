export interface Expense {
  exp_name: string;
  category: string;
  value: number;
  date: string;
  fixed: boolean;
  paid: boolean;
}

export interface Income {
  inc_name: string;
  category: string;
  value: number;
  date: string; // Ex: "10/10/2024"
  fixed: boolean; // Se é uma receita fixa
  received: boolean;
}

export interface Account {
  id: string; // ID único da conta
  acc_name: string; // Nome da conta (ex: "Conta Corrente")
  acc_type: string; // Tipo da conta ("Opções do accountList")
  bank: string; // Banco da conta (ex: "Nubank")
  expenses: Expense[]; // Lista de despesas associadas a esta conta
  incomes: Income[]; // Lista de receitas associadas a esta conta
  balance: number; // Saldo atual da conta
}

export interface Category{
  name: string; // Nome da categoria
  type: string; 
}