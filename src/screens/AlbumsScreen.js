import React, { useEffect, useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  AppState,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getAllAlbums, getAlbumsLoading } from '../redux/selectors';
import { actions } from '../redux/states/albumsState';

const AlbumsScreen = () => {
  const dispatch = useDispatch();
  const [albums, isLoading] = useSelector(
    state => [getAllAlbums(state), getAlbumsLoading(state)],
    shallowEqual
  );

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatch(actions.requestAllAlbums());
    }
    appState.current = nextAppState;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {albums.map(album => {
          return (
            <Text key={album.id}>{`${album.title}  ${album.assetCount} ${
              album.thumbnail ? 'have' : 'no'
            }`}</Text>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default AlbumsScreen;
