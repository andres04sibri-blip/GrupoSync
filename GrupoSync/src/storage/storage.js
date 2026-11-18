import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@gruposync_items';

export const loadItemsFromStorage = async () => {
  try {
    const savedData = await AsyncStorage.getItem(STORAGE_KEY);
    return savedData != null ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error('Error al cargar los datos', error);
    return [];
  }
};

export const saveItemsToStorage = async (items) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error al guardar los datos', error);
  }
};