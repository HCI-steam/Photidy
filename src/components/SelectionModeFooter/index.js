import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { actions as viewerActions } from '../../redux/states/viewerState';
import { actions as assetsActions } from '../../redux/states/assetsState';
import { getSelectedAssets, getSelectionMode } from '../../redux/selectors';

const SelectionModeFooter = props => {
  const { listRef } = props;
  const dispatch = useDispatch();
  const [selectedAssets, selectionMode] = useSelector(
    state => [getSelectedAssets(state), getSelectionMode(state)],
    shallowEqual
  );

  const handleScrollToBottom = useCallback(() => {
    listRef?.current.scrollToEnd();
  }, [listRef]);

  const handleDelete = useCallback(async () => {
    try {
      await MediaLibrary.deleteAssetsAsync(selectedAssets);
      dispatch(assetsActions.setSelectedAssets([]));
      if (selectionMode === 'RANGE')
        dispatch(assetsActions.setRangeStartIndex(-1));

      dispatch(assetsActions.requestAllAssets());
    } catch (e) {
      console.log('user did not allowed removing image');
    }
  }, [dispatch, selectedAssets]);

  const handleSaveToAlbumMenu = useCallback(() => {
    dispatch(viewerActions.setSaveToAlbumModalVisible(true));
  }, [dispatch]);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.leftIconContainer}>
        <TouchableOpacity
          style={styles.leftIcons}
          onPress={handleScrollToBottom}
        >
          <Ionicons
            name="ios-chevron-down-sharp"
            color="rgb(0,122,255)"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightIconContainer}>
        <TouchableOpacity
          disabled={selectedAssets.length === 0}
          style={styles.rightIcons}
          onPress={handleSaveToAlbumMenu}
        >
          <Ionicons
            name="ios-albums-outline"
            color={selectedAssets.length === 0 ? '#ababab' : 'rgb(0,122,255)'}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={selectedAssets.length === 0}
          style={styles.rightIcons}
          onPress={handleDelete}
        >
          <Ionicons
            name="ios-trash-outline"
            color={selectedAssets.length === 0 ? '#ababab' : 'rgb(0,122,255)'}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 49,
    borderTopWidth: 0.4,
    borderTopColor: 'rgb(199,199,204)',
    width: '100%',
    bottom: 0,
    zIndex: 4,
  },
  leftIconContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    alignItems: 'center',
  },
  rightIconContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    alignItems: 'center',
  },
  leftIcons: {
    marginRight: 24,
  },
  rightIcons: {
    marginLeft: 24,
  },
  seekBarSliderTrack: {
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0,
  },
  seekBarSliderThumb: {
    height: 48,
    width: 6,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  timeStampWrapper: {
    alignItems: 'center',
    marginBottom: 4,
  },
  timeStampBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  timeStampText: { fontSize: 10, color: 'white' },
});

export default SelectionModeFooter;
