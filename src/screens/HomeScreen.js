// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
// import {List, Thumbnail} from 'native-base'
import * as MediaLibrary from 'expo-media-library';

const screen = Dimensions.get('screen');
const imageCountPerCol = 5;
const imageGridSize = screen.width / imageCountPerCol;
class HomeScreen extends React.Component {
  state = {
    photoLength: 0,
    photos: [],
  };

  componentDidMount() {
    this._mediaLibraryAsync();
  }

  _mediaLibraryAsync = async () => {
    await MediaLibrary.requestPermissionsAsync();
    let { status } = await MediaLibrary.getPermissionsAsync();
    if (status === 'granted') {
      let length = (await MediaLibrary.getAssetsAsync()).totalCount;
      let media = await MediaLibrary.getAssetsAsync({
        first: length,
        sortBy: ['creationTime'],
      });

      this.setState({ photos: media.assets, photoLength: length });
    }
  };

  render() {
    const { photos, photoLength } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={photos}
          numColumns={imageCountPerCol}
          getItemLayout={(data, index) => {
            return {
              length: imageGridSize,
              offset: (imageGridSize + 1) * index,
              index,
            };
          }}
          initialScrollIndex={Math.floor(photoLength / imageCountPerCol)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { item })}
            >
              <Image
                style={{
                  width: imageGridSize,
                  height: imageGridSize,
                  margin: 0.5,
                  resizeMode: 'cover',
                }}
                source={{ uri: item.uri }}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
export default HomeScreen;
