export interface Expense {
  id: string;
  exp_name: string;
  category: string;
  value: number;
  date: string; // Ex: "30/10/2024"
  fixed?: boolean; // Se é uma despesa fixa
  startDate?: string;
  paid: boolean; // Se a despesa foi paga
}

export interface Income {
  id: string;
  inc_name: string;
  category: string;
  value: number;
  date: string; // Ex: "10/10/2024"
  fixed?: boolean; // Se é uma receita fixa
  startDate?: string;
  paid: boolean;
}

export interface Account {
  id: string; // ID único da conta
  acc_name: string; // Nome da conta (ex: "Conta Corrente")
  acc_type: string;
  bank: string; // Banco da conta (ex: "Nubank")
  expenses: Expense[]; // Lista de despesas associadas a esta conta
  incomes: Income[]; // Lista de receitas associadas a esta conta
  balance: number; // Saldo atual da conta
}

export interface SubTask {
  title: string;
  description: string;
  priority: number;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  data: string;
  priority: number;
  subTask: SubTask[];
  done: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
  accounts?: Account[]; // Lista de contas associadas ao usuário
  categories?: string[]; // Lista de categorias personalizadas
  tasks?: Task[]; // Lista de tarefas do usuário
}
export interface Category {
  name: string;
  type: string;
}
