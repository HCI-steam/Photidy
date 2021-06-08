import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import {
  getAllAssets,
  getAssetsLength,
  getAssetsLoading,
  getImageCountPerRow,
  getAppIsLoaded,
} from '../../redux/selectors';
import ImageListItem from '../ImageListItem';
import ListFooterComponent from '../ListFooterComponent';
import ListEmptyComponent from '../ListEmptyComponent';
import PhotoPagerView from '../PhotoPagerView';

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

  const scrollRef = useRef(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => {
        scrollRef.current.scrollToEnd();
      },
    })
  );

  const renderImageItem = props => <ImageListItem {...props} />;
  const renderItem = ({ item, index }) =>
    renderImageItem({ items: assets, index, imageGridSize, navigation });

  const memoizedRenderItem = useMemo(() => renderItem, [assets, imageGridSize]);

  const imageUrls = assets.map((item, index) => {
    const screenWidth = screen.width,
      screenHeight = screen.height;
    const imageWidth = item.width,
      imageHeight = item.height;
    const imageRatio = imageHeight / imageWidth;

    let appliedWidth = screenWidth;
    let appliedHeight = screenWidth * imageRatio;
    if (appliedHeight > screenHeight) {
      const statusBarHeight = getStatusBarHeight(true);
      appliedHeight = screenHeight - (statusBarHeight * 3) / 2;
      appliedWidth = appliedHeight / imageRatio;
    }

    return {
      url: item.uri,
      props: {
        item,
        index,
      },
      width: appliedWidth,
      height: appliedHeight,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* TODO: Filtering 기능 구현 뒤에 실제 결과없음에 대해 스크롤 관련 에러, 헤더 버튼 동작 처리하기 */}
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
        initialNumToRender={imageCountPerRow * (imageGridSize / screen.height)}
        keyExtractor={(item, index) => item.id}
        initialScrollIndex={Math.floor(assetsLength / imageCountPerRow) - 1}
        renderItem={memoizedRenderItem}
        ListFooterComponent={<ListFooterComponent assets={assets} />}
        disableVirtualization={false}
        // 가능하면 뷰 하단(하단탭 바로위)에 고정시키기. 지금도 나쁘지 않지만.
      />
      <PhotoPagerView imageUrls={imageUrls} />
    </SafeAreaView>
  );
};

export default ImageGridList;
