import { createReducer } from '../common';

export const types = {
  SET_VIEWER_MODAL_VISIBLE: 'viewer/SET_VIEWER_MODAL_VISIBLE',
  SET_VIEWER_MODAL_STATE: 'viewer/SET_VIEWER_MODAL_STATE',
  SET_INFO_MODAL_VISIBLE: 'viewer/SET_INFO_MODAL_VISIBLE',
  SET_TAG_MODAL_VISIBLE: 'viewer/SET_TAG_MODAL_VISIBLE',
  SET_SAVE_ALBUM_MODAL_VISIBLE: 'viewer/SET_SAVE_ALBUM_MODAL_VISIBLE',
  SET_VIDEO_PLAYBACK: 'viewer/SET_VIDEO_PLAYBACK',
};

export const actions = {
  setViewerModalVisible: isViewerModalVisible => ({
    type: types.SET_VIEWER_MODAL_VISIBLE,
    isViewerModalVisible,
  }),
  setViewerModalState: viewerModalState => ({
    type: types.SET_VIEWER_MODAL_STATE,
    viewerModalState,
  }),
  setInfoModalVisible: isInfoModalVisible => ({
    type: types.SET_INFO_MODAL_VISIBLE,
    isInfoModalVisible,
  }),
  setTagModalVisible: isTagModalVisible => ({
    type: types.SET_TAG_MODAL_VISIBLE,
    isTagModalVisible,
  }),
  setSaveToAlbumModalVisible: isSaveToAlbumModalVisible => ({
    type: types.SET_SAVE_ALBUM_MODAL_VISIBLE,
    isSaveToAlbumModalVisible,
  }),
  setVideoPlayback: videoPlayback => ({
    type: types.SET_VIDEO_PLAYBACK,
    videoPlayback,
  }),
};

const initialState = {
  isViewerModalVisible: false,
  viewerModalState: null,
  isInfoModalVisible: false,
  isTagModalVisible: false,
  isSaveToAlbumModalVisible: false,
  videoPlayback: null,
};

const viewerReducer = createReducer(initialState, {
  [types.SET_VIEWER_MODAL_VISIBLE]: (state, action) =>
    (state.isViewerModalVisible = action.isViewerModalVisible),
  [types.SET_VIEWER_MODAL_STATE]: (state, action) =>
    (state.viewerModalState = action.viewerModalState),
  [types.SET_INFO_MODAL_VISIBLE]: (state, action) =>
    (state.isInfoModalVisible = action.isInfoModalVisible),
  [types.SET_TAG_MODAL_VISIBLE]: (state, action) =>
    (state.isTagModalVisible = action.isTagModalVisible),
  [types.SET_SAVE_ALBUM_MODAL_VISIBLE]: (state, action) =>
    (state.isSaveToAlbumModalVisible = action.isSaveToAlbumModalVisible),
  [types.SET_VIDEO_PLAYBACK]: (state, action) =>
    (state.videoPlayback = action.videoPlayback),
});

export default viewerReducer;
