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
import { SubTask, Task } from '~/types/models';
import { useUser } from '~/context/UserContext';
import { createTask, deleteTask, updateTask } from '~/services/taskService';
import TrashButton from '~/components/TrashButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type AddTaskScreenNavigationProp = NavigationProp<FinancialStackParamList, 'NewBankAccount'>;

export default function AddTaskScreen() {
  const Globalstyles = useGlobalStyles();
  const { user, userData, refreshUserData } = useUser();
  const back = () => {
    navigation.goBack();
  };
  const task: Task = userData.tasks?.[0];
  const [titulo, setTitulo] = useState(task.title);
  const [selectedDate, setSelectedDate] = useState(task?.data);
  const [priority, setPriority] = useState<number>(task?.priority);
  const [descricao, setDescricao] = useState(task?.description);
  const [subtasks, setSubtasks] = useState<SubTask[]>(task?.subTask);

  const navigation = useNavigation<AddTaskScreenNavigationProp>();

  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { title: '', description: '', priority: 0, done: false }, // Define a prioridade inicial como 0
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
    const priorityValue =
      priority === 'Alta' ? 3 : priority === 'Média' ? 2 : priority === 'Baixa' ? 1 : 0;
    handleSubtaskChange(index, 'priority', priorityValue);
  };

  const handleUpdate = async () => {
    if (!task || !user) {
      Alert.alert('Erro', 'Tarefa ou usuário não encontrados.');
      return;
    }

    if (!titulo.trim() || !selectedDate.trim() || !descricao.trim()) {
      Alert.alert('Erro', 'Todos os campos da tarefa devem estar preenchidos.');
      return;
    }

    // Verificar se há subtarefas com título vazio
    const validSubtasks = subtasks.filter((subtask) => subtask.title.trim());
    if (validSubtasks.length !== subtasks.length) {
      Alert.alert('Erro', 'Todas as subtarefas devem ter um título.');
      return;
    }

    // Verificar se há títulos duplicados nas subtarefas
    const titles = validSubtasks.map((subtask) => subtask.title.trim());
    const hasDuplicates = titles.length !== new Set(titles).size;
    if (hasDuplicates) {
      Alert.alert('Erro', 'Não é permitido adicionar subtarefas com títulos duplicados.');
      return;
    }

    // Verificar se todas as subtarefas têm prioridade válida
    const hasInvalidPriorities = validSubtasks.some((subtask) => subtask.priority === 0);
    if (hasInvalidPriorities) {
      Alert.alert('Erro', 'Todas as subtarefas devem ter uma prioridade selecionada.');
      return;
    }

    try {
      const updatedTask = {
        title: titulo,
        description: descricao,
        data: selectedDate,
        priority,
        subTask: validSubtasks,
        done: task.done, // Mantém o status atual da tarefa
      };

      // Chamar o serviço para atualizar a tarefa
      await updateTask(task.id, updatedTask);

      // Atualizar os dados do usuário
      await refreshUserData(user.uid);

      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  const handleDelete = async () => {
    if (!task || !user) {
      Alert.alert('Erro', 'Tarefa ou usuário não encontrados.');
      return;
    }

    // Exibir alerta de confirmação
    Alert.alert('Confirmar Exclusão', 'Tem certeza de que deseja excluir esta tarefa?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            // Chamar o serviço de deleção
            await deleteTask(task.id);

            // Atualizar o contexto do usuário
            await refreshUserData(user.uid);

            Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
            navigation.goBack(); // Navegar para a tela anterior
          } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
          }
        },
      },
    ]);
  };
  const handleRemoveSubtask = (index: number) => {
    setSubtasks((prevSubtasks) => prevSubtasks.filter((_, i) => i !== index));
  };
  const getPriorityLabel = (priority: number): string => {
    switch (priority) {
      case 3:
        return 'Alta';
      case 2:
        return 'Média';
      case 1:
        return 'Baixa';
      default:
        return 'Prioridade';
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
            <View style={{ flex: 1, alignItems: 'center', marginLeft: 50 }}>
              <Text variant="headlineMedium" style={[Globalstyles.title, styles.title]}>
                Editar Tarefa
              </Text>
            </View>
            <TrashButton onPress={handleDelete} size={30} />
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
              label={priority === 3 ? 'Alta' : priority === 2 ? 'Média' : 'Baixa'}
              iconName="priority-high"
              options={['Alta', 'Média', 'Baixa']}
              onSelect={(selectedPriority) => handleTaskPriorityChange(selectedPriority)}
            />

            {/* Linha separadora */}
            <View style={styles.separator} />

            <Text style={styles.subtitle}>SUBTAREFAS</Text>

            {subtasks.map((subtask, index) => (
              <View key={index} style={styles.subtaskContainer}>
                <View style={styles.subtaskHeader}>
                  <Text style={styles.subtaskTitle}>Subtarefa {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleRemoveSubtask(index)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF0000" />
                  </TouchableOpacity>
                </View>

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
                  label="Prioridade"
                  iconName="priority-high"
                  options={['Alta', 'Média', 'Baixa']}
                  selectedOption={
                    subtask.priority === 0 ? 'Prioridade' : getPriorityLabel(subtask.priority)
                  }
                  onSelect={(priority) => handleSubtaskPriorityChange(priority, index)}
                />
              </View>
            ))}

            {/* Botão para adicionar mais subtarefas */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddSubtask}>
              <Text style={styles.addButtonText}>+ Adicionar Subtarefa</Text>
            </TouchableOpacity>

            {/* Botão para salvar a tarefa */}
            <Button mode="contained" onPress={handleUpdate} style={styles.button}>
              Salvar
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
  subtaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
