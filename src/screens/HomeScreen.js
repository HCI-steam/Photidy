import React, { useEffect, useRef, useCallback } from 'react';
import { AppState, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { actions } from '../redux/states/assetsState';
import {
  getAllAssets,
  getAssetsLength,
  getAssetsLoading,
  getImageCountPerRow,
  getAppIsLoaded,
  getViewerModalVisible,
  getSelectionMode,
  getSaveToAlbumModalVisible,
} from '../redux/selectors';
import {
  ImageGridList,
  SortAndFilterModal,
  SelectionModeHeader,
  SelectionModeFooter,
  SaveToAlbumModal,
} from '../components';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [
    assets,
    assetsLength,
    // isLoading,
    imageCountPerRow,
    // appIsLoaded,
    viewerVisible,
    selectionMode,
    saveToAlbumVisible,
  ] = useSelector(
    state => [
      getAllAssets(state),
      getAssetsLength(state),
      // getAssetsLoading(state),
      getImageCountPerRow(state),
      // getAppIsLoaded(state),
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
  const listRef = useRef(null);

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(actions.requestAllAssets());
      }
      console.log(appState.current);
      appState.current = nextAppState;
    },
    [dispatch, appState.current]
  );

  return (
    <React.Fragment>
      {selectionMode !== 'NONE' ? (
        <SafeAreaView style={{ flex: 0, backgroundColor: 'rgb(0,122,255)' }} />
      ) : null}
      {selectionMode !== 'NONE' ? (
        <React.Fragment>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <StatusBar barStyle="light-content" />
              <SelectionModeHeader assets={assets} />
              <ImageGridList
                ref={listRef}
                navigation={navigation}
                assets={assets}
                assetsLength={assetsLength}
                imageCountPerRow={imageCountPerRow}
                viewerVisible={viewerVisible}
              />
              <SelectionModeFooter listRef={listRef} />
            </View>
          </SafeAreaView>
          <SaveToAlbumModal />
        </React.Fragment>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <ImageGridList
            ref={listRef}
            navigation={navigation}
            assets={assets}
            assetsLength={assetsLength}
            imageCountPerRow={imageCountPerRow}
            viewerVisible={viewerVisible}
          />
          <SortAndFilterModal assets={assets} />
        </SafeAreaView>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
