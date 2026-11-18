import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import TaskItem from '../components/TaskItem';
import { loadItemsFromStorage, saveItemsToStorage } from '../storage/storage';

export default function HomeScreen() {
  const [itemText, setItemText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [items, setItems] = useState([]);

  // Cargar datos al iniciar de forma segura (compatible con web y móvil)
  useEffect(() => {
    async function initLoad() {
      try {
        const savedItems = await loadItemsFromStorage();
        if (savedItems && Array.isArray(savedItems)) {
          setItems(savedItems);
        }
      } catch (error) {
        console.log('Aviso de carga:', error);
      }
    }
    initLoad();
  }, []);

  // Guardar datos cuando cambien los elementos
  useEffect(() => {
    try {
      saveItemsToStorage(items);
    } catch (error) {
      console.log('Aviso de guardado:', error);
    }
  }, [items]);

  const addItem = () => {
    if (itemText.trim() === '') {
      if (Platform.OS === 'web') {
        window.alert('Escribe el nombre del material o tarea.');
      } else {
        Alert.alert('Campo vacío', 'Escribe el nombre del material o tarea.');
      }
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: itemText.trim(),
      member: assignee.trim() || 'Sin asignar',
      completed: false,
    };

    setItems([newItem, ...items]);
    setItemText('');
    setAssignee('');
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.completed).length;
  const percentage =
    totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />

      <View style={styles.header}>
        <Text style={styles.title}>GrupoSync</Text>
        <Text style={styles.subtitle}>Gestor de Materiales y Tareas</Text>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Avance del proyecto</Text>
          <Text style={styles.progressPercent}>{percentage}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.progressCount}>
          {completedItems} de {totalItems} elementos listos
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Material o tarea (Ej. Protoboard)"
          value={itemText}
          onChangeText={setItemText}
        />
        <TextInput
          style={styles.input}
          placeholder="Responsable (Ej. Marco)"
          value={assignee}
          onChangeText={setAssignee}
        />
        <CustomButton title="+ Agregar a la lista" onPress={addItem} type="primary" />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay elementos aún. ¡Agrega el primero!</Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={() => toggleItem(item.id)}
            onDelete={() => deleteItem(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressCount: {
    fontSize: 12,
    color: '#64748B',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 30,
    fontSize: 15,
  },
});