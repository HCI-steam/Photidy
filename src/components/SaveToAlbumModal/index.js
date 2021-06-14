import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

import { actions as viewerActions } from '../../redux/states/viewerState';
import { actions as albumsActions } from '../../redux/states/albumsState';
import { actions as assetsActions } from '../../redux/states/assetsState';
import {
  getAllAlbums,
  getSaveToAlbumModalVisible,
  getViewerModalState,
  getSelectedAssets,
  getSelectionMode,
} from '../../redux/selectors';
import { SafeAreaView } from 'react-native';

const SaveToAlbumModal = props => {
  const dispatch = useDispatch();
  const [
    saveToAlbumModalVisible,
    viewerState,
    albums,
    selectionMode,
    selectedAssets,
  ] = useSelector(
    state => [
      getSaveToAlbumModalVisible(state),
      getViewerModalState(state),
      getAllAlbums(state),
      getSelectionMode(state),
      getSelectedAssets(state),
    ],
    shallowEqual
  );
  const item = viewerState ? viewerState.item : {};

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '92%'], []);

  useEffect(() => {
    if (saveToAlbumModalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [bottomSheetModalRef.current]);

  const handleSheetChanges = useCallback(
    index => {
      if (index === -1) {
        dispatch(viewerActions.setSaveToAlbumModalVisible(false));
      }
    },
    [dispatch, saveToAlbumModalVisible]
  );

  const handleCancel = useCallback(() => {
    dispatch(viewerActions.setSaveToAlbumModalVisible(false));
  }, [dispatch]);

  const handleSaveToAlbum = useCallback(
    albumId => async () => {
      try {
        if (selectionMode !== 'NONE' && selectedAssets.length > 0) {
          await MediaLibrary.addAssetsToAlbumAsync(selectedAssets, albumId);
          dispatch(assetsActions.setSelectedAssets([]));
          if (selectionMode === 'RANGE')
            dispatch(assetsActions.setRangeStartIndex(-1));
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([item], albumId);
        }
        dispatch(viewerActions.setSaveToAlbumModalVisible(false));
        dispatch(albumsActions.requestAllAlbums());
      } catch (e) {
        Alert.alert(
          '앨범에 사진을 저장하는 데 실패했습니다. 다시 시도해주세요.'
        );
      }
    },
    [item, dispatch, selectedAssets, selectionMode]
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={null}
      >
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>앨범에 추가</Text>
        </View>
        <ScrollView style={styles.albumList} bounces={false}>
          {albums.map(album => {
            return (
              <TouchableOpacity
                key={album.id}
                style={styles.listItemWrapper}
                activeOpacity={0.5}
                onPress={handleSaveToAlbum(album.id)}
              >
                {album.thumbnail ? (
                  <Image
                    style={styles.listItemImage}
                    source={{ uri: album.thumbnail.uri }}
                  />
                ) : (
                  <Ionicons
                    name="ios-images-outline"
                    style={styles.fallbackIcon}
                  />
                )}
                <View style={styles.listItemTextWrapper}>
                  <Text style={styles.listItemTitle}>{album.title}</Text>
                  <Text style={styles.listItemCount}>
                    {Number(album.assetCount).toLocaleString()}개의 미디어
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    top: 18,
    right: 16,
    position: 'absolute',
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'rgb(0,122,255)',
    fontSize: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  albumList: {
    width: '100%',
  },
  listItemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    // borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    // borderTopColor: 'rgba(0,0,0,0.3)',
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  listItemTextWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listItemCount: {
    fontSize: 12,
    color: 'grey',
  },
  fallbackIcon: {
    width: 60,
    height: 60,
    borderRadius: 6,
    borderColor: 'grey',
    color: 'grey',
    textAlign: 'center',
    fontSize: 54,
  },
});

export default SaveToAlbumModal;
