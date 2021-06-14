import * as MediaLibrary from 'expo-media-library';

export const callApiAlbum = async (albumId, assetCount) => {
  let { status } = await MediaLibrary.getPermissionsAsync();
  if (status === 'granted') {
    let media = await MediaLibrary.getAssetsAsync({
      first: assetCount,
      album: albumId,
      mediaType: ['photo', 'video'],
      sortBy: [['creationTime', true]],
    });

    return { albumAssets: media.assets };
  }
  return { albumAssets: [] };
};
