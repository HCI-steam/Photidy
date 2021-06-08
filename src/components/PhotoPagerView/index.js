import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import ImagePage from './ImagePage';
import {
  getViewerModalState,
  getViewerModalVisible,
} from '../../redux/selectors';
import { actions } from '../../redux/states/assetsState';

const PhotoPagerView = props => {
  const { imageUrls } = props;
  const dispatch = useDispatch();

  const [viewerState, viewerVisible] = useSelector(
    state => [getViewerModalState(state), getViewerModalVisible(state)],
    shallowEqual
  );
  const index = viewerState ? viewerState.index : 0;
  const [pageIndex, setPageIndex] = useState(index);

  console.log(pageIndex);

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" animated />

      <Modal
        visible={viewerVisible}
        transparent
        presentationStyle="overFullScreen"
        animationType="fade"
      >
        <ImageViewer
          imageUrls={imageUrls}
          index={index}
          // renderImage={props => <ImagePage {...props} />}
          useNativeDriver={true}
          //   flipThreshold={100}
          onChange={index => setPageIndex(index)}
          enableSwipeDown={true}
          swipeDownThreshold={100}
          enablePreload={true}
          renderIndicator={() => null}
          saveToLocalByLongPress={false}
          //   pageAnimateTime={150}
          onCancel={() => {
            dispatch(actions.setViewerModalVisible(false));
            dispatch(actions.setViewerModalState(null));
          }}
        />
      </Modal>
    </React.Fragment>
  );
};

export default PhotoPagerView;
