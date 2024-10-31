import { useState } from 'react';

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  cell?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    let isValid = true;
    let error = '';

    if (!email) {
      isValid = false;
      error = 'O campo de email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      error = 'Formato de email inválido.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error,
    }));

    return isValid;
  };

  const validatePassword = (password: string) => {
    let isValid = true;
    let error = '';

    if (!password) {
      isValid = false;
      error = 'O campo de senha é obrigatório.';
    } else if (password.length < 6) {
      isValid = false;
      error = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: error,
    }));

    return isValid;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    let isValid = true;
    let error = '';

    if (!confirmPassword) {
      isValid = false;
      error = 'A confirmação de senha é obrigatória.';
    } else if (password !== confirmPassword) {
      isValid = false;
      error = 'As senhas não coincidem.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: error,
    }));

    return isValid;
  };

  const validateName = (name: string) => {
    let isValid = true;
    let error = '';

    if (!name) {
      isValid = false;
      error = 'O campo de nome é obrigatório.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      name: error,
    }));

    return isValid;
  };

  const validateCell = (cell: string) => {
    let isValid = true;
    let error = '';

    if (!cell) {
      isValid = false;
      error = 'O campo de celular é obrigatório.';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(cell)) { // Regex para o formato (XX) XXXXX-XXXX
      isValid = false;
      error = 'Formato de celular inválido. Use o formato (XX) XXXXX-XXXX.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      cell: error,
    }));

    return isValid;
  };

  // Função flexível para validar apenas os campos passados
  const validateForm = (fields: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    cell?: string;
  }) => {
    const { email, password, confirmPassword, name, cell } = fields;

    let isValid = true;

    if (email !== undefined) {
      isValid = validateEmail(email) && isValid;
    }
    if (password !== undefined) {
      isValid = validatePassword(password) && isValid;
    }
    if (confirmPassword !== undefined) {
      isValid = validateConfirmPassword(password!, confirmPassword) && isValid;
    }
    if (name !== undefined) {
      isValid = validateName(name) && isValid;
    }
    if (cell !== undefined) {
      isValid = validateCell(cell) && isValid;
    }

    return isValid;
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validateCell,
    validateForm,
  };
};
