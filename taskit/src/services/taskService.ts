import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase"; // Ajuste o caminho conforme necessário
import { Task, SubTask } from "../types/models"; // Ajuste o caminho conforme necessário


interface CreateTaskResponse {
  task: Task;
}

interface DeleteTaskResponse {
  message: string;
}
interface UpdateTaskResponse {
  message: string;
}

interface toggleSubTaskStatusResponse {
  message: string;
}
interface toggleTaskStatusResponse {
  message: string;
}
// Cria uma nova tarefa
export const createTask = async (
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const createTaskCallable = httpsCallable<
      { task: Omit<Task, "id"> },
      CreateTaskResponse
    >(functions, "task-createTask");

    const response = await createTaskCallable({ task });
    console.log("Tarefa criada:", response.data.task);
    return response.data.task;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};
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
// Atualiza uma tarefa existente
export const updateTask = async (
  taskId: string,
  task: Omit<Task, "id">
): Promise<UpdateTaskResponse> => {
  try {
    const updateTaskCallable = httpsCallable<
      { taskId: string; task: Omit<Task, "id">},
      { message: UpdateTaskResponse }
    >(functions, "task-updateTask");

    const response = await updateTaskCallable({
      taskId, task
    });
    console.log("Tarefa atualizada:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};




// Alterna o status de conclusão de uma tarefa
export const toggleTaskStatus = async (taskId: string): Promise<toggleTaskStatusResponse> => {
  try {
    const toggleTaskStatusCallable = httpsCallable<
      { taskId: string },
      { message: toggleTaskStatusResponse }
    >(functions, "task-toggleTaskStatus");

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
  subTaskTitles: string[]
): Promise<toggleSubTaskStatusResponse> => {
  try {
    const toggleSubTaskStatusCallable = httpsCallable<
      { taskId: string; subTaskTitles: string[] },
      { message: toggleSubTaskStatusResponse }
    >(functions, "task-toggleSubTaskStatus");

    const response = await toggleSubTaskStatusCallable({
       taskId, subTaskTitles
    });
    
    return response.data.message;
  } catch (error) {
    console.error("Erro ao alternar status da subtarefa:", error);
    throw error;
  }
};
