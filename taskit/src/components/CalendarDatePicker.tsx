// CalendarDatePicker.tsx

import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

// Função para converter data em string para o objeto Date
const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

interface CalendarDatePickerProps {
  initialDate?: string;
  onDateChange: (date: string) => void;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  initialDate = '',
  onDateChange,
}) => {
  const parsedDate = initialDate ? parseDateString(initialDate) : new Date();
  const [date, setDate] = useState(parsedDate);
  const [showPicker, setShowPicker] = useState(false);

  const handleOpenCalendar = () => setShowPicker(true);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = moment(selectedDate).format('DD/MM/YYYY'); // Formata para pt-BR
      onDateChange(formattedDate);
    }
    setShowPicker(false); // Fecha o seletor após a escolha de data
  };

  return (
    <View style={styles.container}>
      {/* Botão para abrir o seletor de data */}
      <IconButton icon="calendar" onPress={handleOpenCalendar} style={styles.iconButton} />
      <Text style={styles.dateText}>{moment(date).format('DD/MM/YYYY')}</Text>

      {/* DateTimePicker que exibe o seletor nativo de data */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  iconButton: {
    marginRight: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CalendarDatePicker;
