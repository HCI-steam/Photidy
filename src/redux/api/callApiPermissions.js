import * as MediaLibrary from 'expo-media-library';

export const callApiPermissions = async () => {
  const permission = await MediaLibrary.requestPermissionsAsync();

  return permission;
};
