import * as MediaLibrary from 'expo-media-library';

export const callApiAlbums = async () => {
  let { status } = await MediaLibrary.getPermissionsAsync();

  if (status === 'granted') {
    let albums = await MediaLibrary.getAlbumsAsync();

    let result = await Promise.all(
      albums.map(async album => {
        if (album.assetCount > 0) {
          let media = await MediaLibrary.getAssetsAsync(album.id, {
            first: 1,
          });
          return { ...album, thumbnail: media.assets[0] };
        }
        return { ...album, thumbnail: null };
      })
    );

    return { albums: result };
  }
  return { albums: [] };
};
