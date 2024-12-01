import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface DatePickerButtonProps {
  initialDate?: string; // Data inicial no formato "DD/MM/YYYY"
  onDateChange: (date: string) => void; // Função chamada ao selecionar uma nova data
  label?: string; // Texto da label inicial
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  initialDate = '',
  onDateChange,
  label = 'Data',
}) => {
  const parsedDate = initialDate ? moment(initialDate, 'DD/MM/YYYY').toDate() : new Date();
  const [date, setDate] = useState(parsedDate);
  const [showPicker, setShowPicker] = useState(false);

  // Valida e define a data inicial ao carregar o componente
  useEffect(() => {
    if (!initialDate) {
      const today = moment().format('DD/MM/YYYY');
      onDateChange(today); // Notifica a data inicial
    }
  }, [initialDate, onDateChange]);

  const handleOpenCalendar = () => {
    setShowPicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
      onDateChange(formattedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenCalendar} style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="calendar-plus"
          size={24}
          color="#000"
          style={styles.icon}
        />
        <Text style={styles.label}>
          {moment(date).format('DD/MM/YYYY') || label}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row', // Alinha os itens em linha
    alignItems: 'center', // Centraliza verticalmente
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
});

export default DatePickerButton;
