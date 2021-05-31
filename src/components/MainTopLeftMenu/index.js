import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const currentLayout = 5;

const MainTopLeftMenu = props => {
  //   console.log(props);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log('pressed');
      }}
    >
      <MaterialCommunityIcons
        name={`numeric-${currentLayout}-box-multiple-outline`}
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
    marginLeft: 16,
  },
  icon: {
    fontSize: 24,
    color: 'rgb(0, 122, 255)',
  },
});

export default MainTopLeftMenu;
