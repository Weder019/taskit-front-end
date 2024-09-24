import { Text } from 'react-native';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';

export default function LoginScreen() {
  return (
    <ScreenContent path="screens/one.tsx" title="Login">
      <Container rounded>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
      </Container>
    </ScreenContent>
  );
}
