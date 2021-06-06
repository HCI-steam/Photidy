import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('screen').height;
const viewHeight = screenHeight - 0.129 * screenHeight - 0.1078 * screenHeight;
const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="image-off-outline"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyText}>미디어가 존재하지 않습니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    width: '100%',
    height: viewHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 128,
    paddingBottom: 16,
    color: 'rgb(174, 174, 178)',
  },
  emptyText: {
    fontSize: 20,
    paddingTop: 16,
    color: 'rgb(174, 174, 178)',
  },
});

export default ListEmptyComponent;
