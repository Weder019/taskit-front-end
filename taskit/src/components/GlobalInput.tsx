import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import { useGlobalStyles } from '~/styles/globalStyles';

// Define as propriedades que o componente aceitará
interface GlobalInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (args: any) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Tipos de teclado
  secureTextEntry?: boolean; // Para inputs de senha
  prefixIcon?: string; // Ícone à esquerda
  suffixIcon?: string; // Ícone à direita
  placeholder?: string;
  style?: ViewStyle; // Estilo personalizado
  mode?: 'outlined' | 'flat'; // Modo do input
  error?: boolean; // Exibe erro
  errorMessage?: string;
}

const GlobalInput: React.FC<GlobalInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  keyboardType = 'default',
  secureTextEntry = false,
  prefixIcon,
  suffixIcon,
  placeholder,
  style,
  mode = 'outlined',
  error = false,
  errorMessage = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const Globalstyles = useGlobalStyles();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[Globalstyles.inputDefaultStyle, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={!isPasswordVisible}
        placeholder={placeholder}
        mode={mode}
        error={error}
        onBlur={onBlur}
        style={Globalstyles.inputDefaultStyle} // Aplica estilo padrão + estilo customizado
        left={prefixIcon ? <TextInput.Icon icon={prefixIcon} /> : null} // Ícone à esquerda
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'} // Alterna o ícone de olho
              onPress={togglePasswordVisibility} // Alterna a visibilidade
            />
          ) : null
        }
      />
      {error && !!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

// Estilo padrão do componente
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
  },
});

export default GlobalInput;
