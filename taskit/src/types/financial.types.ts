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
  paid: boolean;
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

export interface Transaction {
  id: string;
  date: string;
  category: string;
  value: number;
  paid: boolean;
  exp_name?: string; // Nome da despesa (opcional porque será usado apenas para despesas)
  inc_name?: string; // Nome da receita (opcional porque será usado apenas para receitas)
}

export interface Category{
  name: string; // Nome da categoria
  type: string; 
}