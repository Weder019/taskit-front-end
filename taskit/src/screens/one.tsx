import { Text } from 'react-native';

import Container from '../components/Container';
import { ScreenContent } from '../components/ScreenContent';

import { useGlobalStyles } from '~/styles/globalStyles';

export default function TabOneScreen() {
  const styles = useGlobalStyles();
  return (
    <ScreenContent path="screens/one.tsx" title="Tab One">
      <Container rounded>
        <Text style={styles.text}>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
        <Text>Este é um conteúdo adicional passado como children.</Text>
      </Container>
    </ScreenContent>
  );
}
