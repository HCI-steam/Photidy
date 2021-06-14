import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  AppState,
  Modal,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import _ from 'lodash';
import * as MediaLibrary from 'expo-media-library';

import { AlbumsListView } from '../components';
import {
  getAllAlbums,
  getAlbumsLoading,
  getAlbumSortOption,
  getAlbumIsCreating,
} from '../redux/selectors';
import { actions } from '../redux/states/albumsState';

const AlbumsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [albums, isLoading, sortOption, isCreating] = useSelector(
    state => [
      getAllAlbums(state),
      getAlbumsLoading(state),
      getAlbumSortOption(state),
      getAlbumIsCreating(state),
    ],
    shallowEqual
  );
  const [newAlbumName, setNewAlbumName] = useState('');
  const albumNameRef = useRef(null);

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

  const handleCancel = useCallback(() => {
    dispatch(actions.setCreateModalVisible(false));
    setNewAlbumName('');
    albumNameRef.current.clear();
  }, [albumNameRef.current, dispatch, newAlbumName]);

  const handleSave = useCallback(async () => {
    try {
      await MediaLibrary.createAlbumAsync(newAlbumName);
    } catch (e) {
      console.log(e);
    }
    dispatch(actions.setCreateModalVisible(false));
    setNewAlbumName('');
    albumNameRef.current.clear();

    dispatch(actions.requestAllAlbums());
  }, [newAlbumName, albumNameRef.current, dispatch]);

  let sortedAlbums = [];
  if (sortOption.startsWith('TIME')) {
    let sorted = _.sortBy(albums, ['creationTime']);
    if (sortOption.endsWith('ASC')) {
      sortedAlbums = sorted;
    } else {
      sortedAlbums = sorted.reverse();
    }
  } else {
    let sorted = _.sortBy(albums, ['title']);
    if (sortOption.endsWith('ASC')) {
      sortedAlbums = sorted;
    } else {
      sortedAlbums = sorted.reverse();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AlbumsListView albums={sortedAlbums} navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCreating}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isCreating);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>새 앨범</Text>
            <Text style={styles.subText}>새 앨범의 이름을 입력해주세요.</Text>
            <TextInput
              ref={albumNameRef}
              style={styles.textInput}
              placeholder="앨범명"
              autoCapitalize="none"
              placeholderTextColor="grey"
              value={newAlbumName}
              onChangeText={setNewAlbumName}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.buttonLeft }}
                onPress={handleCancel}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'rgb(0,122,255)',
                  }}
                >
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.buttonRight }}
                disabled={newAlbumName === ''}
                onPress={handleSave}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: newAlbumName !== '' ? 'rgb(0,122,255)' : 'grey',
                  }}
                >
                  저장
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '70%',
    alignItems: 'center',
    opacity: 0.95,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  subText: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  textInput: {
    marginBottom: 12,
    height: 28,
    width: '80%',
    textAlign: 'left',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    borderColor: '#acacac',
    borderWidth: 1,
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 36,
    borderTopWidth: 1,
    borderTopColor: '#acacac',
  },
  button: {
    width: '50%',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLeft: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#acacac',
    borderBottomLeftRadius: 12,
  },
  buttonRight: {
    alignItems: 'center',
    borderBottomRightRadius: 12,
  },
});

export default AlbumsScreen;
