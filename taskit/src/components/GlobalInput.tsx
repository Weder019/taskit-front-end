import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useGlobalStyles } from '~/styles/globalStyles';

// Define as propriedades que o componente aceitará
interface GlobalInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Tipos de teclado
  secureTextEntry?: boolean; // Para inputs de senha
  prefixIcon?: string; // Ícone à esquerda
  suffixIcon?: string; // Ícone à direita
  placeholder?: string;
  style?: ViewStyle; // Estilo personalizado
  mode?: 'outlined' | 'flat'; // Modo do input
  error?: boolean; // Exibe erro
}

const GlobalInput: React.FC<GlobalInputProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  prefixIcon,
  suffixIcon,
  placeholder,
  style,
  mode = 'outlined',
  error = false,
}) => {
  const Globalstyles = useGlobalStyles();
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      mode={mode}
      error={error}
      style={[Globalstyles.inputDefaultStyle, style]} // Aplica estilo padrão + estilo customizado
      left={prefixIcon ? <TextInput.Icon icon={prefixIcon} /> : null} // Ícone à esquerda
      right={suffixIcon ? <TextInput.Icon icon={suffixIcon} /> : null} // Ícone à direita
    />
  );
};

// Estilo padrão do componente
const styles = StyleSheet.create({
  defaultStyle: {
    marginBottom: 16,
    backgroundColor: 'white', // Definir fundo padrão
  },
});

export default GlobalInput;
