import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface SelectItemProps {
  label: string;
  value: { name: string; imageUri: string } | null;
  type: 'categoria' | 'banco';
  iconName?: string;
  showArrow?: boolean;
  style?: ViewStyle;
  selectedValue: string;
  onPress?: () => void;
  onChange: (value: { name: string; imageUri: string } | null) => void; // Permitir null
}

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  value,
  type,
  iconName,
  showArrow = true,
  style,
  selectedValue,
  onPress,
  onChange,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    if (value) {
      onChange(value);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      {type === 'banco' && value?.imageUri ? (
        <Image source={{ uri: value.imageUri }} style={styles.image} />
      ) : type === 'categoria' ? (
        <View style={styles.iconContainer}>
          <IconButton icon={iconName || 'help-circle'} size={24} iconColor="#FFFFFF" />
        </View>
      ) : (
        <IconButton
          icon="help-circle-outline"
          size={40}
          iconColor="#000000"
          style={styles.iconPlaceholder}
        />
      )}

      <Text style={styles.label}>{label}</Text>

      {type === 'categoria' ? (
        selectedValue === value?.name ? (
          <View style={styles.selectedDot}>
            <IconButton icon="check" size={16} iconColor="#FFFFFF" style={styles.checkIcon} />
          </View>
        ) : (
          <View style={styles.unselectedDot} />
        )
      ) : showArrow ? (
        <IconButton icon="chevron-right" size={24} iconColor="#000000" />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    marginRight: 10,
    textAlign: 'center',
  },
  selectedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  checkIcon: {
    margin: 0, // Remove o espaçamento extra do IconButton
  },
});

export default SelectItem;
