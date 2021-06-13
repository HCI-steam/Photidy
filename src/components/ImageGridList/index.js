import React, { useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';

import { actions } from '../../redux/states/assetsState';
import ImageListItem from '../ImageListItem';
import ListFooterComponent from '../ListFooterComponent';
// import ListEmptyComponent from '../ListEmptyComponent';
import PhotoPagerView from '../PhotoPagerView';

function ImageGridList(props, ref) {
  const { navigation, assets, assetsLength, imageCountPerRow, viewerVisible } =
    props;
  const dispatch = useDispatch();

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

  useImperativeHandle(ref, () => ({
    scrollToEnd: () => {
      scrollRef.current.scrollToEnd();
    },
  }));

  const renderImageItem = props => <ImageListItem {...props} />;
  const renderItem = ({ item, index }) =>
    renderImageItem({ items: assets, index, imageGridSize, navigation });

  const memoizedRenderItem = useMemo(() => renderItem, [assets, imageGridSize]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* TODO: Filtering 기능 구현 뒤에 실제 결과없음에 대해 스크롤 관련 에러, 헤더 버튼 동작 처리하기 */}
      <FlatList
        // id={'assetsList_' + imageCountPerRow}
        key={'assetsList_' + imageCountPerRow}
        data={assets}
        ref={scrollRef}
        scrollsToTop={!viewerVisible}
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
      <PhotoPagerView items={assets} />
    </SafeAreaView>
  );
}

ImageGridList = forwardRef(ImageGridList);

export default ImageGridList;
