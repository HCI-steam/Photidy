import * as React from 'react';
import { View, SafeAreaView, Image, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const screen = Dimensions.get('screen');

class PhotoViewScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { image: props.route.params.item };
  }

  componentDidMount() {
    this._extendAssetInfo();
  }

  _extendAssetInfo = async () => {
    const { image } = this.state;
    let extended = await MediaLibrary.getAssetInfoAsync(image.id);
    let { exists, size } = await FileSystem.getInfoAsync(extended.localUri);

    if (exists) extended = { ...extended, size };

    this.setState({ image: extended });
  };

  render() {
    const { image } = this.state;

    const imageRatio = image.height / image.width;
    const imageHeight =
      imageRatio * screen.width > (screen.width * 4) / 3
        ? (screen.width * 4) / 3
        : imageRatio * screen.width;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            style={{ width: '100%', height: imageHeight }}
            source={{ uri: image.uri }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default PhotoViewScreen;
