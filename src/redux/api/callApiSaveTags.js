import AsyncStorage from '@react-native-async-storage/async-storage';

export const callApiSaveTags = async (idToTags, tagToIds) => {
  console.log(idToTags, tagToIds);
  await AsyncStorage.setItem('tagToIds', JSON.stringify(tagToIds));
  await AsyncStorage.setItem('idToTags', JSON.stringify(idToTags));
};
