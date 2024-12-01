import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import GlobalInput from '~/components/GlobalInput';
import { BackButton } from '~/components/BackButton';
import Container from '~/components/Container';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenContent } from '~/components/ScreenContent';
import { useGlobalStyles } from '~/styles/globalStyles';
import CalendarDatePicker from '~/components/CalendarDatePicker';
import DatePickerButton from './components/DatePickerButton';
import Dropdown from './components/Dropdown';
import { SubTask } from '~/types/models';
import { useUser } from '~/context/UserContext';
import { createTask } from '~/services/taskService';

type AddTaskScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewBankAccount'>;

export default function AddTaskScreen() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  const back = () => {
    navigation.goBack();
  };

  const [titulo, setTitulo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [priority, setPriority] = useState<number>(0);
  const [descricao, setDescricao] = useState('');
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  const navigation = useNavigation<AddTaskScreenNavigationProp>();

  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { title: '', description: '', priority: 0, done: false }, // Adiciona uma nova subtarefa com "done: false"
    ]);
  };
  const handleSubtaskChange = <K extends keyof SubTask>(
    index: number,
    field: K,
    value: SubTask[K]
  ) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index][field] = value; // Atualiza o campo específico
    setSubtasks(updatedSubtasks);
  };

  const handleTaskPriorityChange = (priority: string) => {
    const priorityValue = priority === 'Alta' ? 3 : priority === 'Média' ? 2 : 1;
    setPriority(priorityValue);
  };

  const handleSubtaskPriorityChange = (priority: string, index: number) => {
    const priorityValue = priority === 'Alta' ? 3 : priority === 'Média' ? 2 : 1;
    handleSubtaskChange(index, 'priority', priorityValue);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    // Validação dos campos
    if (!titulo.trim()) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório.');
      return;
    }
    if (!descricao.trim()) {
      Alert.alert('Erro', 'A descrição da tarefa é obrigatória.');
      return;
    }
    if (!selectedDate) {
      Alert.alert('Erro', 'A data é obrigatória.');
      return;
    }
    if (priority === 0) {
      Alert.alert('Erro', 'A prioridade da tarefa é obrigatória.');
      return;
    }
    const titles = subtasks.map((subtask) => subtask.title.trim());
    const hasDuplicates = titles.some((title, index) => titles.indexOf(title) !== index);

    if (hasDuplicates) {
      Alert.alert('Erro', 'Existem subtarefas com títulos duplicados. Por favor, corrija-os.');
      return;
    }

    // Filtrar subtarefas válidas (com título e descrição preenchidos)
    const validSubtasks = subtasks.filter((subtask) => {
      if (!subtask.title.trim()) {
        Alert.alert('Erro', `O título da subtarefa é obrigatório.`);
        return false;
      }
  
  
      if (subtask.priority === 0) {
        Alert.alert('Erro', `A prioridade da subtarefa é obrigatória.`);
        return false;
      }
  
      return true;
    });
  
    // Caso alguma subtarefa seja inválida, interrompe o envio
    if (validSubtasks.length !== subtasks.length) {
      return;
    }
    console.log(priority);
    try {
      const newTask = {
        title: titulo,
        description: descricao,
        data: selectedDate,
        priority,
        subTask: validSubtasks,
        done: false,
      };
      // Chamar o serviço para criar a tarefa
      await createTask(newTask);

      // Atualizar os dados do usuário
      await refreshUserData(user.uid);

      Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível criar a tarefa.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento para iOS e Android
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.scrollViewContent}>
        <ScreenContent>
          <View style={styles.containerTitle}>
            <BackButton onPress={back} />
            <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
              Cadastrar Tarefa
            </Text>
          </View>
          <Container rounded style={styles.container}>
            <GlobalInput
              label="Título"
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Título da tarefa"
              prefixIcon="plus"
              style={styles.input}
            />

            <DatePickerButton
              initialDate={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              label="Escolha uma data"
            />
            <GlobalInput
              label="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição da tarefa"
              prefixIcon="format-list-bulleted"
              style={styles.input}
            />

            <Dropdown
              label="Prioridade"
              iconName="priority-high"
              options={['Alta', 'Média', 'Baixa']}
              onSelect={handleTaskPriorityChange}
            />

            {/* Linha separadora */}
            <View style={styles.separator} />

            <Text style={styles.subtitle}>SUBTAREFAS</Text>

            {/* Renderizar campos para cada subtarefa */}
            {subtasks.map((subtask, index) => (
              <View key={index} style={styles.subtaskContainer}>
                {/* Título identificador da subtarefa */}
                <Text style={styles.subtaskTitle}>Subtarefa {index + 1}</Text>

                <GlobalInput
                  label={`Título da Subtarefa ${index + 1}`}
                  value={subtask.title}
                  onChangeText={(text) => handleSubtaskChange(index, 'title', text)}
                  placeholder="Título da subtarefa"
                  prefixIcon="plus"
                  style={styles.input}
                />
                <GlobalInput
                  label={`Descrição da Subtarefa ${index + 1}`}
                  value={subtask.description}
                  onChangeText={(text) => handleSubtaskChange(index, 'description', text)}
                  placeholder="Descrição da subtarefa"
                  prefixIcon="format-list-bulleted"
                  style={styles.input}
                />
                <Dropdown
                  label="Prioridade da Subtarefa"
                  iconName="priority-high"
                  options={['Alta', 'Média', 'Baixa']}
                  onSelect={(priority) => handleSubtaskPriorityChange(priority, index)}
                />
              </View>
            ))}

            {/* Botão para adicionar mais subtarefas */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddSubtask}>
              <Text style={styles.addButtonText}>+ Adicionar Subtarefa</Text>
            </TouchableOpacity>

            {/* Botão para salvar a tarefa */}
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              CADASTRAR
            </Button>
          </Container>
        </ScreenContent>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  keyboardAvoidingView: {
    flex: 1, // Ocupar o espaço inteiro
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#DFE2EB',
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center', // Centraliza os itens ao longo do eixo principal
    position: 'relative',
  },

  title: {
    fontSize: 28,
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
    marginBottom: 23,
  },
  button: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  subtaskContainer: {
    marginBottom: 20,
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#37618E',
    fontWeight: 'bold',
  },
  subtaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37618E',
    marginBottom: 10,
  },
});
