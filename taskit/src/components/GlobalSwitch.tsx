import React from 'react';
import { Switch, useTheme, IconButton } from 'react-native-paper';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

interface GlobalSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  color?: string;
  disabled?: boolean;
  icon?: string; // Ícone opcional
  style?: ViewStyle;
}

const GlobalSwitch: React.FC<GlobalSwitchProps> = ({
  value,
  onValueChange,
  label,
  color,
  disabled = false,
  icon, // Recebendo o ícone opcional
  style,
}) => {
  const { colors } = useTheme(); // Utiliza o tema atual

  return (
    <View style={[styles.container, style]}>
      {/* Renderiza o ícone, se fornecido */}
      {icon && <IconButton icon={icon} size={24} style={styles.icon} />}
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        color={color || colors.primary} // Cor personalizável
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default GlobalSwitch;
