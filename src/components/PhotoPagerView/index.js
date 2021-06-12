import React, { useState, useCallback } from 'react';
import { Modal, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import ImagePage from './ImagePage';
import PhotoViewHeader from './PhotoViewHeader';
import PhotoViewFooter from './PhotoViewFooter';
import PhotoInfoModal from './PhotoInfoModal';
import TagModal from './TagModal';
import SaveToAlbumModal from './SaveToAlbumModal';
import {
  getViewerModalState,
  getViewerModalVisible,
} from '../../redux/selectors';
import { actions } from '../../redux/states/viewerState';

const PhotoPagerView = props => {
  const { items } = props;
  const dispatch = useDispatch();

  const [viewerState, viewerVisible] = useSelector(
    state => [getViewerModalState(state), getViewerModalVisible(state)],
    shallowEqual
  );
  const pageIndex = viewerState ? viewerState.index : 0;
  const [showMenu, setShowMenu] = useState(true);

  const handleCancel = useCallback(() => {
    dispatch(actions.setViewerModalVisible(false));
    dispatch(actions.setViewerModalState(null));
  }, [dispatch]);

  const handleChange = useCallback(
    currentIndex => {
      dispatch(
        actions.setViewerModalState({
          index: currentIndex,
          item: items[currentIndex],
        })
      );
    },
    [dispatch, items]
  );

  const insets = useSafeAreaInsets();
  const screen = Dimensions.get('screen');
  const imageUrls = items.map((item, index) => {
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
        width: appliedWidth,
        height: appliedHeight,
      },
      width: appliedWidth,
      height: appliedHeight,
    };
  });

  const footerStyle = {
    width: '100%',
    height:
      49 + insets.bottom + (viewerState?.item?.mediaType === 'video' ? 72 : 0),
    position: showMenu ? 'absolute' : 'relative',
    bottom: 0,
    zIndex: 4,
  };

  return (
    <Modal
      visible={viewerVisible}
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <StatusBar hidden={!showMenu} />
      <ImageViewer
        imageUrls={imageUrls}
        index={pageIndex}
        renderHeader={currentIndex =>
          showMenu ? (
            <PhotoViewHeader
              currentItem={items[currentIndex]}
              currentIndex={currentIndex}
              onBackHandler={handleCancel}
            />
          ) : null
        }
        renderFooter={currentIndex => (
          <PhotoViewFooter
            currentItem={items[currentIndex]}
            currentIndex={currentIndex}
            items={items}
          />
        )}
        renderImage={props => <ImagePage {...props} />}
        useNativeDriver={true}
        //   flipThreshold={100}
        backgroundColor="rgb(242,242,242)"
        onChange={handleChange}
        onClick={() => setShowMenu(!showMenu)}
        enableSwipeDown={true}
        swipeDownThreshold={100}
        enablePreload={true}
        renderIndicator={() => null}
        saveToLocalByLongPress={false}
        footerContainerStyle={footerStyle}
        // pageAnimateTime={50}
        onCancel={handleCancel}
      />
      <PhotoInfoModal />
      <TagModal />
      <SaveToAlbumModal />
    </Modal>
  );
};

export default PhotoPagerView;
