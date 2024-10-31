import React, { useState, useRef } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Menu, Text, TextInput } from 'react-native-paper';
import { useGlobalStyles } from '~/styles/globalStyles';

// Define as propriedades que o componente aceitará
interface GlobalDropdownInputProps {
  label: string;
  value: string;
  onSelect: (value: string) => void;
  options: string[]; // Opções do dropdown
  placeholder?: string;
  style?: ViewStyle; // Estilo personalizado
  mode?: 'outlined' | 'flat'; // Modo do dropdown
  error?: boolean; // Exibe erro
  errorMessage?: string;
  prefixIcon?: string; // Ícone à esquerda, opcional
}

const GlobalDropdownInput: React.FC<GlobalDropdownInputProps> = ({
  label,
  value,
  onSelect,
  options,
  placeholder,
  style,
  mode = 'outlined',
  error = false,
  errorMessage = '',
  prefixIcon,
}) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<View>(null);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 }); // Posição para o Menu
  const Globalstyles = useGlobalStyles();

  const openMenu = () => {
    // Medir a posição do TextInput na tela
    if (inputRef.current) {
      inputRef.current.measure((fx, fy, width, height, px, py) => {
        // Colocar o menu à direita do TextInput e logo abaixo dele
        setAnchorPosition({ x: px + width, y: py + height }); // Posição à direita e abaixo do TextInput
        setVisible(true);
      });
    }
  };

  const closeMenu = () => setVisible(false);

  return (
    <View ref={inputRef} style={[Globalstyles.inputDefaultStyle, style]}>
      <TouchableOpacity onPress={openMenu}>
        <TextInput
          label={label}
          value={value}
          placeholder={placeholder}
          mode={mode}
          editable={false} // Torna o campo não editável
          left={prefixIcon ? <TextInput.Icon icon={prefixIcon} /> : null} // Ícone à esquerda
          right={<TextInput.Icon icon="menu-down" />} // Ícone de dropdown à direita
          style={Globalstyles.inputDefaultStyle} // Estilo local
          error={error}
        />
      </TouchableOpacity>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{ x: anchorPosition.x, y: anchorPosition.y }} // Ancorando o menu
      >
        {options.map((option) => (
          <Menu.Item
            key={option}
            onPress={() => {
              onSelect(option);
              closeMenu();
            }}
            title={option}
          />
        ))}
      </Menu>
      {error && !!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

// Estilo local do componente
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default GlobalDropdownInput;
