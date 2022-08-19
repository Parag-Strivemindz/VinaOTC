import AsyncStorage from '@react-native-async-storage/async-storage';

//setItem in AsyncStorage
export async function setItem(key, data) {
  console.log(key + ' from setItem');
  return await AsyncStorage.setItem(key, data);
}

//getItem from AsyncStorage
export async function getItem(key) {
  return await AsyncStorage.getItem(key);
}

//remove all keys
export function removeItem(key) {
  AsyncStorage.removeItem(key);
}
