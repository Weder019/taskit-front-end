import React from 'react';
import { StyleSheet, Image, View, ViewStyle } from 'react-native';

import { useGlobalStyles } from '~/styles/globalStyles';

type ScreenContentProps = {
  isAuthenticationScreen?: boolean; // Novo parâmetro para controlar a exibição da imagem
  children?: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenContent = ({ isAuthenticationScreen, children, style }: ScreenContentProps) => {
  const styles = useGlobalStyles();

  return (
    <View style={[styles.container, style]}>
      {/* Se for tela de autenticação, renderiza a imagem */}
      {isAuthenticationScreen && (
        <Image
          source={require('../../assets/images/logo.png')} // Substitua pelo caminho da sua imagem local
          style={styles.logoImage}
          resizeMode="contain"
        />
      )}

      {children}
    </View>
  );
};
