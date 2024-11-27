import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase"; // Certifique-se de ajustar o caminho
import { Task, SubTask } from "../types/models"; // Ajuste o caminho conforme necessário

// Cria uma nova tarefa
export const createTask = async (
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const createTaskCallable = httpsCallable<
      { task: Omit<Task, "id"> },
      { message: string; task: Task }
    >(functions, "createTask");

    const response = await createTaskCallable({ task });
    console.log("Tarefa criada:", response.data.task);
    return response.data.task;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

// Atualiza uma tarefa existente
export const updateTask = async (
  taskId: string,
  task: Partial<Omit<Task, "id">>
): Promise<string> => {
  try {
    const updateTaskCallable = httpsCallable<
      { taskId: string; task: Partial<Omit<Task, "id">> },
      { message: string }
    >(functions, "updateTask");

    const response = await updateTaskCallable({ taskId, task });
    console.log("Tarefa atualizada:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

// Remove uma tarefa
export const deleteTask = async (taskId: string): Promise<string> => {
  try {
    const deleteTaskCallable = httpsCallable<
      { taskId: string },
      { message: string }
    >(functions, "deleteTask");

    const response = await deleteTaskCallable({ taskId });
    console.log("Tarefa removida:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao remover tarefa:", error);
    throw error;
  }
};

// Obtém uma tarefa específica
export const getTask = async (taskId: string): Promise<Task> => {
  try {
    const getTaskCallable = httpsCallable<
      { taskId: string },
      { task: Task }
    >(functions, "getTask");

    const response = await getTaskCallable({ taskId });
    console.log("Tarefa obtida:", response.data.task);
    return response.data.task;
  } catch (error) {
    console.error("Erro ao obter tarefa:", error);
    throw error;
  }
};

// Obtém todas as tarefas
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const getAllTasksCallable = httpsCallable<
      null,
      { tasks: Task[] }
    >(functions, "getAllTasks");

    const response = await getAllTasksCallable(null);
    console.log("Todas as tarefas obtidas:", response.data.tasks);
    return response.data.tasks;
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    throw error;
  }
};

// Alterna o status de conclusão de uma tarefa
export const toggleTaskStatus = async (taskId: string): Promise<string> => {
  try {
    const toggleTaskStatusCallable = httpsCallable<
      { taskId: string },
      { message: string }
    >(functions, "toggleTaskStatus");

    const response = await toggleTaskStatusCallable({ taskId });
    console.log("Status da tarefa alternado:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao alternar status da tarefa:", error);
    throw error;
  }
};

// Alterna o status de conclusão de uma subtarefa
export const toggleSubTaskStatus = async (
  taskId: string,
  subTaskTitle: string
): Promise<string> => {
  try {
    const toggleSubTaskStatusCallable = httpsCallable<
      { taskId: string; subTaskTitle: string },
      { message: string }
    >(functions, "toggleSubTaskStatus");

    const response = await toggleSubTaskStatusCallable({ taskId, subTaskTitle });
    console.log("Status da subtarefa alternado:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao alternar status da subtarefa:", error);
    throw error;
  }
};
