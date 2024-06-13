import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCustomAsyncStorage = () => {
  const getAsyncStorage = async (key: string) => {
    try {
      const value: any = await AsyncStorage.getItem(key);

      return JSON.parse(value) ? JSON.parse(value) : value;
    } catch (error) {
      console.error("Failed to save value to AsyncStorage:", error);
    }
  };
  const setAsyncStorage = async (key: string, initialValue: any) => {
    try {
      const valueToStore = initialValue;
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Failed to save value to AsyncStorage:", error);
    }
  };

  const removeAsyncStorage = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove value from AsyncStorage:", error);
    }
  };

  return { setAsyncStorage, removeAsyncStorage, getAsyncStorage };
};
