import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Text as RNText,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';

interface DropdownProps {
  label?: string; // Texto padrão do botão
  iconName: string; // Nome do ícone
  options: string[]; // Lista de opções do dropdown
  onSelect: (option: string) => void; // Função chamada ao selecionar uma opção
}

const Dropdown: React.FC<DropdownProps> = ({
  label = 'Selecione',
  iconName,
  options,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(label);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setVisible(false); // Fecha o modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}>
        <MaterialCommunityIcons name={iconName} size={24} style={styles.icon} />
        <Text style={styles.text}>{selectedOption}</Text>
      </TouchableOpacity>

      {/* Modal para exibir as opções */}
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionPress(item)}>
                  <RNText style={styles.optionText}>{item}</RNText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginBottom:20,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro translúcido
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    maxHeight: 200,
    padding: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Dropdown;
