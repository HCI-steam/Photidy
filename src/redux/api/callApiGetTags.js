import AsyncStorage from '@react-native-async-storage/async-storage';

export const callApiGetTags = async () => {
  const tagToIds = JSON.parse(await AsyncStorage.getItem('tagToIds'));
  const idToTags = JSON.parse(await AsyncStorage.getItem('idToTags'));

  return { tagToIds, idToTags };
};
