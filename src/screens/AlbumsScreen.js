import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
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

  console.log(albums);

  useEffect(() => {
    dispatch(actions.requestAllAlbums());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? null : (
        <View style={{ flex: 1, padding: 16 }}>
          {albums.map(album => {
            return (
              <Text key={album.id}>{`${album.title}  ${album.assetCount} ${
                album.thumbnail ? 'have' : 'no'
              }`}</Text>
            );
          })}
          {/* <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              You are on Albums Screen
            </Text>
          </View> */}
        </View>
      )}
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
