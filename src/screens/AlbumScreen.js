import React, { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, AppState, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import {
  getAlbumAssets,
  getImageCountPerRow,
  getViewerModalVisible,
  getSelectionMode,
  getSaveToAlbumModalVisible,
} from '../redux/selectors';
import { ImageGridList, SortAndFilterModal } from '../components';
import { actions } from '../redux/states/albumState';

const AlbumScreen = ({ navigation, item }) => {
  const dispatch = useDispatch();
  const [assets, imageCountPerRow, viewerVisible] = useSelector(
    state => [
      getAlbumAssets(state),
      getImageCountPerRow(state),
      getViewerModalVisible(state),
      getSelectionMode(state),
      getSaveToAlbumModalVisible(state),
    ],
    shallowEqual
  );

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(actions.requestAlbumAssets(item.id, item.assetsCount));
      }
      console.log(appState.current);
      appState.current = nextAppState;
    },
    [dispatch, appState.current]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ImageGridList
        navigation={navigation}
        assets={assets}
        assetsLength={assets.length}
        imageCountPerRow={imageCountPerRow}
        viewerVisible={viewerVisible}
      />
      <SortAndFilterModal assets={assets} />
    </SafeAreaView>
  );
};

export default AlbumScreen;
