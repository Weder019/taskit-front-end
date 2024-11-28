import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase"; // Certifique-se de que está configurado corretamente
import { Category } from "../types/models"; // Ajuste o caminho conforme necessário

// Função para criar uma nova categoria
export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const createCategoryCallable = httpsCallable<{ category: Category }, { message: string; category: Category }>(
      functions,
      "createCategory"
    );

    const response = await createCategoryCallable({ category });
    console.log("Categoria criada:", response.data.category);
    return response.data.category;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

// Função para remover uma categoria
export const deleteCategory = async (categoryName: string): Promise<string> => {
  try {
    const deleteCategoryCallable = httpsCallable<{ categoryName: string }, { message: string }>(
      functions,
      "deleteCategory"
    );

    const response = await deleteCategoryCallable({ categoryName });
    console.log("Categoria removida:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao remover categoria:", error);
    throw error;
  }
};

// Função para obter todas as categorias do usuário
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const getAllCategoriesCallable = httpsCallable<{}, { message: string; categories: Category[] }>(
      functions,
      "getAllCategories"
    );

    const response = await getAllCategoriesCallable({});
    console.log("Categorias obtidas:", response.data.categories);
    return response.data.categories;
  } catch (error) {
    console.error("Erro ao obter categorias:", error);
    throw error;
  }
};
