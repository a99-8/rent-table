import AsyncStorage from "@react-native-async-storage/async-storage";
import { RentFormData } from "../types";

const STORAGE_KEY = "@rent_table_data";

export const saveData = async (data: RentFormData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const loadData = async (): Promise<RentFormData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
};
