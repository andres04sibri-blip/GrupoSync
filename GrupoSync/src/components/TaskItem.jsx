import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.leftArea} onPress={onToggle}>
        <View style={[styles.checkbox, item.completed && styles.checked]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, item.completed && styles.completedText]}>
            {item.title}
          </Text>
          <Text style={styles.member}>👤 {item.member}</Text>
        </View>
      </TouchableOpacity>

      <CustomButton title="Eliminar" onPress={onDelete} type="delete" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#2563EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  member: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
});