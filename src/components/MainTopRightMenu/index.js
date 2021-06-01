import * as React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const MainTopRightMenu = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
        }}
      >
        <Ionicons name="ios-filter" style={styles.icon} />
        {/* <MaterialCommunityIcons name="filter-menu" style={styles.icon} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
        }}
      >
        <Text style={styles.text}>선택</Text>
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
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
    color: 'rgb(0, 122, 255)',
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: 'rgb(0, 122, 255)',
    marginLeft: 8,
  },
});

export default MainTopRightMenu;
