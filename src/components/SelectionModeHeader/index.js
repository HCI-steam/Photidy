import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { actions } from '../../redux/states/assetsState';
import {
  getSelectedAssets,
  getSelectionMode,
  getRangeStartIndex,
} from '../../redux/selectors';

const SelectionModeHeader = props => {
  const { assets } = props;
  const dispatch = useDispatch();
  const [selectedAssets, selectionMode, rangeStartIndex] = useSelector(
    state => [
      getSelectedAssets(state),
      getSelectionMode(state),
      getRangeStartIndex(state),
    ],
    shallowEqual
  );

  const handlePressCheck = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['취소', '전체 선택', '선택 초기화'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          dispatch(actions.setSelectedAssets(assets));
        } else if (buttonIndex === 2) {
          dispatch(actions.setSelectedAssets([]));
        }
      }
    );
  }, []);

  const handleCancel = useCallback(() => {
    dispatch(actions.setSelectionMode('NONE'));
    dispatch(actions.setSelectedAssets([]));
  }, [dispatch]);

  const handleSelectionMode = useCallback(() => {
    if (selectionMode === 'SINGLE') {
      dispatch(actions.setSelectionMode('RANGE'));
      dispatch(actions.setSelectedAssets([]));
    } else if (selectionMode === 'RANGE') {
      dispatch(actions.setSelectionMode('SINGLE'));
      dispatch(actions.setSelectedAssets([]));
    }
  }, [dispatch, selectionMode]);

  let centerText = '';
  if (selectionMode === 'SINGLE') {
    centerText =
      selectedAssets.length === 0
        ? '항목 선택'
        : `${selectedAssets.length}개 항목 선택됨`;
  } else if (selectionMode === 'RANGE') {
    if (rangeStartIndex < 0) {
      if (selectedAssets.length === 0)
        centerText = '첫 번째 사진을 선택해주세요';
      else centerText = `${selectedAssets.length}개 항목 선택됨`;
    } else {
      centerText = '마지막 사진을 선택해주세요';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={handlePressCheck}>
          <Ionicons
            name="ios-checkmark-circle-outline"
            size={28}
            color={'#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rangeButton}
          onPress={handleSelectionMode}
        >
          {selectionMode === 'SINGLE' ? (
            <AntDesign name="swap" size={28} color="#fff" />
          ) : (
            <MaterialCommunityIcons
              name="numeric-1-box-outline"
              size={28}
              color="#fff"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.selectionText}>{centerText}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    top: 0,
    zIndex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'rgb(0,122,255)',
    // borderBottomWidth: 0.3,
    // borderBottomColor: '#dedede',

    width: '100%',
    // paddingBottom: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '22.25%',
  },
  cancelButton: {
    marginRight: 16,
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  checkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  rangeButton: {
    marginLeft: 12,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%',
  },
  rightContainer: {
    flexDirection: 'row',
    width: '22.25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
});

export default SelectionModeHeader;
