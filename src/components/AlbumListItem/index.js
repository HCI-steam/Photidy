import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';

import { actions } from '../../redux/states/albumState';
import { actions as albumsActions } from '../../redux/states/albumsState';
import { getAlbumIsEditing } from '../../redux/selectors';

const AlbumListItem = props => {
  const dispatch = useDispatch();
  const { item, items, index, albumCellWidth, navigation } = props;
  const isEditMode = useSelector(state => getAlbumIsEditing(state));

  const handleNavigate = useCallback(() => {
    dispatch(actions.requestAlbumAssets(item.id, item.assetCount));
    navigation.navigate({ name: 'Album', params: { item } });
  }, []);

  const handleRemoveAlbum = useCallback(async () => {
    try {
      await MediaLibrary.deleteAlbumsAsync(item.id);
      dispatch(albumsActions.requestAllAlbums());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, item]);

  return (
    <TouchableOpacity
      style={{
        width: albumCellWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
      }}
      activeOpacity={isEditMode ? 1 : 0.5}
      onPress={isEditMode ? () => {} : handleNavigate}
    >
      {isEditMode ? (
        <TouchableOpacity
          onPress={handleRemoveAlbum}
          style={{ position: 'absolute', top: -10, left: 6, zIndex: 5 }}
        >
          <Ionicons
            style={{ position: 'absolute' }}
            name="ios-remove-circle-outline"
            size={28}
            color="#fff"
          />
          <Ionicons
            style={{ position: 'absolute' }}
            name="ios-remove-circle-sharp"
            size={28}
            color="red"
          />
        </TouchableOpacity>
      ) : null}
      {item.thumbnail ? (
        <Image
          style={{
            width: albumCellWidth * 0.85,
            height: albumCellWidth * 0.85,
            resizeMode: 'cover',
            borderRadius: 6,
          }}
          source={{ uri: item.thumbnail.uri }}
        />
      ) : (
        <Ionicons
          name="ios-albums-outline"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: albumCellWidth * 0.85,
            height: albumCellWidth * 0.85,
            fontSize: albumCellWidth * 0.75,
            borderRadius: 6,
          }}
          color="#acacac"
        />
      )}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          width: albumCellWidth * 0.85,
          marginVertical: 4,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: '#888',
          width: albumCellWidth * 0.85,
          //   marginVertical: 4,
        }}
      >
        {item.assetCount}
      </Text>
    </TouchableOpacity>
  );
};

export default AlbumListItem;
