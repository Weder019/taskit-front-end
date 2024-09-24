import { Text } from 'react-native';

import Container from '../../components/Container';
import { ScreenContent } from '../../components/ScreenContent';

export default function SignUpScreen() {
  return (
    <ScreenContent path="screens/one.tsx" title="Sign Up">
      <Container rounded>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
      </Container>
    </ScreenContent>
  );
}
