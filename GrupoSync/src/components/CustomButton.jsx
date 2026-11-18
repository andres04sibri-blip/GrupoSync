import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, type = 'primary' }) {
  const isDelete = type === 'delete';

  return (
    <TouchableOpacity
      style={[styles.button, isDelete ? styles.deleteBtn : styles.primaryBtn]}
      onPress={onPress}
    >
      <Text style={[styles.text, isDelete ? styles.deleteText : styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#2563EB',
    marginTop: 6,
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  deleteText: {
    color: '#DC2626',
  },
});