import React, { useRef, useMemo } from 'react';
import { SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import AlbumListItem from '../AlbumListItem';

const AlbumsListView = props => {
  const { albums, navigation } = props;
  const dispatch = useDispatch();
  const screen = Dimensions.get('screen');
  const albumCellWidth = screen.width / 2;

  const albumScrollRef = useRef(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => {
        albumScrollRef.current.scrollToOffset(0);
      },
    })
  );

  const renderAlbumItem = props => <AlbumListItem {...props} />;
  const renderItem = ({ item, index }) =>
    renderAlbumItem({ items: albums, item, index, albumCellWidth, navigation });
  const memoizedRenderItem = useMemo(
    () => renderItem,
    [albums, albumCellWidth]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={albums}
        ref={albumScrollRef}
        numColumns={2}
        getItemLayout={(data, index) => {
          return {
            length: albumCellWidth,
            offset: albumCellWidth * index,
            index,
          };
        }}
        initialNumToRender={4}
        keyExtractor={(item, index) => item.id}
        initialScrollIndex={0}
        renderItem={memoizedRenderItem}
        disableVirtualization={false}
      />
    </SafeAreaView>
  );
};

export default AlbumsListView;
