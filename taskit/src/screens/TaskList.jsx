import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

const TaskList = () => {
    // Estado local das subtarefas
    const [subtasks, setSubtasks] = useState([
        { id: '1', title: 'Subtarefa 1', priority: 'ALTA', completed: true },
        { id: '2', title: 'Subtarefa 2', priority: 'MÉDIA', completed: false },
    ]);

    // Função para alternar o estado "completed" de uma subtarefa
    const toggleSubtask = (id) => {
        setSubtasks((prevSubtasks) =>
            prevSubtasks.map((subtask) =>
                subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
            )
        );
    };

    return (
        <FlatList
            data={subtasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.subtask}>
                    <Checkbox
                        status={item.completed ? 'checked' : 'unchecked'}
                        onPress={() => toggleSubtask(item.id)} // Alterna o estado local
                    />
                    <View>
                        <Text style={styles.subtaskText}>{item.title}</Text>
                        <Text style={styles.priorityText}>PRIORIDADE: {item.priority}</Text>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    subtask: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subtaskText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    priorityText: {
        fontSize: 14,
        color: '#666',
    },
});

export default TaskList;
