import React from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

interface IconDetailsProps {
  iconName?: string; // Nome do ícone (opcional)
  title: string; // Texto principal
  subtitle: string; // Texto secundário
  style?: ViewStyle; // Estilo opcional para o container
  textStyle?: TextStyle; // Estilo opcional para o texto
  iconColor?: string; // Cor do ícone
  iconSize?: number; // Tamanho do ícone
  onPress?: () => void;
}

const IconDetails: React.FC<IconDetailsProps> = ({
  iconName = 'help-circle-outline',
  title,
  subtitle,
  style,
  textStyle,
  onPress,
  iconColor = '#000000',
  iconSize = 32,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer]}>
        <IconButton
          icon={iconName}
          size={iconSize}
          iconColor={iconColor}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text variant="bodyLarge" style={[styles.title, textStyle]}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, textStyle]}>
          {subtitle}
        </Text>
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    margin: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    
    color: '#000',
  },
});

export default IconDetails;
