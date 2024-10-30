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
      <View style={styles.labelContainer}>
        {icon && <IconButton icon={icon} size={24} style={styles.icon} />}
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 16,
  },
});

export default GlobalSwitch;