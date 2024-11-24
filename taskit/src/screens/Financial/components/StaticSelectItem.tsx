import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface StaticSelectItemProps {
  bankName: string; // Nome do banco do usuário
  bankIconUri?: string; // URI do ícone do banco
  style?: ViewStyle; // Estilo adicional para o container
}

const StaticSelectItem: React.FC<StaticSelectItemProps> = ({ bankName, bankIconUri, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        {bankIconUri ? (
          <Image source={{ uri: bankIconUri }} style={styles.image} />
        ) : (
          <View style={styles.iconFallback}>
            <IconButton
              icon="help" // Ícone de interrogação
              size={32}
              iconColor="#FFFFFF"
              style={styles.iconPlaceholder}
            />
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Banco</Text>
        <Text style={styles.bankName}>{bankName || 'Não informado'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  iconFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconPlaceholder: {
    margin: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#000000',
  },
  bankName: {
    fontSize: 16,
    
    color: '#000',
  },
});

export default StaticSelectItem;
