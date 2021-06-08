import _ from 'loadsh';

import { createReducer, mergeReducers } from '../common';

export const types = {
  REQUEST_ALL_ASSETS: 'assets/REQUEST_ALL_ASSETS',
  GET_ALL_ASSETS: 'assets/GET_ALL_ASSETS',
  UPDATE_IMAGE_COUNT_PER_ROW: 'assets/UPDATE_IMAGE_COUNT_PER_ROW',
  SET_LOADING_ASSETS: 'assets/SET_LOADING_ASSETS',
  SET_SF_MODAL_VISIBLE: 'assets/SET_SF_MODAL_VISIBLE',
  SET_VIEWER_MODAL_VISIBLE: 'assets/SET_VIEWER_MODAL_VISIBLE',
  SET_VIEWER_MODAL_STATE: 'assets/SET_VIEWER_MODAL_STATE',
};

export const actions = {
  requestAllAssets: () => ({
    type: types.REQUEST_ALL_ASSETS,
  }),
  getAllAssets: (assets, assetsLength) => ({
    type: types.GET_ALL_ASSETS,
    assets,
    assetsLength,
  }),
  updateImageCountPerRow: () => ({
    type: types.UPDATE_IMAGE_COUNT_PER_ROW,
  }),
  setLoadingAssets: isLoading => ({
    type: types.SET_LOADING_ASSETS,
    isLoading,
  }),
  setSFModalVisible: isSFModalVisible => ({
    type: types.SET_SF_MODAL_VISIBLE,
    isSFModalVisible,
  }),
  setViewerModalVisible: isViewerModalVisible => ({
    type: types.SET_VIEWER_MODAL_VISIBLE,
    isViewerModalVisible,
  }),
  setViewerModalState: viewerModalState => ({
    type: types.SET_VIEWER_MODAL_STATE,
    viewerModalState,
  }),
};

const initialState = {
  assets: [],
  assetsLength: 0,
  imageCountPerRow: 3,
  isLoading: false,
  isSFModalVisible: false,
  isViewerModalVisible: false,
  viewerModalState: null,
};

const assetsReducer = createReducer(initialState, {
  [types.GET_ALL_ASSETS]: (state, action) => {
    if (!_.isEqual(state.assets, action.assets)) {
      state.assets = action.assets;
      state.assetsLength = action.assetsLength;
    }
  },
  [types.UPDATE_IMAGE_COUNT_PER_ROW]: (state, action) => {
    if (state.imageCountPerRow === 5) {
      state.imageCountPerRow = 1;
    } else {
      state.imageCountPerRow += 1;
    }
  },
  [types.SET_LOADING_ASSETS]: (state, action) =>
    (state.isLoading = action.isLoading),
  [types.SET_SF_MODAL_VISIBLE]: (state, action) =>
    (state.isSFModalVisible = action.isSFModalVisible),
  [types.SET_VIEWER_MODAL_VISIBLE]: (state, action) =>
    (state.isViewerModalVisible = action.isViewerModalVisible),
  [types.SET_VIEWER_MODAL_STATE]: (state, action) =>
    (state.viewerModalState = action.viewerModalState),
});

export default assetsReducer;
