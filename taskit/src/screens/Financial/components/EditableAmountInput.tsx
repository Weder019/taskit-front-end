import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, TextStyle, StyleSheet } from 'react-native';

interface EditableAmountInputProps {
  value: string;
  onChangeValue: (value: string) => void;
  style: TextStyle;
}

const EditableAmountInput: React.FC<EditableAmountInputProps> = ({
  value,
  onChangeValue,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const formatValue = (val: string) => {
    const numericValue = parseFloat(val.replace(',', '.').replace(/[^\d.]/g, ''));
    return isNaN(numericValue) ? '0,00' : numericValue.toFixed(2).replace('.', ',');
  };

  const handleEdit = () => {
    setInputValue(value);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const formattedValue = formatValue(inputValue);
    setInputValue(formattedValue);
    onChangeValue(formattedValue); // Confirma o valor formatado ao sair do campo de entrada
  };

  const handleChangeText = (text: string) => {
    // Permite apenas dígitos
    const numericText = text.replace(/[^\d]/g, '');
    const valueWithDecimal = (parseInt(numericText, 10) / 100).toFixed(2).replace('.', ',');
    setInputValue(valueWithDecimal);
  };

  return (
    <TouchableOpacity onPress={handleEdit}>
      {isEditing ? (
        <TextInput
          style={[style, styles.valueText]}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <Text style={[style, styles.valueText]}>R$ {value || '0,00'}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  valueText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 35,
  },
});

export default EditableAmountInput;
