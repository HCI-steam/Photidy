import React, { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../redux/states/albumsState';
import { getAlbumIsEditing } from '../../redux/selectors';

const AlbumsTopLeftMenu = props => {
  const dispatch = useDispatch();

  const isEditMode = useSelector(state => getAlbumIsEditing(state));

  const handleCreateAlbum = useCallback(() => {
    dispatch(actions.setCreateModalVisible(true));
  });

  return (
    <React.Fragment>
      {isEditMode ? null : (
        <TouchableOpacity style={styles.container} onPress={handleCreateAlbum}>
          <Ionicons name="ios-add" style={styles.icon} />
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  icon: {
    fontSize: 28,
    color: 'rgb(0, 122, 255)',
  },
});

export default AlbumsTopLeftMenu;
