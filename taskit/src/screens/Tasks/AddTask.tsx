import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import GlobalInput from '~/components/GlobalInput';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import { ScrollView } from 'react-native-gesture-handler';

type AddTaskScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewBankAccount'>;

export default function AddTaskScreen() {
  const back = () => {
    navigation.goBack();
  };

  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [subdescricao, setSubDescricao] = useState('');
  const navigation = useNavigation<AddTaskScreenNavigationProp>();

  return (
    <ScrollView style={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.backButton}>
          <BackButton onPress={back} />
        </View>

        <Text style={styles.title}>CADASTRAR TAREFA</Text>

        <Container rounded>
          <GlobalInput
            label="Título"
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título da tarefa"
            prefixIcon="plus"
            style={styles.input}
          />

          <GlobalInput
            label="Data"
            value={data}
            onChangeText={setData}
            placeholder="Data"
            prefixIcon="calendar"
            style={styles.input}
          />

          <GlobalInput
            label="Prioridade"
            value={prioridade}
            onChangeText={setPrioridade}
            placeholder="Prioridade"
            prefixIcon="account"
            style={styles.input}
          />

          <GlobalInput
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição da tarefa"
            prefixIcon="format-list-bulleted"
            style={styles.input}
          />

          {/* Linha separadora */}
          <View style={styles.separator} />

          <Text style={styles.subtitle}>SUBTAREFAS</Text>

          <GlobalInput
            label="Título da Subtarefa"
            value={subtitulo}
            onChangeText={setSubtitulo}
            placeholder="Título da subtarefa"
            prefixIcon="plus"
            style={styles.input}
          />

          <GlobalInput
            label="Descrição da Subtarefa"
            value={subdescricao}
            onChangeText={setSubDescricao}
            placeholder="Descrição da subtarefa"
            prefixIcon="format-list-bulleted"
            style={styles.input}
          />
          <GlobalInput
            label="Prioridade"
            value={prioridade}
            onChangeText={setPrioridade}
            placeholder="Prioridade"
            prefixIcon="account"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={() => console.log('Cadastro de tarefa')}
            style={styles.button}>
            CADASTRAR
          </Button>
        </Container>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#001d36',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
});
