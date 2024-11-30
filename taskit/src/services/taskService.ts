import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase"; // Ajuste o caminho conforme necessário
import { Task, SubTask } from "../types/models"; // Ajuste o caminho conforme necessário

// Cria uma nova tarefa
export const createTask = async (
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const createTaskCallable = httpsCallable<
      { data: { task: Omit<Task, "id"> } },
      { message: string; task: Task }
    >(functions, "task-createTask");

    const response = await createTaskCallable({ data: { task } });
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
      { data: { taskId: string; task: Partial<Omit<Task, "id">> } },
      { message: string }
    >(functions, "task-updateTask");

    const response = await updateTaskCallable({
      data: { taskId, task },
    });
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
      { data: { taskId: string } },
      { message: string }
    >(functions, "task-deleteTask");

    const response = await deleteTaskCallable({ data: { taskId } });
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
      { data: { taskId: string } },
      { task: Task }
    >(functions, "task-getTask");

    const response = await getTaskCallable({ data: { taskId } });
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
    >(functions, "task-getAllTasks");

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
      { data: { taskId: string } },
      { message: string }
    >(functions, "task-toggleTaskStatus");

    const response = await toggleTaskStatusCallable({ data: { taskId } });
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
      { data: { taskId: string; subTaskTitle: string } },
      { message: string }
    >(functions, "task-toggleSubTaskStatus");

    const response = await toggleSubTaskStatusCallable({
      data: { taskId, subTaskTitle },
    });
    console.log("Status da subtarefa alternado:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao alternar status da subtarefa:", error);
    throw error;
  }
};
