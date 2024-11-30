import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { IconButton } from 'react-native-paper';

interface ActionButtonProps {
  icon: string; // Nome do ícone
  label: string; // Rótulo do botão
  onPress: () => void; // Função chamada ao pressionar
}

interface ExpandableFloatingButtonProps {
  buttons: ActionButtonProps[]; // Lista de botões que o componente aceitará
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress }) => {
  return (
    <View style={styles.actionButtonContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <IconButton icon={icon} size={24} iconColor="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
};

const ExpandableFloatingButton: React.FC<ExpandableFloatingButtonProps> = ({ buttons }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* Backdrop e botões */}
      <Modal
        visible={isExpanded}
        transparent
        animationType="fade"
        onRequestClose={() => setIsExpanded(false)}>
        <TouchableOpacity style={styles.backdrop} onPress={() => setIsExpanded(false)}>
          <View style={styles.menuContainer}>
            {buttons.map((button, index) => (
              <ActionButton
                key={index}
                icon={button.icon}
                label={button.label}
                onPress={() => {
                  button.onPress();
                  setIsExpanded(false); // Fecha o menu ao clicar em um botão
                }}
              />
            ))}
          </View>
          {/* Botão central para fechar */}
          <TouchableOpacity style={styles.centralButton} onPress={toggleMenu}>
            <IconButton icon="close" size={24} iconColor="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Botão flutuante principal */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <IconButton icon="plus" size={24} iconColor="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro translúcido
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribui os botões uniformemente
    alignItems: 'center',
    width: '100%', // Ajusta a largura para manter os botões centralizados
    position: 'absolute',
    bottom: 120, // Posiciona o menu acima do botão central
  },
  actionButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#37618E', // Cor dos botões
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
  },
  centralButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c44c4e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  floatingButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpandableFloatingButton;
