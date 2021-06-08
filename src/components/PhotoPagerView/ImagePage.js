/** NOT USED CURRENTLY */
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const ImagePage = props => {
  console.log(props);
  const { index, item, width, height } = props;
  const [image, setImage] = useState(item);

  console.log(width, height);
  useEffect(() => {
    extendAssetInfo = async () => {
      let extended = await MediaLibrary.getAssetInfoAsync(image.id);
      let { exists, size } = await FileSystem.getInfoAsync(extended.localUri);

      if (exists) extended = { ...extended, size };

      setImage(extended);
    };

    extendAssetInfo();
  }, []);

  return (
    <SharedElement id={`main-screen-photo-${image.id}`}>
      <Image style={{ width, height }} source={{ uri: image.uri }} />
    </SharedElement>
  );
};

export default ImagePage;
