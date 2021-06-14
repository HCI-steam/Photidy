import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActionSheetIOS,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../redux/states/albumsState';
import { getAlbumIsEditing } from '../../redux/selectors';

const AlbumsTopRightMenu = props => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(state => getAlbumIsEditing(state));

  const handleSelectSortOptions = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          '취소',
          '앨범명 오름차순',
          '앨범명 내림차순',
          '오래된 항목 순',
          '초기화 (최신 항목 순)',
        ],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          dispatch(actions.setAlbumSortOption('TITLE_ASC'));
        } else if (buttonIndex === 2) {
          dispatch(actions.setAlbumSortOption('TITLE_DESC'));
        } else if (buttonIndex === 3) {
          dispatch(actions.setAlbumSortOption('TIME_DESC'));
        } else if (buttonIndex === 4) {
          dispatch(actions.setAlbumSortOption('TIME_ASC'));
        }
      }
    );
  }, []);

  const handleEditMode = useCallback(() => {
    if (isEditMode) {
      dispatch(actions.setEditMode(false));
    } else {
      dispatch(actions.setEditMode(true));
    }
  }, [dispatch, isEditMode]);

  return (
    <View style={styles.container}>
      {isEditMode ? null : (
        <TouchableOpacity onPress={handleSelectSortOptions}>
          <MaterialCommunityIcons name="sort" style={styles.icon} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleEditMode}>
        <Text style={styles.text}>{isEditMode ? '완료' : '편집'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    color: 'rgb(0, 122, 255)',
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    color: 'rgb(0, 122, 255)',
    marginLeft: 12,
  },
});

export default AlbumsTopRightMenu;
