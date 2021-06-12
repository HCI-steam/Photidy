import React, { useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { actions } from '../../redux/states/assetsState';
import { getImageCountPerRow } from '../../redux/selectors';

const MainTopLeftMenu = props => {
  const dispatch = useDispatch();

  const [imageCountPerRow] = useSelector(
    state => [getImageCountPerRow(state)],
    shallowEqual
  );

  const handleUpdateImageCountPerRow = useCallback(() => {
    dispatch(actions.updateImageCountPerRow());
  }, [dispatch]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleUpdateImageCountPerRow}
    >
      <MaterialCommunityIcons
        name={`numeric-${imageCountPerRow}-box-multiple-outline`}
        style={styles.icon}
      />
    </TouchableOpacity>
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
    fontSize: 24,
    color: 'rgb(0, 122, 255)',
  },
});

export default MainTopLeftMenu;
