import * as MediaLibrary from 'expo-media-library';

export const callApiAssets = async () => {
  let { status } = await MediaLibrary.getPermissionsAsync();
  if (status === 'granted') {
    let length = (
      await MediaLibrary.getAssetsAsync({ mediaType: ['photo', 'video'] })
    ).totalCount;
    let media = await MediaLibrary.getAssetsAsync({
      first: length,
      mediaType: ['photo', 'video'],
      sortBy: [['creationTime', true]],
    });

    return { assets: media.assets, assetsLength: length };
  }
  return { assets: [], assetsLength: 0 };
};
