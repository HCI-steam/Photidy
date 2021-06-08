import React, { useCallback } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { actions } from '../../redux/states/assetsState';
import { Button } from 'react-native';

const MainTopRightMenu = props => {
  const dispatch = useDispatch();

  const handleOpenSFModal = useCallback(() => {
    dispatch(actions.setSFModalVisible(true));
    console.log('modal open');
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenSFModal}>
        {/* <Ionicons name="ios-filter" style={styles.icon} /> */}
        <MaterialCommunityIcons name="filter-menu" style={styles.icon} />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          console.log('pressed');
        }}
      >
        <Text style={styles.text}>선택</Text>
      </TouchableOpacity> */}
      <Button
        style={styles.text}
        onPress={() => console.log('pressed')}
        title="선택"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
  icon: {
    fontSize: 24,
    color: 'rgb(0, 122, 255)',
    paddingRight: 8,
  },
  text: {
    fontSize: 16,
    color: 'rgb(0, 122, 255)',
    paddingLeft: 8,
    paddingRight: 0,
  },
});

export default MainTopRightMenu;
