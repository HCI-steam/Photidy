import React, { useRef, useEffect } from 'react';
import { SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';

import {
  getAllAssets,
  getAssetsLength,
  getAssetsLoading,
  getImageCountPerRow,
  getAppIsLoaded,
} from '../../redux/selectors';
import ImageListItem from '../ImageListItem';
import ListFooterComponent from '../ListFooterComponent';

const ImageGridList = ({ navigation }) => {
  const [assets, assetsLength, isLoading, imageCountPerRow, appIsLoaded] =
    useSelector(
      state => [
        getAllAssets(state),
        getAssetsLength(state),
        getAssetsLoading(state),
        getImageCountPerRow(state),
        getAppIsLoaded(state),
      ],
      shallowEqual
    );

  const screen = Dimensions.get('screen');
  const imageGridSize = screen.width / imageCountPerRow;
  useEffect(() => {
    console.log('rendered');
  }, []);

  const scrollRef = useRef(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => {
        scrollRef.current.scrollToEnd();
      },
    })
  );

  const renderImageItem = props => <ImageListItem {...props} />;
  const renderItem = ({ item }) =>
    renderImageItem({ item, imageGridSize, navigation });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        key={'assetsList_' + imageCountPerRow}
        data={assets}
        ref={scrollRef}
        numColumns={imageCountPerRow}
        getItemLayout={(data, index) => {
          return {
            length: imageGridSize,
            offset: (imageGridSize + 1) * index,
            index,
          };
        }}
        keyExtractor={(item, index) => item.id}
        initialScrollIndex={Math.floor(assetsLength / imageCountPerRow) - 1}
        renderItem={renderItem}
        ListFooterComponent={<ListFooterComponent assets={assets} />}
      />
    </SafeAreaView>
  );
};

export default ImageGridList;
