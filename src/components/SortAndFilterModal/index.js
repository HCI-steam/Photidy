import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';

import { getSFModalVisible } from '../../redux/selectors';
import { actions } from '../../redux/states/assetsState';
import SortAndFilterModalContent from '../SortAndFilterModalContent';

const SortAndFilterModal = props => {
  const dispatch = useDispatch();
  const modalVisible = useSelector(state => getSFModalVisible(state));

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '90%'], []);

  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [bottomSheetModalRef.current]);

  const handleSheetChanges = useCallback(
    index => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        dispatch(actions.setSFModalVisible(false));
      }
    },
    [dispatch]
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
        <SortAndFilterModalContent />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SortAndFilterModal;
