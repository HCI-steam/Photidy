import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

/**
 * This component and its parent component have some rendering issue. (My assumption.)
 * It should be changed to Fast Image (if expo provide that soon.)
 * If they won't support that component, I have to consider to migrate this project to use rn-cli
 */

class ImageListItem extends React.PureComponent {
  render() {
    const { navigation, imageGridSize, item } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PhotoView', { item })}
      >
        <Image
          style={{
            width: imageGridSize,
            height: imageGridSize,
            marginRight: 1,
            marginTop: 1,
            resizeMode: 'cover',
          }}
          source={{ uri: item.uri }}
        />
      </TouchableOpacity>
    );
  }
}

export default ImageListItem;
