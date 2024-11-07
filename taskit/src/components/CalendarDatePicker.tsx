import React, { useState } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

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
  const [selectedButton, setSelectedButton] = useState('Hoje');

  const handleOpenCalendar = () => {
    setShowPicker(true);
    setSelectedButton('Outro');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate && selectedDate.toDateString() !== date.toDateString()) {
      setDate(selectedDate);
      const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
      onDateChange(formattedDate);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today);
    const formattedDate = moment(today).format('DD/MM/YYYY');
    onDateChange(formattedDate);
    setSelectedButton('Hoje'); // Atualiza o botão selecionado
  };

  const handleYesterday = () => {
    const yesterday = moment().subtract(1, 'days').toDate();
    setDate(yesterday);
    const formattedDate = moment(yesterday).format('DD/MM/YYYY');
    onDateChange(formattedDate);
    setSelectedButton('Ontem'); // Atualiza o botão selecionado
  };

  return (
    <View style={styles.container}>
      <IconButton icon="calendar" onPress={handleOpenCalendar} style={styles.iconButton} />
      <TouchableOpacity
        onPress={handleToday}
        style={[styles.button, selectedButton === 'Hoje' && styles.selectedButton]}>
        <Text style={selectedButton === 'Hoje' ? styles.selectedButtonText : styles.buttonText}>
          Hoje
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleYesterday}
        style={[styles.button, selectedButton === 'Ontem' && styles.selectedButton]}>
        <Text style={selectedButton === 'Ontem' ? styles.selectedButtonText : styles.buttonText}>
          Ontem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleOpenCalendar}
        style={[styles.button, selectedButton === 'Outro' && styles.selectedButton]}>
        <Text style={selectedButton === 'Outro' ? styles.selectedButtonText : styles.buttonText}>
          Outro
        </Text>
      </TouchableOpacity>

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
    marginRight: 8,
  },
  button: {
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedButton: {
    backgroundColor: '#37618E',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CalendarDatePicker;
