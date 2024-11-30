import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements';

import { useGlobalStyles } from '~/styles/globalStyles';

interface GlobalInputBottomSheetProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (args: any) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Tipos de teclado
  prefixIcon?: string; // Nome do ícone à esquerda
  suffixIcon?: string; // Nome do ícone à direita
  placeholder?: string;
  style?: ViewStyle; // Estilo personalizado
  error?: boolean; // Exibe erro
  errorMessage?: string;
}

const GlobalInputBottomSheet: React.FC<GlobalInputBottomSheetProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  keyboardType = 'default',
  prefixIcon,
  suffixIcon,
  placeholder,
  style,
  error = false,
  errorMessage = '',
}) => {
  const Globalstyles = useGlobalStyles();

  return (
    <View style={[Globalstyles.inputDefaultStyle, style]}>
      {/* Label */}
      {label ? <Text style={styles.label}>{label}</Text> : null}

      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Ícone à Esquerda */}
        {prefixIcon && (
          <Icon
            name={prefixIcon}
            type="material"
            size={20}
            color="#555"
            containerStyle={styles.prefixIcon}
          />
        )}

        {/* Input */}
        <BottomSheetTextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onBlur={onBlur}
          style={[
            styles.input,
            Globalstyles.inputDefaultStyle,
            error ? styles.inputError : null, // Estilo de erro
          ]}
        />

        {/* Ícone à Direita */}
        {suffixIcon && (
          <Icon
            name={suffixIcon}
            type="material"
            size={20}
            color="#555"
            containerStyle={styles.suffixIcon}
          />
        )}
      </View>

      {/* Mensagem de Erro */}
      {error && !!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 40, // Espaço para o ícone à esquerda
    paddingRight: 40, // Espaço para o ícone à direita
    
    fontSize: 18,
  },
  inputError: {
    borderColor: 'red',
  },
  prefixIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  suffixIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  
});

export default GlobalInputBottomSheet;
