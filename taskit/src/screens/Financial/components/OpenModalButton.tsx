import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useGlobalStyles } from '~/styles/globalStyles';


interface OpenModalButtonProps {
  label: string;
  selectedLabel?: string;
  onPress: () => void;
  mode?: 'outlined' | 'flat';
  style?: ViewStyle; // Estilo personalizado
  error?: boolean; // Exibe erro
  errorMessage?: string;
  prefixIcon?: string | null; // Ícone à esquerda, opcional
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({
  label,
  selectedLabel = '',
  onPress,
  style,
  error = false,
  mode = 'outlined',
  errorMessage = '',
  prefixIcon,
}) => {
  const Globalstyles = useGlobalStyles();

  return (
    <View style={[Globalstyles.inputDefaultStyle, style]}>
      <TouchableOpacity onPress={onPress}>
        <TextInput
          label={label}
          value={selectedLabel}
          mode="outlined"
          editable={false} // Torna o campo não editável
          left={prefixIcon ? <TextInput.Icon icon={prefixIcon} /> : null} // Ícone à esquerda
          right={<TextInput.Icon icon="chevron-right" />} // Ícone de seta à direita
          style={Globalstyles.inputDefaultStyle} // Estilo local
          error={error}
        />
      </TouchableOpacity>
      {error && !!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

// Estilo local do componente
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
  },
});

export default OpenModalButton;
