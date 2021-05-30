// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import { View, SafeAreaView, Image, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

const DetailsScreen = props => {
  const { item } = props.route.params;
  const imageRatio = item.height / item.width;
  const imageHeight =
    imageRatio * screen.width > (screen.width * 4) / 3
      ? (screen.width * 4) / 3
      : imageRatio * screen.width;

  console.log(props.route.params);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: '100%', height: imageHeight }}
          source={{ uri: item.uri }}
        />
      </View>
    </SafeAreaView>
  );
};
export default DetailsScreen;
